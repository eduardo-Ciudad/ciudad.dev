import type { Transition } from "framer-motion";

export type MotionSample = { position: number; time: number };

export const FLICK_VELOCITY_THRESHOLD = 300;

export const springMove = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
} satisfies Transition;

export const springSnap = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
} satisfies Transition;

export const springFlick = {
  type: "spring",
  bounce: 0.2,
  duration: 0.4,
} satisfies Transition;

export const reducedMotionFade = {
  duration: 0.12,
  ease: "linear",
} satisfies Transition;

export function rubberband(
  overshoot: number,
  dimension: number,
  constant = 0.55,
) {
  if (dimension <= 0) return 0;
  return (
    (overshoot * dimension * constant) /
    (dimension + constant * Math.abs(overshoot))
  );
}

export function project(velocityPxPerSec: number, decelerationRate = 0.998) {
  return (
    (velocityPxPerSec / 1000) *
    (decelerationRate / (1 - decelerationRate))
  );
}

export function nearestSnap(position: number, snapPoints: readonly number[]) {
  if (snapPoints.length === 0) return position;
  return snapPoints.reduce((nearest, point) =>
    Math.abs(point - position) < Math.abs(nearest - position) ? point : nearest,
  );
}

export function recentVelocity(
  samples: readonly MotionSample[],
  now: number,
  windowMs = 80,
) {
  const last = samples.at(-1);
  if (!last || now - last.time > windowMs) return 0;
  const recent = samples.filter((sample) => now - sample.time <= windowMs);
  const first = recent[0];
  if (!first || last.time <= first.time) return 0;
  return ((last.position - first.position) / (last.time - first.time)) * 1000;
}
