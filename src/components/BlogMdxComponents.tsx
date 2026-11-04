import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { WindowBar } from "@/components/WindowFrame";

function MdxLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function ResponsiveTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll" role="region" aria-label="Tabela com rolagem horizontal" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

function CodeFigure({ children, ...props }: ComponentPropsWithoutRef<"figure">) {
  const isCodeBlock = "data-rehype-pretty-code-figure" in props;

  if (!isCodeBlock) return <figure {...props}>{children}</figure>;

  return (
    <figure {...props}>
      <WindowBar />
      {children}
    </figure>
  );
}

export const blogMdxComponents = {
  a: MdxLink,
  figure: CodeFigure,
  table: ResponsiveTable,
};
