import Image from "next/image";

type DocImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function DocImage({
  src,
  alt,
  width,
  height,
  className = "",
}: DocImageProps) {
  return (
    <div
      className={`relative aspect-video bg-surface border border-card-border rounded-lg overflow-hidden ${className}`}
      style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        sizes="(min-width: 1024px) 720px, calc(100vw - 3rem)"
        className="object-cover"
      />
    </div>
  );
}
