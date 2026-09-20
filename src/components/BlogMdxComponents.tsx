import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

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

export const blogMdxComponents = {
  a: MdxLink,
  table: ResponsiveTable,
};
