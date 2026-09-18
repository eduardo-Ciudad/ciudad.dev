"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Code2, Plus } from "lucide-react";
import type { DocGroup } from "@/data/services-docs";

type DetalhesTecnicosProps = {
  groups: DocGroup[];
};

export function DetalhesTecnicos({ groups }: DetalhesTecnicosProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="group mt-8 overflow-hidden rounded-lg border border-card-border bg-card transition-all duration-300 ease-out hover:shadow-[0_8px_20px_-12px_rgba(37,99,235,0.15)] hover:ring-1 hover:ring-accent-border">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left focus-visible:outline-2 focus-visible:outline-accent md:p-6"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-accent-border bg-accent-light transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent-border">
            <Code2 size={20} className="text-accent" aria-hidden="true" />
          </span>
          <span className="font-body text-base font-semibold text-accent">
            Ver detalhes técnicos
          </span>
        </span>

        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent-border bg-accent-light text-accent"
        >
          <Plus
            size={18}
            className={`transition-transform duration-300 ease-out ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
