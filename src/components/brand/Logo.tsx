"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { brandAssets } from "@/lib/assets";

interface LogoProps {
  variant?: "header" | "footer" | "hero" | "monogram" | "primary";
  theme?: "dark" | "light" | "auto";
  className?: string;
}

export default function Logo({
  variant = "header",
  theme = "light",
  className = "",
}: LogoProps) {
  const isLight = theme === "light" || theme === "auto";

  if (variant === "monogram") {
    const logoSrc = isLight ? brandAssets.logoMarkLight : brandAssets.logoMarkDark;
    
    return (
      <Link
        href="/"
        aria-label="ALKOTA Performance Engineering home"
        className={`inline-block transition-opacity hover:opacity-90 ${className}`}
      >
        <Image
          src={logoSrc}
          alt="ALKOTA Monogram"
          width={34}
          height={34}
          className="w-auto h-7 md:h-8 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          priority
        />
      </Link>
    );
  }

  if (variant === "footer") {
    return (
      <Link
        href="/"
        aria-label="ALKOTA Performance Engineering home"
        className={`inline-block group ${className}`}
      >
        <div className="w-[200px] sm:w-[220px] md:w-[240px] relative">
          <Image
            src={brandAssets.logoPrimaryLight}
            alt="ALKOTA Performance Engineering"
            width={260}
            height={48}
            className="w-full h-auto object-contain transition-opacity group-hover:opacity-90"
            priority
          />
        </div>
      </Link>
    );
  }

  // Default: Header / Hero / Primary
  const logoSrc = isLight ? brandAssets.logoPrimaryLight : brandAssets.logoPrimaryDark;

  return (
    <Link
      href="/"
      aria-label="ALKOTA Performance Engineering home"
      className={`inline-block group ${className}`}
    >
      <div className="w-[175px] sm:w-[195px] md:w-[215px] relative">
        <Image
          src={logoSrc}
          alt="ALKOTA Performance Engineering"
          width={215}
          height={41}
          className="w-full h-auto object-contain transition-opacity group-hover:opacity-90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
          priority
        />
      </div>
    </Link>
  );
}
