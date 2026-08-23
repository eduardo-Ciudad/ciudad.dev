import { ImageResponse } from "next/og";

export const alt = "CiudadLab — Sites, lojas e sistemas sob medida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = "CiudadLab";
const TAGLINE = "Sites, lojas e sistemas sob medida";

async function loadGoogleFont(font: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype)'\)/);

  if (match) {
    const response = await fetch(match[1]);
    if (response.status === 200) {
      return response.arrayBuffer();
    }
  }

  throw new Error(`Falha ao carregar a fonte ${font}`);
}

export default async function OpengraphImage() {
  const fonts: { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" }[] = [];

  try {
    const [cormorant, dmSans] = await Promise.all([
      loadGoogleFont("Cormorant+Garamond", 600, TITLE),
      loadGoogleFont("DM+Sans", 400, TAGLINE),
    ]);
    fonts.push(
      { name: "Cormorant Garamond", data: cormorant, weight: 600, style: "normal" },
      { name: "DM Sans", data: dmSans, weight: 400, style: "normal" }
    );
  } catch {
    // Sem acesso à rede no momento do build: cai pro fallback de fonte padrão do satori.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f0e8",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "#2563eb",
            marginBottom: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: fonts.length ? "Cormorant Garamond" : "serif",
            fontWeight: 600,
            fontSize: 96,
            color: "#1a1a1a",
            letterSpacing: "-1px",
          }}
        >
          {TITLE}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: fonts.length ? "DM Sans" : "sans-serif",
            fontWeight: 400,
            fontSize: 32,
            color: "#6b6b6b",
            marginTop: 20,
          }}
        >
          {TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length ? fonts : undefined,
    }
  );
}
