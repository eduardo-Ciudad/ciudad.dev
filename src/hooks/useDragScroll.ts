"use client";

import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";

interface UseDragScrollOptions {
  containerRef: RefObject<HTMLElement | null>;
  itemSelector: string;
  reducedMotion?: boolean;
}

const DRAG_THRESHOLD = 5;

export function useDragScroll({ containerRef, itemSelector, reducedMotion = false }: UseDragScrollOptions) {
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const snapToNearest = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    const nearest = items.reduce<HTMLElement | null>((closest, item) => {
      if (!closest) return item;
      return Math.abs(item.offsetLeft - container.scrollLeft) < Math.abs(closest.offsetLeft - container.scrollLeft) ? item : closest;
    }, null);
    nearest?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
  }, [containerRef, itemSelector, reducedMotion]);

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;
    container.setPointerCapture(event.pointerId);
    container.style.scrollSnapType = "none";
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: container.scrollLeft, moved: false };
    suppressClickRef.current = false;
    setIsDragging(true);
  }, [containerRef]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const container = containerRef.current;
    if (!drag || !container || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > DRAG_THRESHOLD) {
      drag.moved = true;
      suppressClickRef.current = true;
      container.style.userSelect = "none";
    }
    if (drag.moved) {
      event.preventDefault();
      container.scrollLeft = drag.startScrollLeft - distance;
    }
  }, [containerRef]);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    const container = containerRef.current;
    if (!drag || !container || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    container.style.userSelect = "";
    container.style.scrollSnapType = "";
    if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    if (drag.moved) snapToNearest();
  }, [containerRef, snapToNearest]);

  const onClickCapture = useCallback((event: ReactMouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  return { isDragging, dragHandlers: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onClickCapture } };
}
