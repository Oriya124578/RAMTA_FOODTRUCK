import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_COOKIE } from "@/lib/admin-auth";
import { logoutAction } from "../actions";
import { ShoppingBag, UtensilsCrossed, QrCode, LayoutDashboard, LogOut } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const isAuthed = jar.get(ADMIN_COOKIE)?.value === "1";
  if (!isAuthed) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ramta-ink text-ramta-text font-heebo flex">
      <aside className="w-64 bg-ramta-char border-l border-ramta-border flex flex-col p-6 min-h-screen sticky top-0 shrink-0">
        <Link href="/admin" className="block mb-12">
          <span className="block text-xs text-ramta-wood uppercase tracking-[0.4em] mb-1">ADMIN</span>
          <span className="font-frank-ruhl text-4xl text-ramta-wood font-bold tracking-wider">רַמְתָּא</span>
        </Link>

        <nav className="flex-1 space-y-1">
          <NavItem href="/admin" icon={LayoutDashboard} label="לוח בקרה" />
          <NavItem href="/admin/orders" icon={ShoppingBag} label="הזמנות חיות" />
          <NavItem href="/admin/menu" icon={UtensilsCrossed} label="תפריט" />
          <NavItem href="/admin/qr" icon={QrCode} label="קודי QR" />
        </nav>

        <Link
          href="/"
          className="block text-xs text-ramta-muted hover:text-ramta-wood mb-3 transition-colors"
        >
          ← חזרה לאתר
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ramta-muted hover:text-ramta-text hover:bg-ramta-ink rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            התנתק
          </button>
        </form>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-x-auto">{children}</main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-sm text-ramta-text/80 hover:text-ramta-wood hover:bg-ramta-ink rounded-xl transition-colors"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
