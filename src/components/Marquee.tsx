"use client";

import { Flame } from "lucide-react";

const ITEMS = [
  "בשרים על האש",
  "עישון איטי 12+ שעות",
  "טייקאוויי",
  "קייטרינג ואירועים",
  "נוף פתוח",
  "חוויה ללא פשרות",
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div
      className="relative w-full overflow-hidden border-y border-ramta-border bg-ramta-ink/60 py-4 select-none"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-[200%] gap-12 whitespace-nowrap">
        {loop.map((text, i) => (
          <div key={i} className="flex items-center gap-3 text-ramta-wood/80">
            <Flame className="w-4 h-4 text-ramta-copper" />
            <span className="font-frank-ruhl text-xl md:text-2xl tracking-wide">{text}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ramta-dark to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ramta-dark to-transparent" />
    </div>
  );
}
