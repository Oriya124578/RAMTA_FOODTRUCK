"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-ramta-darker pt-16 pb-8 border-t border-ramta-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <h2 className="text-4xl md:text-5xl font-bold text-ramta-wood mb-4 tracking-tight font-frank-ruhl">רַמְתָּא</h2>
            <p className="text-ramta-muted max-w-sm">
              חוויה קולינרית ניידת. בשר פרימיום, חומרי גלם טריים, ועישון מסורתי. תבואו רעבים, השאר עלינו.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-ramta-text mb-4">ניווט מהיר</h4>
            <ul className="space-y-2 text-ramta-muted">
              <li><a href="/menu" className="hover:text-ramta-wood transition-colors">תפריט והזמנות</a></li>
              <li><a href="/#story" className="hover:text-ramta-wood transition-colors">הסיפור שלנו</a></li>
              <li><a href="/#location" className="hover:text-ramta-wood transition-colors">איך מגיעים?</a></li>
              <li><a href="/events" className="hover:text-ramta-wood transition-colors">אירועים וקייטרינג</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-ramta-text mb-4">יצירת קשר</h4>
            <ul className="space-y-2 text-ramta-muted">
              <li>050-1234567</li>
              <li>hello@ramta-foodtruck.co.il</li>
              <li className="pt-4 flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-ramta-dark border border-ramta-border flex items-center justify-center hover:border-ramta-wood text-ramta-text hover:text-ramta-wood transition-colors">
                  IG
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-ramta-dark border border-ramta-border flex items-center justify-center hover:border-ramta-wood text-ramta-text hover:text-ramta-wood transition-colors">
                  FB
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-ramta-border/50 text-center text-sm text-ramta-muted/50 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} RAMTA FOODTRUCK. כל הזכויות שמורות.</p>
          <p className="mt-2 md:mt-0">עוצב ופותח לחוויית פרימיום.</p>
        </div>
      </div>
    </footer>
  );
}
