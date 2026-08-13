import Link from "next/link";
import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-dark py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <a
              href="#"
              className="text-xl font-heading font-semibold text-white"
            >
              ciudad<span className="text-accent">.dev</span>
            </a>
            <p className="mt-3 text-white/50 text-[13px] leading-relaxed">
              Sites, lojas e sistemas sob medida para quem leva o próprio
              negócio a sério.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#servicos"
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacidade"
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-white/50 text-[13px] hover:text-white transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Social</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/eduardociudadf/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com/eduardo-Ciudad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="mailto:eduardo.ciudad.dev@gmail.com"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="E-mail"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col items-center gap-1.5">
          <p className="text-white/30 text-xs text-center">
            © 2026 ciudad.dev — Todos os direitos reservados
          </p>
          <p className="text-white/30 text-[11px] text-center">
            CNPJ em processo de formalização
          </p>
        </div>
      </div>
    </footer>
  );
}
