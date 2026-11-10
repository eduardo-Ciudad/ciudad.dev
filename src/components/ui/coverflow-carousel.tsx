"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { animate, motion, useReducedMotion, type AnimationPlaybackControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { FLICK_VELOCITY_THRESHOLD, nearestSnap, project, recentVelocity, rubberband, springFlick, springMove, springSnap, type MotionSample } from "@/lib/motion";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface CoverflowSlide {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  targetId?: string;
  href?: string;
  meta?: { label: string; value: string }[];
}

export interface CoverflowCarouselProps {
  slides: CoverflowSlide[];
  rotate?: number;
  depth?: number;
  perspective?: number;
  falloff?: number;
  fade?: number;
  cardWidth?: string;
  cardHeight?: string;
  gap?: number;
  loop?: boolean;
  showCaption?: boolean;
  showPagination?: boolean;
  showNavigation?: boolean;
  ctaLabel?: string;
  imageFit?: "cover" | "contain";
  imageSizes?: string;
  imageQuality?: number;
  enableLightbox?: boolean;
  label?: string;
  className?: string;
  cardClassName?: string;
}

export function CoverflowCarousel({
  slides,
  rotate = 44,
  depth = 0.6,
  perspective = 3,
  falloff = 0.56,
  fade = 0.1,
  cardWidth = "clamp(148px, 22vw, 260px)",
  cardHeight,
  gap = 0.05,
  loop = true,
  showCaption = false,
  showPagination = false,
  showNavigation = false,
  ctaLabel = "Ver detalhes",
  imageFit = "cover",
  imageSizes,
  imageQuality,
  enableLightbox = false,
  label = "Carrossel de projetos",
  className,
  cardClassName,
}: CoverflowCarouselProps) {
  const count = slides.length;
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const widthRef = React.useRef(0);
  const animationRef = React.useRef<AnimationPlaybackControls | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    y: number;
    pos: number;
    samples: MotionSample[];
    intent: "pending" | "horizontal" | "vertical";
  } | null>(null);
  const [selected, setSelected] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const dragDistanceRef = React.useRef(0);

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  const setWillChange = React.useCallback((value: "transform" | "auto") => {
    if (!imageSizes) return;
    cardRefs.current.forEach((card) => {
      if (card) card.style.willChange = value;
    });
  }, [imageSizes]);

  const paint = React.useCallback(() => {
    const width = widthRef.current;
    if (!width) return;
    const pitch = width * (1 + gap);
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      let offset = index - pos;
      if (loop) {
        offset = ((offset % count) + count) % count;
        if (offset > count / 2) offset -= count;
      }
      const distance = Math.abs(offset);
      const ramp = Math.pow(distance, falloff);
      const tilt = Math.min(rotate * ramp, 82) * Math.sign(offset);
      card.style.transform = imageSizes && distance === 0
        ? "translateX(-50%)"
        : `translateX(calc(-50% + ${offset * pitch}px)) ` +
          `translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;
      const edge = loop ? Math.min(1, Math.max(0, count / 2 - distance)) : 1;
      card.style.opacity = String(Math.max(0, 1 - fade * distance) * edge);
      card.style.zIndex = String(100 - Math.round(distance));
    });
  }, [count, depth, fade, falloff, gap, imageSizes, loop, rotate]);

  const settle = React.useCallback(
    (target: number, velocity = 0, fromGesture = false) => {
      animationRef.current?.stop();
      setWillChange("transform");
      targetRef.current = target;
      setSelected(indexAt(target));
      if (shouldReduceMotion) {
        posRef.current = target;
        paint();
        setWillChange("auto");
        return;
      }
      const velocityPx = velocity * widthRef.current * (1 + gap);
      const hasImpulse = fromGesture && Math.abs(velocityPx) >= FLICK_VELOCITY_THRESHOLD;
      animationRef.current = animate(posRef.current, target, {
        ...(hasImpulse ? springFlick : springMove),
        velocity,
        onUpdate: (value) => {
          posRef.current = value;
          paint();
        },
        onComplete: () => {
          posRef.current = target;
          paint();
          setWillChange("auto");
          animationRef.current = null;
        },
      });
    },
    [gap, indexAt, paint, setWillChange, shouldReduceMotion],
  );

  const clamp = React.useCallback(
    (pos: number) => (loop ? pos : Math.max(0, Math.min(count - 1, pos))),
    [count, loop],
  );
  const goTo = React.useCallback(
    (index: number) => {
      const target = loop
        ? index + Math.round((targetRef.current - index) / count) * count
        : index;
      settle(clamp(target));
    },
    [clamp, count, loop, settle],
  );
  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    animationRef.current?.stop();
    animationRef.current = null;
    setWillChange("transform");
    targetRef.current = posRef.current;
    dragDistanceRef.current = 0;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      pos: posRef.current,
      samples: [{ position: posRef.current, time: performance.now() }],
      intent: "pending",
    };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    const deltaX = event.clientX - drag.x;
    const deltaY = event.clientY - drag.y;
    if (drag.intent === "pending" && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 8) {
      drag.intent = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
      if (drag.intent === "horizontal") event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (drag.intent !== "horizontal") return;
    event.preventDefault();
    dragDistanceRef.current = Math.abs(deltaX);
    const pitch = widthRef.current * (1 + gap);
    if (!pitch) return;
    const now = performance.now();
    const rawPosition = drag.pos - deltaX / pitch;
    if (shouldReduceMotion || loop || (rawPosition >= 0 && rawPosition <= count - 1)) {
      posRef.current = clamp(rawPosition);
    } else {
      const boundary = rawPosition < 0 ? 0 : count - 1;
      const overshootPx = (rawPosition - boundary) * pitch;
      const dimension = frameRef.current?.clientWidth ?? pitch;
      posRef.current = boundary + rubberband(overshootPx, dimension) / pitch;
    }
    drag.samples.push({ position: posRef.current, time: now });
    drag.samples = drag.samples.filter((sample) => now - sample.time <= 80);
    const index = indexAt(posRef.current);
    if (index !== selected) setSelected(index);
    paint();
  };
  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    if (drag.intent === "vertical") return;

    if (enableLightbox && dragDistanceRef.current <= 6) {
      const target = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-index]");
      const index = target ? Number(target.dataset.index) : NaN;
      if (!Number.isNaN(index)) {
        setWillChange("auto");
        setLightboxIndex(index);
        return;
      }
    }

    const now = performance.now();
    const velocity = recentVelocity(drag.samples, now);
    const pitch = widthRef.current * (1 + gap);
    const projected = shouldReduceMotion
      ? posRef.current
      : posRef.current + project(velocity * pitch) / pitch;
    const snapPoints = Array.from({ length: count }, (_, index) => index);
    settle(clamp(nearestSnap(projected, snapPoints)), velocity, true);
  };

  useIsoLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const card = cardRefs.current[0];
      if (!card) return;
      widthRef.current = card.offsetWidth;
      paint();
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(() => () => animationRef.current?.stop(), []);

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex]);

  const active = slides[selected];
  const scrollToActive = () => {
    if (active?.href) {
      router.push(active.href);
      return;
    }
    if (!active?.targetId) return;
    document.getElementById(active.targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      className={cn("w-full", className)}
      style={{
        ["--cf-card" as string]: cardWidth,
        ["--cf-card-height" as string]: cardHeight ?? cardWidth,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="relative">
        <div
          ref={frameRef}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="cursor-grab overflow-hidden py-10 outline-none focus-visible:ring-2 focus-visible:ring-accent active:cursor-grabbing"
          style={{
            perspective: `calc(var(--cf-card) * ${perspective})`,
            touchAction: "pan-y",
          }}
        >
          <div
            className="relative select-none"
            style={{ height: "var(--cf-card-height)", transformStyle: "preserve-3d" }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                ref={(node) => { cardRefs.current[index] = node; }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} de ${count}`}
                data-index={index}
                className={cn(
                  "absolute left-1/2 top-0 aspect-square overflow-hidden rounded-2xl bg-card shadow-xl",
                  !imageSizes && "will-change-transform",
                  enableLightbox && "cursor-zoom-in",
                  cardClassName,
                )}
                style={{ width: "var(--cf-card)" }}
              >
                {imageSizes ? (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes={imageSizes}
                    quality={imageQuality}
                    draggable={false}
                    className={cn(
                      "select-none",
                      imageFit === "contain" ? "object-contain" : "object-cover",
                    )}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    className={cn(
                      "h-full w-full select-none",
                      imageFit === "contain" ? "object-contain" : "object-cover",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {showNavigation && (
          <>
            <motion.button type="button" aria-label="Projeto anterior" onClick={() => nudge(-1)} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }} transition={springSnap} className="absolute left-2 top-1/2 z-[200] -translate-y-1/2 rounded-full border border-card-border bg-card/80 p-2 text-primary shadow-sm backdrop-blur transition hover:bg-card focus-visible:outline-2 focus-visible:outline-accent sm:left-3">
              <ChevronLeft className="size-5" />
            </motion.button>
            <motion.button type="button" aria-label="Próximo projeto" onClick={() => nudge(1)} whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }} transition={springSnap} className="absolute right-2 top-1/2 z-[200] -translate-y-1/2 rounded-full border border-card-border bg-card/80 p-2 text-primary shadow-sm backdrop-blur transition hover:bg-card focus-visible:outline-2 focus-visible:outline-accent sm:right-3">
              <ChevronRight className="size-5" />
            </motion.button>
          </>
        )}
      </div>

      {showCaption && active?.title && (
        <div key={selected} className="mt-2 flex flex-col items-center px-6 duration-300 animate-in fade-in">
          <p className="text-[15px] font-semibold tracking-tight text-primary">{active.title}</p>
          {active.subtitle && <p className="mt-1 text-[13px] text-muted">{active.subtitle}</p>}
          {active.meta && active.meta.length > 0 && (
            <dl className="mt-10 w-full max-w-[230px] text-[12px]">
              {active.meta.map((row) => (
                <div key={row.label} className="flex justify-between py-[5px]">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="font-medium text-primary">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {(active.targetId || active.href) && (
            <button type="button" onClick={scrollToActive} className="mt-4 rounded-full border border-accent-border px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-accent">
              {ctaLabel}
            </button>
          )}
        </div>
      )}

      {showPagination && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <button key={slide.src} type="button" aria-label={`Ir para o projeto ${index + 1}`} aria-current={index === selected} onClick={() => goTo(index)} className={cn("size-2 rounded-full bg-primary transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", index === selected ? "opacity-100" : "opacity-30")} />
          ))}
        </div>
      )}

      {lightboxIndex !== null && slides[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={slides[lightboxIndex].alt}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-6 duration-200 animate-in fade-in md:p-16"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white sm:right-6 sm:top-6"
          >
            <X className="size-5" />
          </button>
          <div
            className="flex max-h-full max-w-full flex-col items-center gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slides[lightboxIndex].src}
              alt={slides[lightboxIndex].alt}
              className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl duration-200 animate-in zoom-in-95"
            />
            {slides[lightboxIndex].title && (
              <p className="text-sm font-medium text-white/90">
                {slides[lightboxIndex].title}
                {slides[lightboxIndex].subtitle ? ` · ${slides[lightboxIndex].subtitle}` : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
