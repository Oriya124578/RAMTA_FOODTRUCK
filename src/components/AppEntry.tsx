"use client";

/**
 * "calori-style" entry — gives the visitor three explicit ways to use the
 * service: open as web, install as PWA, or (placeholder) download from stores.
 * Embedded at the very top of the homepage Hero.
 */
import { motion } from "framer-motion";
import Link from "next/link";
import { Smartphone, Apple, Play, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function AppEntry() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
        {/* Primary — Open Web App */}
        <Link href="/menu" className="flex-1 focus-visible:outline-none">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-full min-h-[60px] px-6 py-4 bg-ramta-wood text-ramta-ink font-bold rounded-2xl transition-colors hover:bg-ramta-gold flex items-center justify-between gap-3 glow-bronze"
          >
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
            <div className="text-right">
              <div className="text-[11px] opacity-70 font-medium">פתח באתר</div>
              <div className="font-frank-ruhl text-lg leading-tight">הזמן עכשיו</div>
            </div>
          </motion.div>
        </Link>

        {/* Install PWA */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.dispatchEvent(new CustomEvent("ramta:request-install"));
          }}
          className="flex-1 min-h-[60px] px-6 py-4 bg-ramta-char border border-ramta-wood/40 text-ramta-wood rounded-2xl transition-colors hover:border-ramta-gold hover:text-ramta-gold flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ramta-gold"
        >
          <Smartphone className="w-5 h-5" aria-hidden="true" />
          <div className="text-right">
            <div className="text-[11px] opacity-70 font-medium">PWA</div>
            <div className="font-frank-ruhl text-lg leading-tight">התקן כאפליקציה</div>
          </div>
        </button>
      </div>

      {/* Store badges — coming soon */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center items-center">
        <StoreBadge icon={Apple} label="App Store" hint="בקרוב" />
        <StoreBadge icon={Play} label="Google Play" hint="בקרוב" />
      </div>
    </motion.div>
  );
}

function StoreBadge({
  icon: Icon,
  label,
  hint,
}: {
  icon: React.ElementType;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => toast("האפליקציה הנטיבית בפיתוח — בינתיים אפשר להתקין את אפליקציית הווב 📱")}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-ramta-border bg-ramta-ink/60 text-ramta-muted hover:text-ramta-text hover:border-ramta-wood/40 transition-colors text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ramta-wood/50"
      title={hint}
    >
      <Icon className="w-4 h-4" aria-hidden="true" />
      <div className="text-right leading-tight">
        <div className="text-[10px] opacity-70">זמין ב-</div>
        <div className="font-bold">{label}</div>
      </div>
      {hint && (
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-ramta-wood/15 text-ramta-wood border border-ramta-wood/30 mr-1">
          {hint}
        </span>
      )}
    </button>
  );
}
