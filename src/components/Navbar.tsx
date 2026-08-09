"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      aria-label="Navegação principal"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <a
          href="#"
          className="text-2xl md:text-[26px] font-heading font-bold text-primary"
        >
          ciudad<span className="text-accent">.dev</span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-primary hover:bg-primary/[0.06] rounded-lg transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="ml-3 text-sm font-semibold bg-accent text-white px-6 py-2.5 rounded-full hover:brightness-110 transition-all duration-200"
          >
            Começar projeto
          </a>
        </div>

        <button
          className="md:hidden text-primary"
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
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-divider md:hidden shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted font-medium hover:text-primary transition-colors py-1"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contato"
                className="text-sm font-semibold bg-accent text-white px-6 py-2.5 rounded-full hover:brightness-110 transition-all duration-200 text-center mt-1"
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
