"use client";

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { animate, type AnimationPlaybackControls } from "framer-motion";
import {
  FLICK_VELOCITY_THRESHOLD,
  nearestSnap,
  project,
  recentVelocity,
  rubberband,
  springFlick,
  springMove,
  type MotionSample,
} from "@/lib/motion";

interface UseDragScrollOptions {
  containerRef: RefObject<HTMLElement | null>;
  elasticRef: RefObject<HTMLElement | null>;
  itemSelector: string;
  reducedMotion?: boolean;
}

const DRAG_THRESHOLD = 8;
const VELOCITY_WINDOW = 80;

export function useDragScroll({
  containerRef,
  elasticRef,
  itemSelector,
  reducedMotion = false,
}: UseDragScrollOptions) {
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    startElasticOffset: number;
    intent: "pending" | "horizontal" | "vertical";
    scrollSamples: MotionSample[];
    elasticSamples: MotionSample[];
  } | null>(null);
  const scrollAnimationRef = useRef<AnimationPlaybackControls | null>(null);
  const elasticAnimationRef = useRef<AnimationPlaybackControls | null>(null);
  const elasticOffsetRef = useRef(0);
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const getItems = useCallback(
    () => Array.from(containerRef.current?.querySelectorAll<HTMLElement>(itemSelector) ?? []),
    [containerRef, itemSelector],
  );

  const setElasticOffset = useCallback((offset: number) => {
    elasticOffsetRef.current = offset;
    if (elasticRef.current) {
      elasticRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
  }, [elasticRef]);

  const clearElasticOffset = useCallback(() => {
    elasticOffsetRef.current = 0;
    if (elasticRef.current) elasticRef.current.style.transform = "";
  }, [elasticRef]);

  const snapPoints = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    const max = Math.max(0, container.scrollWidth - container.clientWidth);
    return getItems().map((item) => Math.min(max, Math.max(0, item.offsetLeft)));
  }, [containerRef, getItems]);

  const returnElastic = useCallback((velocity: number) => {
    elasticAnimationRef.current?.stop();
    if (reducedMotion || elasticOffsetRef.current === 0) {
      clearElasticOffset();
      return;
    }
    elasticAnimationRef.current = animate(elasticOffsetRef.current, 0, {
      ...springMove,
      velocity,
      onUpdate: setElasticOffset,
      onComplete: () => {
        clearElasticOffset();
        elasticAnimationRef.current = null;
      },
    });
  }, [clearElasticOffset, reducedMotion, setElasticOffset]);

  const settle = useCallback((velocity = 0, fromGesture = false) => {
    const container = containerRef.current;
    if (!container) return;
    const projected = reducedMotion ? container.scrollLeft : container.scrollLeft + project(velocity);
    const target = nearestSnap(projected, snapPoints());
    container.style.scrollSnapType = "none";
    scrollAnimationRef.current?.stop();
    if (reducedMotion) {
      container.scrollLeft = target;
      container.style.scrollSnapType = "";
      return;
    }
    scrollAnimationRef.current = animate(container.scrollLeft, target, {
      ...(fromGesture && Math.abs(velocity) >= FLICK_VELOCITY_THRESHOLD ? springFlick : springMove),
      velocity,
      onUpdate: (value) => { container.scrollLeft = value; },
      onComplete: () => {
        container.scrollLeft = target;
        container.style.scrollSnapType = "";
        scrollAnimationRef.current = null;
      },
    });
  }, [containerRef, reducedMotion, snapPoints]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;
    scrollAnimationRef.current?.stop();
    elasticAnimationRef.current?.stop();
    scrollAnimationRef.current = null;
    elasticAnimationRef.current = null;
    container.style.scrollSnapType = "none";
    const now = performance.now();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: container.scrollLeft,
      startElasticOffset: elasticOffsetRef.current,
      intent: "pending",
      scrollSamples: [{ position: container.scrollLeft, time: now }],
      elasticSamples: [{ position: elasticOffsetRef.current, time: now }],
    };
    suppressClickRef.current = false;
  }, [containerRef]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const container = containerRef.current;
    if (!drag || !container || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (drag.intent === "pending" && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= DRAG_THRESHOLD) {
      drag.intent = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
      if (drag.intent === "horizontal") {
        container.setPointerCapture(event.pointerId);
        setIsDragging(true);
      }
    }
    if (drag.intent !== "horizontal") return;
    event.preventDefault();
    suppressClickRef.current = true;
    container.style.userSelect = "none";

    const max = Math.max(0, container.scrollWidth - container.clientWidth);
    const raw = drag.startScrollLeft - deltaX;
    const clamped = Math.min(max, Math.max(0, raw));
    container.scrollLeft = clamped;
    let elasticOffset = 0;
    if (!reducedMotion && raw !== clamped) {
      elasticOffset = drag.startElasticOffset - rubberband(raw - clamped, container.clientWidth);
    } else if (!reducedMotion && drag.startElasticOffset !== 0) {
      const interruptedOffset = drag.startElasticOffset + deltaX;
      if (Math.sign(interruptedOffset) === Math.sign(drag.startElasticOffset)) {
        elasticOffset = interruptedOffset;
      }
    }
    setElasticOffset(elasticOffset);

    const now = performance.now();
    drag.scrollSamples.push({ position: raw, time: now });
    drag.elasticSamples.push({ position: elasticOffset, time: now });
    drag.scrollSamples = drag.scrollSamples.filter((sample) => now - sample.time <= VELOCITY_WINDOW);
    drag.elasticSamples = drag.elasticSamples.filter((sample) => now - sample.time <= VELOCITY_WINDOW);
  }, [containerRef, reducedMotion, setElasticOffset]);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const container = containerRef.current;
    if (!drag || !container || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    container.style.userSelect = "";
    if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    if (drag.intent === "horizontal") {
      const now = performance.now();
      settle(recentVelocity(drag.scrollSamples, now), true);
      returnElastic(recentVelocity(drag.elasticSamples, now));
    } else {
      container.style.scrollSnapType = "";
    }
  }, [containerRef, returnElastic, settle]);

  const animateTo = useCallback((target: number) => {
    const container = containerRef.current;
    if (!container) return;
    scrollAnimationRef.current?.stop();
    if (reducedMotion) container.scrollLeft = target;
    else scrollAnimationRef.current = animate(container.scrollLeft, target, {
      ...springMove,
      onUpdate: (value) => { container.scrollLeft = value; },
    });
  }, [containerRef, reducedMotion]);

  const scrollBySnap = useCallback((direction: 1 | -1) => {
    const container = containerRef.current;
    if (!container) return;
    const points = snapPoints();
    const current = nearestSnap(container.scrollLeft, points);
    const index = Math.max(0, points.indexOf(current));
    const target = points[Math.min(points.length - 1, Math.max(0, index + direction))];
    if (target !== undefined) animateTo(target);
  }, [animateTo, containerRef, snapPoints]);

  const scrollToSnap = useCallback((index: number) => {
    const target = snapPoints()[index];
    if (target !== undefined) animateTo(target);
  }, [animateTo, snapPoints]);

  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  return {
    isDragging,
    scrollBySnap,
    scrollToSnap,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
    },
  };
}
