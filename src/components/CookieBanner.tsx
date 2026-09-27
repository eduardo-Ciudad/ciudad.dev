"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const CONSENT_KEY = "ciudadlab-consent";
const OPEN_EVENT = "ciudadlab:open-cookie-preferences";

type ConsentChoice = "granted" | "denied";

export function openCookiePreferences() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const showPreferences = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, showPreferences);

    const timer = window.setTimeout(() => {
      try {
        setOpen(localStorage.getItem(CONSENT_KEY) === null);
      } catch {
        setOpen(true);
      }
    }, 2600);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, showPreferences);
    };
  }, []);

  const choose = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // Consent still applies to this page load when storage is unavailable.
    }
    window.gtag?.("consent", "update", {
      analytics_storage: choice,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="dialog"
          aria-label="Preferências de cookies"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-xl border border-card-border bg-card p-4 shadow-xl md:flex md:items-center md:gap-5 md:p-5"
        >
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-primary/80">
            Usamos cookies de análise (Google Analytics) para entender como o site é usado. Nada de anúncios.{" "}
            <Link href="/cookies" className="font-medium text-accent hover:opacity-80">
              Política de Cookies
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0 md:shrink-0">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-full border border-accent-border px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Recusar
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-full border border-accent-border px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Aceitar
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
