"use client";

import SectionReveal from "./SectionReveal";
import Link from "next/link";
import { Apple, Play, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-ramta-ink pt-20 pb-10 border-t border-ramta-border overflow-hidden">
      {/* Top hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ramta-wood/50 to-transparent" />

      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-40 w-[700px] h-[400px] rounded-full bg-ramta-bronze/[0.06] blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <SectionReveal className="md:col-span-2">
            <h2 className="text-5xl md:text-6xl font-bold text-ramta-wood mb-6 tracking-wider font-frank-ruhl">
              רַמְתָּא
            </h2>
            <p className="text-ramta-muted max-w-sm leading-relaxed">
              חוויה קולינרית מול הנוף. בשר פרימיום, חומרי גלם טריים, ועישון מסורתי. תבואו רעבים, השאר עלינו.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h4 className="font-bold text-ramta-text mb-5 tracking-wide uppercase text-xs">ניווט מהיר</h4>
            <ul className="space-y-3 text-ramta-muted">
              <li><Link href="/menu" className="hover:text-ramta-wood transition-colors underline-grow">תפריט והזמנות</Link></li>
              <li><Link href="/#story" className="hover:text-ramta-wood transition-colors underline-grow">הסיפור שלנו</Link></li>
              <li><Link href="/#location" className="hover:text-ramta-wood transition-colors underline-grow">איך מגיעים?</Link></li>
              <li><Link href="/events" className="hover:text-ramta-wood transition-colors underline-grow">אירועים וקייטרינג</Link></li>
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <h4 className="font-bold text-ramta-text mb-5 tracking-wide uppercase text-xs">יצירת קשר</h4>
            <ul className="space-y-3 text-ramta-muted">
              <li className="tabular-nums">050-1234567</li>
              <li>hello@ramta-foodtruck.co.il</li>
              <li className="pt-4 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-ramta-char border border-ramta-border flex items-center justify-center hover:border-ramta-wood hover:bg-ramta-wood/10 text-ramta-text hover:text-ramta-wood transition-all duration-300 hover:-translate-y-0.5"
                >
                  IG
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-ramta-char border border-ramta-border flex items-center justify-center hover:border-ramta-wood hover:bg-ramta-wood/10 text-ramta-text hover:text-ramta-wood transition-all duration-300 hover:-translate-y-0.5"
                >
                  FB
                </a>
              </li>
            </ul>
          </SectionReveal>
        </div>

        {/* App availability */}
        <SectionReveal className="pt-8 mt-4 border-t border-ramta-border/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <span className="text-xs text-ramta-muted uppercase tracking-[0.3em]">זמין ב</span>
            <div className="flex flex-wrap gap-3 justify-center items-center">
              <a
                href="/menu"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ramta-wood/40 bg-ramta-char hover:border-ramta-gold transition-colors text-ramta-wood hover:text-ramta-gold text-xs"
              >
                <Smartphone className="w-4 h-4" />
                <div className="text-right leading-tight">
                  <div className="text-[9px] opacity-70">פתח</div>
                  <div className="font-bold">אפליקציית ווב</div>
                </div>
              </a>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ramta-border bg-ramta-ink/60 text-ramta-muted/70 text-xs cursor-not-allowed"
                title="בקרוב"
              >
                <Apple className="w-4 h-4" />
                <div className="text-right leading-tight">
                  <div className="text-[9px] opacity-70">זמין ב</div>
                  <div className="font-bold">App Store</div>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-ramta-wood/15 text-ramta-wood border border-ramta-wood/30 mr-1">בקרוב</span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ramta-border bg-ramta-ink/60 text-ramta-muted/70 text-xs cursor-not-allowed"
                title="בקרוב"
              >
                <Play className="w-4 h-4" />
                <div className="text-right leading-tight">
                  <div className="text-[9px] opacity-70">זמין ב</div>
                  <div className="font-bold">Google Play</div>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-ramta-wood/15 text-ramta-wood border border-ramta-wood/30 mr-1">בקרוב</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="pt-6 border-t border-ramta-border/50 text-center text-sm text-ramta-muted/60 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="tabular-nums">© {new Date().getFullYear()} RAMTA FOODTRUCK. כל הזכויות שמורות.</p>
          <p>עוצב ופותח לחוויית פרימיום. <span className="font-mono text-ramta-wood/60 ml-2">V1.0.0</span></p>
        </div>
      </div>
    </footer>
  );
}
