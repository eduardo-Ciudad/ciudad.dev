import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackToSiteHeaderProps = {
  href?: string;
  label?: string;
};

export function BackToSiteHeader({
  href = "/",
  label = "Voltar ao site",
}: BackToSiteHeaderProps = {}) {
  return (
    <header className="sticky top-0 z-20 border-b border-divider bg-card/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          {label}
        </Link>
      </div>
    </header>
  );
}
