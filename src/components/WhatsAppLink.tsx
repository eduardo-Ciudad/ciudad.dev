"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackWhatsappClick, type CtaLocation } from "@/lib/analytics";

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
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
  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackWhatsappClick(location);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
