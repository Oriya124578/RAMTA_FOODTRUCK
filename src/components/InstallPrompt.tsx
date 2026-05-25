/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone } from "lucide-react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "ramta_pwa_dismissed_at";
const DISMISS_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already installed (standalone) — don't show
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari uses navigator.standalone
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return;

    // Respect prior dismissal
    const dismissed = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (dismissed && Date.now() - dismissed < DISMISS_TTL) return;

    // iOS: no beforeinstallprompt — show hint after 8s
    const ua = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    setIsIos(ios);

    if (ios) {
      const t = setTimeout(() => setVisible(true), 8000);
      return () => clearTimeout(t);
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setVisible(false);
    setShowIosHint(false);
  };

  const install = async () => {
    if (isIos) {
      setShowIosHint(true);
      return;
    }
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted") {
      setVisible(false);
    } else {
      dismiss();
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 24, stiffness: 240 }}
          className="fixed bottom-6 inset-x-4 md:inset-x-auto md:right-6 md:max-w-sm z-[80]"
        >
          <div className="bg-ramta-char border border-ramta-wood/40 rounded-2xl p-5 shadow-2xl glow-bronze backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ramta-wood/15 border border-ramta-wood/30 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-ramta-wood" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-frank-ruhl text-lg font-bold text-ramta-text mb-1">
                  התקן את רַמְתָּא
                </h4>
                <p className="text-xs text-ramta-muted leading-relaxed mb-4">
                  גישה מהירה ממסך הבית. עובד גם בלי רשת.
                </p>

                {showIosHint ? (
                  <div className="text-xs text-ramta-text bg-ramta-ink/60 border border-ramta-border rounded-lg p-3 leading-relaxed">
                    1. לחץ על <strong>שתף</strong> (אייקון ריבוע עם חץ)
                    <br />
                    2. בחר <strong>״הוסף למסך הבית״</strong>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={install}
                      className="flex items-center gap-1.5 px-4 py-2 bg-ramta-wood text-ramta-ink font-bold rounded-full hover:bg-ramta-gold transition-colors text-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      התקן
                    </button>
                    <button
                      onClick={dismiss}
                      className="px-4 py-2 text-ramta-muted hover:text-ramta-text text-sm transition-colors"
                    >
                      אחר כך
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={dismiss}
                className="p-1 text-ramta-muted hover:text-ramta-text transition-colors"
                aria-label="סגור"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
