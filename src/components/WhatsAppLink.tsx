"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { trackWhatsappClick, type CtaLocation } from "@/lib/analytics";
import { springSnap } from "@/lib/motion";

type WhatsAppLinkProps = HTMLMotionProps<"a"> & {
  href: string;
  location: CtaLocation;
};

export function WhatsAppLink({
  href,
  location,
  onClick,
  children,
  ...props
}: WhatsAppLinkProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={reducedMotion ? undefined : { scale: 0.97 }}
      transition={springSnap}
      onClick={(event) => {
        trackWhatsappClick(location);
        onClick?.(event);
      }}
    >
      {children}
    </motion.a>
  );
}
