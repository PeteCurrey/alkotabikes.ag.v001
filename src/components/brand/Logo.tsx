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
  if (variant === "monogram") {
    return (
      <Link
        href="/"
        aria-label="ALKOTA Performance Engineering home"
        className={`inline-block transition-opacity hover:opacity-90 ${className}`}
      >
        <Image
          src={brandAssets.logoMarkLight}
          alt="ALKOTA Monogram"
          width={30}
          height={30}
          className="w-auto h-6 md:h-6.5 object-contain transition-all duration-200 opacity-90 hover:opacity-100 brightness-[0.92] hover:brightness-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
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
        <div className="w-[180px] sm:w-[200px] relative">
          <Image
            src={brandAssets.logoPrimaryLight}
            alt="ALKOTA Performance Engineering"
            width={220}
            height={40}
            className="w-full h-auto object-contain transition-opacity group-hover:opacity-90 brightness-200 contrast-125"
            priority
          />
        </div>
      </Link>
    );
  }

  // Default: Header / Hero / Primary
  return (
    <Link
      href="/"
      aria-label="ALKOTA Performance Engineering home"
      className={`inline-block group ${className}`}
    >
      <div className="w-[145px] sm:w-[160px] md:w-[175px] relative">
        <Image
          src={brandAssets.logoPrimaryLight}
          alt="ALKOTA Performance Engineering"
          width={175}
          height={34}
          className="w-full h-auto object-contain transition-all duration-200 opacity-90 group-hover:opacity-100 brightness-[0.92] group-hover:brightness-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
          priority
        />
      </div>
    </Link>
  );
}
