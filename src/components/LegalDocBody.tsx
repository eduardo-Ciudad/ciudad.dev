import Link from "next/link";
import type { LegalBlock, LegalDoc } from "@/data/legal-docs";
import { legalDocs } from "@/data/legal-docs";

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "list") {
    return (
      <ul className="list-disc pl-5 space-y-1.5 text-primary/80 text-[15px] leading-relaxed mb-4">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "link") {
    return (
      <p className="text-primary/80 text-[15px] leading-[1.8] mb-4">
        {block.before}
        {block.external ? (
          <a
            href={block.href}
            className="text-accent hover:underline font-medium"
          >
            {block.linkText}
          </a>
        ) : (
          <Link href={block.href} className="text-accent hover:underline">
            {block.linkText}
          </Link>
        )}
        {block.after}
      </p>
    );
  }

  return (
    <p className="text-primary/80 text-[15px] leading-[1.8] mb-4">
      {block.text}
    </p>
  );
}

export function LegalDocBody({ doc }: { doc: LegalDoc }) {
  const otherDocs = legalDocs.filter((d) => d.slug !== doc.slug);

  return (
    <div className="max-w-[720px] mx-auto px-6 py-14 md:py-20">
      <h1 className="font-heading font-bold text-4xl md:text-5xl tracking-[-0.5px] text-primary mb-3">
        {doc.title}
      </h1>
      <p className="text-muted text-sm mb-10">
        Última atualização: {doc.updatedAt}
      </p>

      {doc.intro.map((block, i) => (
        <Block key={i} block={block} />
      ))}

      {doc.sections.map((section) => (
        <div key={section.id} id={section.id} className="mt-10">
          <h2 className="font-heading font-semibold text-2xl mb-4 tracking-[-0.5px]">
            {section.title}
          </h2>

          {section.blocks?.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {section.subsections?.map((sub) => (
            <div key={sub.title} className="mt-6">
              <h3 className="font-body font-semibold text-base mb-3">
                {sub.title}
              </h3>
              {sub.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-16 pt-8 border-t border-divider flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="text-muted">Ver também:</span>
        {otherDocs.map((d) => (
          <Link
            key={d.slug}
            href={`/${d.slug}`}
            className="text-accent hover:underline"
          >
            {d.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
