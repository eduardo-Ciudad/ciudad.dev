"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

type DocImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackLabel?: string;
};

export function DocImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackLabel,
}: DocImageProps) {
  const [hasError, setHasError] = useState(false);
  const [naturalRatio, setNaturalRatio] = useState<number>();
  const aspectRatio = width && height ? width / height : naturalRatio;

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-card-border bg-primary/[0.04] text-muted ${className}`}
      >
        <ImageIcon size={28} className="opacity-40" aria-hidden="true" />
        <span className="px-6 text-center text-xs">
          {fallbackLabel ?? "Imagem do case em breve"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-card-border bg-surface ${
        aspectRatio ? "" : "aspect-video"
      } ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={90}
        sizes="(min-width: 1024px) 720px, calc(100vw - 3rem)"
        className="object-cover"
        onLoad={(event) => {
          if (!width || !height) {
            setNaturalRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight);
          }
        }}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
