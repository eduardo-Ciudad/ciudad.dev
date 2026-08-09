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
            <h4 className="text-white text-sm font-semibold mb-3">Social</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6">
          <p className="text-white/30 text-xs text-center">
            © 2026 ciudad.dev — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
