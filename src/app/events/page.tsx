"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import MagneticButton from "@/components/MagneticButton";
import { Phone, Calendar, Users, ChefHat } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const PERKS = [
  { icon: ChefHat,   title: "שף ייעודי",        text: "צוות מקצועי לאירוע שלך — מאחורי הקלעים שלא תרגיש אותו." },
  { icon: Users,     title: "10 עד 500 איש",   text: "מתאים גם לאירוע אינטימי וגם לחתונה גדולה." },
  { icon: Calendar,  title: "תיאום מלא",        text: "אנחנו דואגים להכל — נתחי בשר, רטבים, תוספות והגשה." },
];

export default function EventsPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("פנייתך נשלחה. נחזור אליך בהקדם.");
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main className="min-h-screen bg-ramta-ink text-ramta-text font-heebo">
      <Navbar />

      <div className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <span className="block text-xs md:text-sm font-bold text-ramta-wood uppercase tracking-[0.4em] mb-4">
            אירועים וקייטרינג
          </span>
          <h1 className="text-5xl md:text-7xl font-frank-ruhl font-black text-ramta-text mb-6 leading-[1.05]">
            הביאו את <span className="gold-shimmer">רמתא</span><br />לאירוע שלכם
          </h1>
          <p className="text-ramta-muted text-lg max-w-2xl mx-auto leading-relaxed">
            אירוע חברה מול הנוף? חגיגה פרטית? אנחנו נדאג לבשר המושלם, ההגשה והחוויה.
          </p>
        </SectionReveal>

        {/* Perks */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {PERKS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl bg-ramta-char border border-ramta-border hover:border-ramta-wood/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-ramta-wood/10 border border-ramta-wood/30 flex items-center justify-center text-ramta-wood mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-frank-ruhl text-xl font-bold text-ramta-text mb-2">{p.title}</h3>
                <p className="text-sm text-ramta-muted leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <SectionReveal className="lg:col-span-3 bg-ramta-char p-6 md:p-8 rounded-2xl border border-ramta-border">
            <h3 className="font-frank-ruhl text-2xl font-bold mb-6 text-ramta-text">ספרו על האירוע</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Field label="שם מלא" name="name" required placeholder="הישראלי הראשון" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="טלפון" name="phone" required type="tel" inputMode="tel" placeholder="050-0000000" />
                <Field label="תאריך האירוע" name="date" type="date" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="כמות סועדים" name="guests" type="number" inputMode="numeric" placeholder="לדוגמה: 80" />
                <Field label="סוג האירוע" name="kind" placeholder="חתונה / חברה / יום הולדת" />
              </div>
              <Field label="הערות" name="notes" multiline placeholder="נתחים מועדפים, אילוצי תזונה וכל פרט שחשוב לכם." />

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-ramta-wood text-ramta-ink font-bold rounded-full hover:bg-ramta-gold transition-colors glow-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ramta-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ramta-ink disabled:opacity-50"
              >
                {submitting ? "שולח…" : "שלח פנייה"}
              </button>
            </form>
          </SectionReveal>

          {/* Contact info */}
          <SectionReveal delay={0.15} className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-ramta-char border border-ramta-border">
              <h4 className="font-frank-ruhl text-xl font-bold text-ramta-wood mb-4">ישיר עכשיו</h4>
              <a href="tel:050-1234567" className="flex items-center gap-3 text-ramta-text hover:text-ramta-wood transition-colors mb-3">
                <Phone className="w-4 h-4 text-ramta-wood" />
                <span className="tabular-nums">050-1234567</span>
              </a>
              <p className="text-xs text-ramta-muted leading-relaxed mt-4">
                נחזור תוך 24 שעות בימי עבודה. בדרך כלל מהר יותר.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-ramta-wood/30 bg-gradient-to-br from-ramta-wood/5 to-transparent">
              <p className="font-frank-ruhl text-lg text-ramta-text leading-relaxed mb-3">
                ״הם הביאו את המסעדה אלינו. האורחים עוד מדברים על הבריסקט.״
              </p>
              <p className="text-xs text-ramta-muted">— נועם, חתן ׳25</p>
            </div>
          </SectionReveal>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
  inputMode,
  multiline = false,
}: {
  label: string;
  name: string;
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "tel" | "numeric" | "email";
  multiline?: boolean;
}) {
  const cls =
    "w-full px-4 py-3 bg-ramta-ink border border-ramta-border focus:border-ramta-wood text-ramta-text placeholder:text-ramta-muted/40 rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ramta-wood/30";
  return (
    <label className="block">
      <span className="block text-xs text-ramta-wood uppercase tracking-widest mb-2">
        {label}
        {required && <span className="text-red-400 mr-1">*</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          defaultValue={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          name={name}
          required={required}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          className={cls}
        />
      )}
    </label>
  );
}
