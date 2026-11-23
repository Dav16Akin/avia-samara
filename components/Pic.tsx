import type { CSSProperties } from "react";
import media from "@/lib/media.json";

export type MediaName = keyof typeof media;

/* One of the client's own photographs from the image pipeline (scripts/optimize-images.mjs):
   a WebP srcset in every width the original allows (every current browser reads WebP), the JPEG
   as src for anything older, and the real width and height so the page never jumps while it
   loads. A plain <img>, so the kit's `> img` rules (tiles, frames, the hero) apply to it. */
export default function Pic({
  name,
  alt,
  sizes,
  className,
  priority = false,
  style,
  ...data
}: {
  name: MediaName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
  [k: `data-${string}`]: string | boolean | undefined;
}) {
  const m = media[name];
  return (
    <img
      className={className}
      src={`/media/img/${name}-640.jpg`}
      srcSet={m.widths.map((w) => `/media/img/${name}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      width={m.w}
      height={m.h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={style}
      data-source="client"
      {...data}
    />
  );
}
