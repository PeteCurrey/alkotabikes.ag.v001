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
  theme = "auto",
  className = "",
}: LogoProps) {
  // Determine which image path to use based on variant and theme
  if (variant === "monogram") {
    const isLight = theme === "light";
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
          className="w-auto h-7 md:h-8 object-contain"
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

  if (variant === "hero") {
    return (
      <div className={`inline-block ${className}`}>
        <div className="w-[260px] sm:w-[320px] md:w-[420px] relative">
          <Image
            src={theme === "light" ? brandAssets.logoPrimaryLight : brandAssets.logoPrimaryDark}
            alt="ALKOTA Performance Engineering"
            width={420}
            height={80}
            className="w-full h-auto object-contain dark:hidden"
            priority
          />
          <Image
            src={brandAssets.logoPrimaryLight}
            alt="ALKOTA Performance Engineering"
            width={420}
            height={80}
            className="w-full h-auto object-contain hidden dark:block"
            priority
          />
        </div>
      </div>
    );
  }

  // Default: Header / Primary
  const isLightHeader = theme === "light";

  return (
    <Link
      href="/"
      aria-label="ALKOTA Performance Engineering home"
      className={`inline-block group ${className}`}
    >
      <div className="w-[170px] sm:w-[190px] md:w-[210px] relative">
        {/* Render Primary Logo artwork at exact automotive width proportions */}
        <Image
          src={isLightHeader ? brandAssets.logoPrimaryLight : brandAssets.logoPrimaryDark}
          alt="ALKOTA Performance Engineering"
          width={210}
          height={40}
          className="w-full h-auto object-contain transition-opacity group-hover:opacity-90 dark:hidden"
          priority
        />
        <Image
          src={brandAssets.logoPrimaryLight}
          alt="ALKOTA Performance Engineering"
          width={210}
          height={40}
          className="w-full h-auto object-contain transition-opacity group-hover:opacity-90 hidden dark:block"
          priority
        />
      </div>
    </Link>
  );
}
