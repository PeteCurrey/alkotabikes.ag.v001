import React from "react";

const NOTES: Record<string, { text: string; date?: string; phase?: string }> = {
  "01": {
    text: "I started working in a bike shop at fifteen. I wasn't thinking about kinematics or carbon layups. I was learning something more useful: riders notice when a bike works — and they notice very quickly when it doesn't.",
    phase: "ORIGIN",
  },
  "02": {
    text: "The idea for Alkota was never to put another logo on a bicycle. I wanted to take everything I'd learned around bikes and businesses and start again with one machine.",
    phase: "FOUNDING",
  },
  "03": {
    text: "When something changes on Project 01, I want us to explain what changed and why. The development is part of the product.",
    phase: "ENGINEERING DEVELOPMENT",
    date: "2026",
  },
  "04": {
    text: "We are not trying to pretend the bike is finished. The interesting bit is that it isn't. People can come along while we make it better.",
    phase: "ENGINEERING DEVELOPMENT",
    date: "2026",
  },
};

interface FounderNoteProps {
  note: keyof typeof NOTES;
  className?: string;
}

export default function FounderNote({ note, className = "" }: FounderNoteProps) {
  const data = NOTES[note];
  if (!data) return null;

  return (
    <aside className={`relative border-l-2 border-alkota-signal/50 pl-6 py-1 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-alkota-signal font-bold">
          PETE / FOUNDER
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate">
          NOTE {note}
        </span>
        {data.phase && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-alkota-slate/60">
            · {data.phase}
          </span>
        )}
        {data.date && (
          <span className="font-mono text-[9px] text-alkota-slate/50">
            {data.date}
          </span>
        )}
      </div>

      <blockquote className="font-sans text-base sm:text-lg text-alkota-snow leading-relaxed font-light italic max-w-2xl">
        &ldquo;{data.text}&rdquo;
      </blockquote>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-alkota-slate">
        — Pete
      </p>
    </aside>
  );
}