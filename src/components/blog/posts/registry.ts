import { extras as googleAnalytics } from "./google-analytics-o-que-olhar-em-5-minutos";
import { extras as radarWhatsApp } from "./um-mes-no-radar-botao-whatsapp";
import { extras as radarRevisao } from "./o-que-revisei-antes-de-colocar-o-radar-no-ar";
import { extras as kellyHexagonal } from "./kelly-academy-arquitetura-hexagonal";
import type { PostExtras } from "./types";

const registry: Record<string, PostExtras> = {
  "google-analytics-o-que-olhar-em-5-minutos": googleAnalytics,
  "um-mes-no-radar-botao-whatsapp": radarWhatsApp,
  "o-que-revisei-antes-de-colocar-o-radar-no-ar": radarRevisao,
  "kelly-academy-arquitetura-hexagonal": kellyHexagonal,
};

export function getPostExtras(slug: string): PostExtras { return registry[slug] ?? {}; }
