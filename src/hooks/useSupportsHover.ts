"use client";

import { useSyncExternalStore } from "react";

const hoverQuery = "(hover: hover)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(hoverQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(hoverQuery).matches;
}

/**
 * True when the device has a pointer that can genuinely hover (mouse,
 * trackpad). False on touch-only devices, where CSS `:hover` never
 * reliably engages — used to swap hover-triggered effects for a
 * scroll-into-view reveal instead.
 */
export function useSupportsHover() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
