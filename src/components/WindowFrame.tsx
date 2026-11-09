import type { ComponentPropsWithoutRef, ReactNode } from "react";

type WindowFrameProps = ComponentPropsWithoutRef<"div"> & {
  address?: string;
  children: ReactNode;
  variant?: "default" | "card-cover";
  tone?: "dark" | "light";
};

export function WindowBar({ address, tone = "dark" }: { address?: string; tone?: "dark" | "light" }) {
  return (
    <div className={`window-frame-bar ${tone === "light" ? "window-frame-bar-light" : ""}`} aria-hidden="true">
      <span className="window-frame-dot bg-[#FF5F57]" />
      <span className="window-frame-dot bg-[#FEBC2E]" />
      <span className="window-frame-dot bg-[#28C840]" />
      {address && <span className="window-frame-address">{address}</span>}
    </div>
  );
}

export function WindowFrame({ address, children, className = "", variant = "default", tone = "dark", ...props }: WindowFrameProps) {
  return (
    <div className={`window-frame ${tone === "light" ? "window-frame-light" : ""} ${variant === "card-cover" ? "window-frame-card-cover" : ""} ${className}`} {...props}>
      <WindowBar address={address} tone={tone} />
      {children}
    </div>
  );
}
