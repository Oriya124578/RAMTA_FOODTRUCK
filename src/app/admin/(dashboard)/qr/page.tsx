"use client";

import { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Printer, Download } from "lucide-react";

export default function AdminQrPage() {
  const [siteUrl, setSiteUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    setSiteUrl(url);
  }, []);

  const orderUrl = `${siteUrl}/menu`;

  useEffect(() => {
    if (!canvasRef.current || !siteUrl) return;
    QRCode.toCanvas(canvasRef.current, orderUrl, {
      width: 520,
      margin: 2,
      color: { dark: "#0A0807", light: "#F5EBDC" },
      errorCorrectionLevel: "H",
    }).catch(console.error);
  }, [orderUrl, siteUrl]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "ramta-qr.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const printQr = () => window.print();

  return (
    <div>
      <header className="mb-10 flex items-start justify-between gap-4 flex-wrap print:hidden">
        <div>
          <p className="text-xs text-ramta-wood uppercase tracking-[0.4em] mb-3">קוד QR</p>
          <h1 className="text-4xl font-frank-ruhl font-black text-ramta-text">
            קוד QR להזמנה
          </h1>
          <p className="text-ramta-muted mt-2 text-sm max-w-xl">
            הדפיסו את ה-QR בגודל גדול והניחו על הדלפק / שילוט. הלקוח סורק → מגיע ישירות לתפריט.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadPng}
            className="px-5 py-2.5 border border-ramta-wood text-ramta-wood rounded-full hover:bg-ramta-wood hover:text-ramta-ink transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> הורד PNG
          </button>
          <button
            onClick={printQr}
            className="px-5 py-2.5 bg-ramta-wood text-ramta-ink font-bold rounded-full hover:bg-ramta-gold transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> הדפס
          </button>
        </div>
      </header>

      <div className="print-card bg-ramta-char border border-ramta-border rounded-3xl p-8 md:p-12 flex flex-col items-center gap-6 max-w-2xl mx-auto">
        {/* Decorative header for print */}
        <div className="text-center">
          <div className="text-xs text-ramta-wood uppercase tracking-[0.5em] mb-2 print:tracking-[0.4em]">
            הזמנה בסריקה
          </div>
          <h2 className="font-frank-ruhl text-5xl md:text-7xl font-black text-ramta-wood tracking-wider">
            רַמְתָּא
          </h2>
        </div>

        <div className="bg-ramta-text rounded-2xl p-4 print:p-3">
          <canvas ref={canvasRef} />
        </div>

        <div className="text-center">
          <p className="font-frank-ruhl text-2xl text-ramta-text font-bold mb-1">סרוק והזמן</p>
          <p className="text-sm text-ramta-muted mb-3">איסוף עצמי מהדלפק</p>
          <p className="text-[10px] text-ramta-muted/60 break-all max-w-[90%] mx-auto">
            {orderUrl}
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          aside, nav, header.print\\:hidden { display: none !important; }
          main { padding: 0 !important; }
          .print-card {
            border: 3px solid black !important;
            background: white !important;
            color: black !important;
            max-width: 100% !important;
            box-shadow: none !important;
            page-break-inside: avoid;
          }
          .print-card * { color: black !important; }
          .print-card .gold-shimmer { color: black !important; -webkit-text-fill-color: black !important; }
        }
      `}</style>
    </div>
  );
}
