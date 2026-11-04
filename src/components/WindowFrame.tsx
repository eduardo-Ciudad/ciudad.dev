import type { ComponentPropsWithoutRef, ReactNode } from "react";

type WindowFrameProps = ComponentPropsWithoutRef<"div"> & {
  address?: string;
  children: ReactNode;
  variant?: "default" | "card-cover";
};

export function WindowBar({ address }: { address?: string }) {
  return (
    <div className="window-frame-bar" aria-hidden="true">
      <span className="window-frame-dot bg-[#FF5F57]" />
      <span className="window-frame-dot bg-[#FEBC2E]" />
      <span className="window-frame-dot bg-[#28C840]" />
      {address && <span className="window-frame-address">{address}</span>}
    </div>
  );
}

export function WindowFrame({ address, children, className = "", variant = "default", ...props }: WindowFrameProps) {
  return (
    <div className={`window-frame ${variant === "card-cover" ? "window-frame-card-cover" : ""} ${className}`} {...props}>
      <WindowBar address={address} />
      {children}
    </div>
  );
}
