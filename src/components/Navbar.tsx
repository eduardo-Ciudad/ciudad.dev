"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-dark h-16 flex items-center"
      aria-label="Navegação principal"
    >
      <div className="w-full max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-xl font-heading font-semibold text-white">
          ciudad<span className="text-accent">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/65 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="text-sm border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-colors"
          >
            Começar projeto
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-dark border-t border-white/10 md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/65 hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                className="text-sm border border-accent text-accent px-4 py-2 rounded-md hover:bg-accent hover:text-white transition-colors text-center"
                onClick={() => setOpen(false)}
              >
                Começar projeto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
