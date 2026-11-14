import Image from "next/image";
import type { ReactNode } from "react";

type CapaProjetoBaseProps = {
  nome: string;
  tamanho?: "lg" | "md" | "sm";
  aspecto?: "16/9" | "4/3";
  tema?: "claro" | "escuro";
  posicao?: string;
  preencherAltura?: boolean;
};

type CapaProjetoProps = CapaProjetoBaseProps &
  ({ children: ReactNode; src?: string } | { children?: undefined; src: string });

const tamanhos = {
  lg: {
    moldura: "px-7 pt-7",
    barra: "h-[26px] gap-1.5 px-3",
    bolinha: "size-2",
    janela: "rounded-t-[12px]",
  },
  md: {
    moldura: "px-5 pt-5",
    barra: "h-[18px] gap-1 px-2.5",
    bolinha: "size-1.5",
    janela: "rounded-t-[12px]",
  },
  sm: {
    moldura: "px-4 pt-4",
    barra: "h-3.5 gap-1 px-2",
    bolinha: "size-[5px]",
    janela: "rounded-t-[12px]",
  },
} as const;

export function CapaProjeto({
  src,
  nome,
  tamanho = "lg",
  aspecto = "16/9",
  tema = "claro",
  posicao = "top",
  preencherAltura = false,
  children,
}: CapaProjetoProps) {
  const config = tamanhos[tamanho];
  const escuro = tema === "escuro";

  return (
    <div
      className={`${config.moldura} overflow-hidden ${preencherAltura ? "sm:flex sm:h-full sm:flex-col" : ""} ${escuro ? "bg-[#12131b]" : "bg-[var(--color-cover)]"}`}
    >
      <div
        className={`${config.janela} overflow-hidden border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${preencherAltura ? "sm:flex sm:flex-1 sm:flex-col" : ""} ${
          escuro ? "bg-[#12131b]" : "bg-white"
        }`}
      >
        <div
          aria-hidden="true"
          className={`${config.barra} flex shrink-0 items-center border-b border-white/[0.05] bg-[#252830]`}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((cor) => (
            <span
              key={cor}
              className={`${config.bolinha} rounded-full`}
              style={{ backgroundColor: cor }}
            />
          ))}
        </div>
        <div
          className={`relative overflow-hidden ${aspecto === "4/3" ? "aspect-[4/3]" : "aspect-video"} ${
            preencherAltura ? "sm:min-h-[200px] sm:flex-1 sm:aspect-auto" : ""
          }`}
        >
          {children != null ? (
            <div className="h-full transition-transform duration-400 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              {children}
            </div>
          ) : (
            <Image
              fill
              src={src!}
              alt={`Página do projeto ${nome}`}
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 100vw"
              className="object-cover transition-transform duration-400 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              style={{ objectPosition: posicao }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
