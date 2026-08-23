import { WHATSAPP_NUMBER } from "@/data/whatsapp";

const CONTACT_EMAIL = "eduardo.ciudad.dev@gmail.com";

function formatE164ToInternational(e164: string): string {
  const countryCode = e164.slice(0, 2);
  const areaCode = e164.slice(2, 4);
  const rest = e164.slice(4);
  const prefix = rest.slice(0, rest.length - 4);
  const line = rest.slice(-4);
  return `+${countryCode} ${areaCode} ${prefix}-${line}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CiudadLab",
  url: "https://www.ciudadlab.com.br",
  description:
    "Da ideia ao ar. Sites, lojas e sistemas sob medida — prontos pra rodar. Sem template genérico, sem intermediário.",
  sameAs: [
    "https://www.linkedin.com/in/eduardociudadf/",
    "https://github.com/eduardo-Ciudad",
  ],
  email: CONTACT_EMAIL,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: CONTACT_EMAIL,
    telephone: formatE164ToInternational(WHATSAPP_NUMBER),
  },
};
