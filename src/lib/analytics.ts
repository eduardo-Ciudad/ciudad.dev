export type CtaLocation =
  | "hero"
  | "navbar"
  | "servicos"
  | "cta-final"
  | "footer"
  | "garantia"
  | "radar"
  | "calculadora"
  | "blog"
  | "servico-doc"
  | "projeto";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackWhatsappClick(location: CtaLocation): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", "generate_lead", {
    method: "whatsapp",
    cta_location: location,
  });
}
