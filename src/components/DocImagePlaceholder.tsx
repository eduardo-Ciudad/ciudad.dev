import { Image as ImageIcon } from "lucide-react";

type DocImagePlaceholderProps = {
  label: string;
  aspect?: string;
  className?: string;
};

export function DocImagePlaceholder({
  label,
  aspect = "aspect-video",
  className = "",
}: DocImagePlaceholderProps) {
  return (
    <div
      className={`${aspect} bg-surface border border-card-border rounded-lg flex flex-col items-center justify-center gap-2 ${className}`}
    >
      <ImageIcon size={28} className="text-muted/50" />
      <span className="text-xs text-muted text-center px-6">{label}</span>
    </div>
  );
}
