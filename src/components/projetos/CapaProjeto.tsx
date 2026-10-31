import Image from "next/image";

type CapaProjetoProps = {
  src: string;
  nome: string;
  tamanho?: "lg" | "md" | "sm";
  aspecto?: "16/9" | "4/3";
  tema?: "claro" | "escuro";
  posicao?: string;
};

const tamanhos = {
  lg: {
    moldura: "px-7 pt-7",
    barra: "h-[26px] gap-1.5 px-3",
    bolinha: "size-2",
    janela: "rounded-t-[10px]",
  },
  md: {
    moldura: "px-5 pt-5",
    barra: "h-[18px] gap-1 px-2.5",
    bolinha: "size-1.5",
    janela: "rounded-t-lg",
  },
  sm: {
    moldura: "px-4 pt-4",
    barra: "h-3.5 gap-1 px-2",
    bolinha: "size-[5px]",
    janela: "rounded-t-md",
  },
} as const;

export function CapaProjeto({
  src,
  nome,
  tamanho = "lg",
  aspecto = "16/9",
  tema = "claro",
  posicao = "top",
}: CapaProjetoProps) {
  const config = tamanhos[tamanho];
  const escuro = tema === "escuro";

  return (
    <div
      className={`${config.moldura} overflow-hidden ${escuro ? "bg-[#12131b]" : "bg-[var(--color-cover)]"}`}
    >
      <div
        className={`${config.janela} overflow-hidden border shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${
          escuro ? "border-[#1f2130] bg-[#12131b]" : "border-black/[0.06] bg-white"
        }`}
      >
        <div
          aria-hidden="true"
          className={`${config.barra} flex items-center border-b ${
            escuro ? "border-[#1f2130] bg-[#161825]" : "border-black/[0.06] bg-[#fbfaf7]"
          }`}
        >
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className={`${config.bolinha} rounded-full ${escuro ? "bg-[#2c2f42]" : "bg-[#d6cfc2]"}`}
            />
          ))}
        </div>
        <div className={`relative ${aspecto === "4/3" ? "aspect-[4/3]" : "aspect-video"}`}>
          <Image
            fill
            src={src}
            alt={`Página do projeto ${nome}`}
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 100vw"
            className="object-cover transition-transform duration-400 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: posicao }}
          />
        </div>
      </div>
    </div>
  );
}
