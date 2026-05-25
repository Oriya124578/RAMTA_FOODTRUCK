"use client";

import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setAdminCookieAction } from "../actions";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setError("Firebase לא מוגדר.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      const res = await setAdminCookieAction(idToken);
      if (!res.success) {
        setError(res.error || "שגיאה בכניסה");
      }
      // If success, setAdminCookieAction will redirect
    } catch (err: any) {
      console.error(err);
      setError("פרטים שגויים או שאין לך הרשאת אדמין.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-ramta-char border border-ramta-border rounded-2xl p-6 space-y-5">
      <label className="block">
        <span className="block text-xs text-ramta-wood uppercase tracking-widest mb-2">אימייל</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          dir="ltr"
          className="w-full px-4 py-3 bg-ramta-ink border border-ramta-border focus:border-ramta-wood text-ramta-text rounded-xl outline-none transition-colors"
        />
      </label>

      <label className="block">
        <span className="block text-xs text-ramta-wood uppercase tracking-widest mb-2">סיסמה</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          dir="ltr"
          className="w-full px-4 py-3 bg-ramta-ink border border-ramta-border focus:border-ramta-wood text-ramta-text rounded-xl outline-none transition-colors"
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-ramta-wood text-ramta-ink font-bold rounded-full hover:bg-ramta-gold transition-colors flex justify-center items-center gap-2"
      >
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        כניסה
      </button>
    </form>
  );
}
