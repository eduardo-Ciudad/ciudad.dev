"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink, Image as ImageIcon, X } from "lucide-react";

export type ServiceDetail = {
  benefits: string[];
  inProgress?: string;
  example: {
    title: string;
    description: string;
    url: string;
    hasImagePreview?: boolean;
  };
  highlight?: {
    title: string;
    description: string;
  };
  otherProjects?: string;
};

type ServiceDetailModalProps = {
  title: string;
  details: ServiceDetail;
  onClose: () => void;
};

export function ServiceDetailModal({
  title,
  details,
  onClose,
}: ServiceDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          tabIndex={-1}
          className="relative bg-card border border-card-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-7 md:p-9 outline-none"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-5 right-5 text-muted hover:text-primary transition-colors"
          >
            <X size={20} />
          </button>

          <h3 className="font-heading font-semibold text-2xl md:text-3xl mb-6 pr-8">
            {title}
          </h3>

          <div className="mb-6">
            <h4 className="text-xs tracking-[0.1em] uppercase font-semibold text-muted mb-3">
              Benefícios
            </h4>
            <div className="space-y-2.5">
              {details.benefits.map((benefit) => (
                <div key={benefit} className="flex gap-2.5 text-sm">
                  <Check
                    size={16}
                    className="text-accent shrink-0 mt-0.5"
                  />
                  <span className="text-primary/80 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {details.inProgress && (
            <div className="mb-6 flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
              <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-amber-700 bg-amber-100 rounded-full px-2 py-1">
                Em desenvolvimento
              </span>
              <p className="text-xs text-amber-800 leading-relaxed">
                {details.inProgress}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-xs tracking-[0.1em] uppercase font-semibold text-muted mb-3">
              Projeto real
            </h4>

            {details.example.hasImagePreview && (
              <div className="aspect-video bg-surface border border-card-border rounded-lg flex flex-col items-center justify-center gap-2 mb-4">
                <ImageIcon size={24} className="text-muted/50" />
                <span className="text-xs text-muted/70">
                  Prévia em breve
                </span>
              </div>
            )}

            <p className="font-body font-semibold text-sm mb-1.5">
              {details.example.title}
            </p>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {details.example.description}
            </p>

            <a
              href={details.example.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent border border-accent-border rounded-full px-4 py-2 hover:bg-accent-light transition-colors"
            >
              Ver projeto
              <ExternalLink size={14} />
            </a>
          </div>

          {details.highlight && (
            <div className="mb-6 bg-surface border border-card-border rounded-lg px-4 py-4">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-muted bg-card border border-card-border rounded-full px-2 py-1 mb-2">
                Projeto em destaque
              </span>
              <p className="font-body font-semibold text-sm mb-1.5">
                {details.highlight.title}
              </p>
              <p className="text-sm text-muted leading-relaxed">
                {details.highlight.description}
              </p>
            </div>
          )}

          {details.otherProjects && (
            <p className="text-xs text-muted leading-relaxed">
              {details.otherProjects}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
