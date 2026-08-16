"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// useLayoutEffect fires synchronously after DOM mutations but before the
// browser paints, so the "already seen" case can hide the overlay before
// it's ever visually shown. It's a no-op on the server (falls back to
// useEffect there) to avoid React's SSR warning.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STORAGE_KEY = "ciudadlab-intro-seen";

const LETTER_STAGGER = 0.055;
const LETTER_DURATION = 0.3;
const BAR_DELAY = 0.1;
const BAR_DURATION = 1.1;
const HOLD_AFTER_BAR = 0.6;
const EXIT_DURATION = 0.65;
const EASE = [0.65, 0, 0.35, 1] as const;

const HOLD_MS = (BAR_DELAY + BAR_DURATION + HOLD_AFTER_BAR) * 1000;

const segments = [
  ...["C", "i", "u", "d", "a", "d"].map((text) => ({ text, accent: false })),
  { text: "Lab", accent: true },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: LETTER_STAGGER },
  },
};

const segmentVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: LETTER_DURATION },
  },
};

export function IntroLoader() {
  // Defaults to visible so the SSR HTML and the very first client paint
  // both render the overlay — the underlying page can never flash through
  // before it. Whether it should stay (first visit) or vanish instantly
  // (already seen) is decided before paint, below.
  const [showOverlay, setShowOverlay] = useState(true);
  // Survives React Strict Mode's dev-only double-invoke of effects, so the
  // "should play" decision (and the sessionStorage write) only happens once
  // per real mount instead of being made twice and racing itself.
  const shouldPlayRef = useRef<boolean | null>(null);
  // When true, the AnimatePresence exit transition below runs with 0
  // duration — an "already seen" visit removes the overlay instantly
  // instead of playing the slide-up exit meant for first-time visits.
  const instantRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (shouldPlayRef.current === null) {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      shouldPlayRef.current = !alreadySeen && !prefersReducedMotion;
      sessionStorage.setItem(STORAGE_KEY, "1");

      if (!shouldPlayRef.current) {
        instantRef.current = true;
        setShowOverlay(false);
        return;
      }

      document.body.style.overflow = "hidden";
    }

    if (!shouldPlayRef.current) return;

    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, HOLD_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {showOverlay && (
        <motion.div
          key="intro-loader"
          className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center"
          exit={{ y: "-100%" }}
          transition={{
            duration: instantRef.current ? 0 : EXIT_DURATION,
            ease: EASE,
          }}
        >
          <motion.div
            className="flex items-baseline font-heading font-bold text-4xl md:text-5xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {segments.map((segment, i) => (
              <motion.span
                key={i}
                variants={segmentVariants}
                className={segment.accent ? "text-accent" : "text-white"}
              >
                {segment.text}
              </motion.span>
            ))}
          </motion.div>

          <div className="mt-6 w-[120px] h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: BAR_DURATION,
                delay: BAR_DELAY,
                ease: EASE,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
