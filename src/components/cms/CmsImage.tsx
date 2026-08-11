import React from "react";
import Image from "next/image";
import { getSlot } from "@/lib/cms/query";

export interface CmsImageProps {
  pageKey: string;
  slotKey: string;
  sizes: string; // Required prop — no default, prevents mis-sized image downloads
  locale?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

export default async function CmsImage({
  pageKey,
  slotKey,
  sizes,
  locale = "en-GB",
  className = "",
  priority = false,
  fill = true,
  width,
  height,
  style = {},
}: CmsImageProps) {
  const slot = await getSlot(pageKey, slotKey, locale);
  const media = slot?.media;

  if (!media || !media.signedUrl) {
    if (process.env.NODE_ENV === "development") {
      return (
        <div
          className={`border-2 border-dashed border-red-500 bg-red-950/20 p-4 font-mono text-[10px] text-red-400 flex items-center justify-center text-center ${className}`}
          style={{ minHeight: fill ? "100%" : "120px", ...style }}
        >
          <span>[CMS SLOT EMPTY: {pageKey}/{slotKey}]</span>
        </div>
      );
    }
    return null;
  }

  const alt = media.isDecorative ? "" : media.altText || "";
  const objectPosition = `${media.focalX * 100}% ${media.focalY * 100}%`;
  const mergedStyle: React.CSSProperties = {
    objectPosition,
    ...style,
  };

  if (fill) {
    return (
      <Image
        src={media.signedUrl}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={media.blurDataUrl ? "blur" : undefined}
        blurDataURL={media.blurDataUrl || undefined}
        className={className}
        style={mergedStyle}
      />
    );
  }

  return (
    <Image
      src={media.signedUrl}
      alt={alt}
      width={width || media.width || 800}
      height={height || media.height || 600}
      priority={priority}
      sizes={sizes}
      placeholder={media.blurDataUrl ? "blur" : undefined}
      blurDataURL={media.blurDataUrl || undefined}
      className={className}
      style={mergedStyle}
    />
  );
}
