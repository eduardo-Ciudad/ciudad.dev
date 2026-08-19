"use client";

import { useEffect, useState } from "react";

/**
 * True when the device has a pointer that can genuinely hover (mouse,
 * trackpad). False on touch-only devices, where CSS `:hover` never
 * reliably engages — used to swap hover-triggered effects for a
 * scroll-into-view reveal instead.
 */
export function useSupportsHover() {
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover)");
    setSupportsHover(query.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setSupportsHover(event.matches);

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return supportsHover;
}
