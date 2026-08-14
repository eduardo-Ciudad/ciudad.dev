import Image from "next/image";

type DocImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function DocImage({ src, alt, className = "" }: DocImageProps) {
  return (
    <div
      className={`relative aspect-video bg-surface border border-card-border rounded-lg overflow-hidden ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
