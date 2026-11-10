"use client";

import { useId, useState } from "react";
import { Check, Code2 } from "lucide-react";
import type { DocGroup } from "@/data/services-docs";

type DetalhesTecnicosProps = {
  groups: DocGroup[];
};

export function DetalhesTecnicos({ groups }: DetalhesTecnicosProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="liquid-group group relative mt-8 overflow-hidden rounded-2xl border border-card-border bg-card" data-open={isOpen}>
      <span className="liquid-pool" aria-hidden="true" />
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="relative z-10 flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left focus-visible:outline-2 focus-visible:outline-accent md:p-6"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-accent-border bg-accent-light transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent-border">
            <Code2 size={20} className="text-accent" aria-hidden="true" />
          </span>
          <span className="font-body text-base font-semibold text-accent">
            Ver detalhes técnicos
          </span>
        </span>

        <span className="liquid-icon" aria-hidden="true" />
      </button>

      <div id={contentId} aria-hidden={!isOpen} inert={!isOpen} className={`relative z-10 grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.25,.9,.3,1)] motion-reduce:duration-0 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
            <div className="mx-5 space-y-7 border-t border-divider pb-6 pt-6 md:mx-6">
              {groups.map((group) => (
                <div key={group.subtitle}>
                  <h3 className="mb-3 font-body text-base font-semibold">
                    {group.subtitle}
                  </h3>
                  <div className="space-y-2.5">
                    {group.items.map((item) => (
                      <div key={item} className="flex gap-2.5 text-sm">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-accent"
                        />
                        <span className="leading-relaxed text-primary/80">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
