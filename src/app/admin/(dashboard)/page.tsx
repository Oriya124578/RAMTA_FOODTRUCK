import Link from "next/link";
import { ShoppingBag, UtensilsCrossed, QrCode, ExternalLink } from "lucide-react";
import { isFirebaseConfigured } from "@/lib/firebase";

export default function AdminDashboard() {
  return (
    <div>
      <header className="mb-12">
        <p className="text-xs text-ramta-wood uppercase tracking-[0.4em] mb-3">לוח בקרה</p>
        <h1 className="text-5xl font-frank-ruhl font-black text-ramta-text">שלום, צוות רמתא</h1>
      </header>

      {!isFirebaseConfigured && (
        <div className="mb-10 p-6 rounded-2xl border border-amber-700/40 bg-amber-900/10 text-amber-200">
          <h3 className="font-bold mb-2">Firebase לא מחובר עדיין</h3>
          <p className="text-sm leading-relaxed">
            המסכים יוצגו במצב הדגמה. כדי להפעיל הזמנות חיות, פתח את הקובץ{" "}
            <code className="bg-amber-950/40 px-1.5 py-0.5 rounded">FIREBASE_SETUP.md</code>{" "}
            ועקוב אחר ההוראות.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card
          href="/admin/orders"
          icon={ShoppingBag}
          title="הזמנות חיות"
          description="מעקב real-time אחרי הזמנות שמגיעות מהלקוחות. עדכון סטטוס למטבח."
        />
        <Card
          href="/admin/menu"
          icon={UtensilsCrossed}
          title="ניהול תפריט"
          description="הוספה, עריכה וכיבוי פריטים. סנכרון אוטומטי לאתר הלקוח."
        />
        <Card
          href="/admin/qr"
          icon={QrCode}
          title="קוד QR להזמנה"
          description="קוד אחד גדול שמוביל ישירות לתפריט. להדפסה והדבקה על הדלפק."
        />
      </div>

      <div className="mt-12">
        <Card
          href="/"
          icon={ExternalLink}
          title="האתר ללקוחות"
          description="ראה איך האתר נראה לסועדים."
        />
      </div>
    </div>
  );
}

function Card({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block p-6 rounded-2xl border border-ramta-border bg-ramta-char hover:border-ramta-wood/50 hover:bg-ramta-ember transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-ramta-wood/10 border border-ramta-wood/20 flex items-center justify-center text-ramta-wood mb-4 group-hover:bg-ramta-wood group-hover:text-ramta-ink transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-frank-ruhl text-xl font-bold text-ramta-text group-hover:text-ramta-wood transition-colors mb-1">
        {title}
      </h3>
      <p className="text-sm text-ramta-muted leading-relaxed">{description}</p>
    </Link>
  );
}
