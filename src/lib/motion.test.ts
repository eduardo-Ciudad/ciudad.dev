import { describe, expect, it } from "vitest";
import {
  nearestSnap,
  project,
  recentVelocity,
  rubberband,
  springFlick,
  springMove,
  springSnap,
} from "./motion";

describe("rubberband", () => {
  it("returns zero for zero overshoot", () => expect(rubberband(0, 300)).toBe(0));
  it("preserves a negative sign", () => expect(rubberband(-100, 300)).toBeLessThan(0));
  it("is smaller in magnitude than the overshoot", () => expect(Math.abs(rubberband(100, 300))).toBeLessThan(100));
  it("adds less displacement for each equal overshoot increment", () => {
    const values = [0, 100, 200, 300].map((overshoot) => rubberband(overshoot, 300));
    expect(values[2] - values[1]).toBeLessThan(values[1] - values[0]);
    expect(values[3] - values[2]).toBeLessThan(values[2] - values[1]);
  });
  it("never reaches the dimension", () => expect(Math.abs(rubberband(1_000_000, 300))).toBeLessThan(300));
  it("returns zero for a non-positive dimension", () => {
    expect(rubberband(100, 0)).toBe(0);
    expect(rubberband(100, -300)).toBe(0);
  });
});

describe("project", () => {
  it("returns zero for zero velocity", () => expect(project(0)).toBe(0));
  it("is linear in velocity", () => expect(project(200)).toBeCloseTo(project(100) * 2));
  it("preserves the velocity sign", () => expect(project(-100)).toBeLessThan(0));
  it("projects 1000 px/s to 499px at 0.998", () => expect(project(1000, 0.998)).toBeCloseTo(499));
  it("projects less with 0.99 than with 0.998", () => expect(project(1000, 0.99)).toBeLessThan(project(1000, 0.998)));
});

describe("nearestSnap", () => {
  it("returns the position for an empty list", () => expect(nearestSnap(12, [])).toBe(12));
  it("chooses the closest point", () => expect(nearestSnap(62, [0, 50, 100])).toBe(50));
  it("handles negative positions and positions beyond the last point", () => {
    expect(nearestSnap(-20, [0, 50, 100])).toBe(0);
    expect(nearestSnap(140, [0, 50, 100])).toBe(100);
  });
  it("returns the first point in list order on a tie", () => expect(nearestSnap(25, [0, 50])).toBe(0));
});

describe("recentVelocity", () => {
  it("returns zero for an empty list", () => expect(recentVelocity([], 100)).toBe(0));
  it("returns zero for one sample", () => expect(recentVelocity([{ position: 10, time: 50 }], 60)).toBe(0));
  it("returns zero when release is more than 80ms after the last sample", () => {
    expect(recentVelocity([{ position: 0, time: 0 }, { position: 10, time: 20 }], 101)).toBe(0);
  });
  it("uses only samples inside the window", () => {
    expect(recentVelocity([
      { position: -1000, time: 0 },
      { position: 10, time: 30 },
      { position: 50, time: 70 },
    ], 100)).toBe(1000);
  });
  it("returns negative velocity for backward movement", () => {
    expect(recentVelocity([{ position: 50, time: 20 }, { position: 10, time: 60 }], 60)).toBe(-1000);
  });
  it("returns velocity in units per second", () => {
    expect(recentVelocity([{ position: 0, time: 0 }, { position: 20, time: 40 }], 40)).toBe(500);
  });
});

describe("spring presets", () => {
  it("keeps non-gesture springs free of bounce", () => {
    expect(springMove.bounce).toBe(0);
    expect(springSnap.bounce).toBe(0);
  });
  it("allows bounce only on the flick preset", () => expect(springFlick.bounce).toBeGreaterThan(0));
});
