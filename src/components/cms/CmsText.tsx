import React from "react";
import { getSlot } from "@/lib/cms/query";

export interface CmsTextProps {
  pageKey: string;
  slotKey: string;
  locale?: string;
  className?: string;
  as?: React.ElementType;
}

export default async function CmsText({
  pageKey,
  slotKey,
  locale = "en-GB",
  className = "",
  as: Component = "span",
}: CmsTextProps) {
  const slot = await getSlot(pageKey, slotKey, locale);
  const text = slot?.valueText;

  if (!text) {
    if (process.env.NODE_ENV === "development") {
      return (
        <Component className={`border border-dashed border-red-400 text-red-400 px-1 font-mono text-xs ${className}`}>
          [CMS TEXT EMPTY: {pageKey}/{slotKey}]
        </Component>
      );
    }
    return null;
  }

  return <Component className={className}>{text}</Component>;
}
