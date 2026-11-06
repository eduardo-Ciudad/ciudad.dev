export const radar = {
  heroImage: {
    src: "/img/radar/radar-sites.png",
    alt: "Painel do Radar com os sites monitorados",
    width: 1913,
    height: 857,
  },
} as const;

export const RADAR_STATUS = "No ar";

export const RADAR_STATS = [
  { valor: "06h", rotulo: "sincronização diária com o Google" },
  { valor: "7·28·90", rotulo: "dias comparados com o período anterior" },
  { valor: "131", rotulo: "testes automatizados" },
] as const;
