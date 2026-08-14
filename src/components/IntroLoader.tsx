"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "ciudad-intro-seen";

const LETTER_STAGGER = 0.055;
const LETTER_DURATION = 0.3;
const BAR_DELAY = 0.1;
const BAR_DURATION = 1.1;
const HOLD_AFTER_BAR = 0.6;
const EXIT_DURATION = 0.65;
const EASE = [0.65, 0, 0.35, 1] as const;

const HOLD_MS = (BAR_DELAY + BAR_DURATION + HOLD_AFTER_BAR) * 1000;

const segments = [
  ...["c", "i", "u", "d", "a", "d"].map((text) => ({ text, accent: false })),
  { text: ".dev", accent: true },
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
  const [showOverlay, setShowOverlay] = useState(false);
  // Survives React Strict Mode's dev-only double-invoke of effects, so the
  // "should play" decision (and the sessionStorage write) only happens once
  // per real mount instead of being made twice and racing itself.
  const shouldPlayRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (shouldPlayRef.current === null) {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      shouldPlayRef.current = !alreadySeen && !prefersReducedMotion;
      sessionStorage.setItem(STORAGE_KEY, "1");

      if (shouldPlayRef.current) {
        setShowOverlay(true);
        document.body.style.overflow = "hidden";
      }
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
          transition={{ duration: EXIT_DURATION, ease: EASE }}
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
