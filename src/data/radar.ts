export const radar = {
  heroImage: {
    src: "/img/radar/radar-sites.png",
    alt: "Painel do Radar com os sites monitorados",
    width: 1913,
    height: 857,
  },
} as const;

export const RADAR_STATUS = "No ar";

export const RADAR_TESTES = 131;

export const RADAR_STATS = [
  { valor: "06h", rotulo: "sincronização diária com o Google" },
  { valor: "3", rotulo: "períodos comparados: 7, 28 e 90 dias" },
  { valor: String(RADAR_TESTES), rotulo: "testes automatizados" },
] as const;
