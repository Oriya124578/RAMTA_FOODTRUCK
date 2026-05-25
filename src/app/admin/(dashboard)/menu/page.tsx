"use client";

import { useEffect, useState } from "react";
import { fetchMenu, saveMenuItem, deleteMenuItem, seedMenuToFirestore } from "@/lib/menu";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { MenuCategory, MenuItem } from "@/lib/firestore-types";
import { Loader2, Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [seeding, setSeeding] = useState(false);

  const load = async () => {
    setLoading(true);
    const res = await fetchMenu();
    setCategories(res.categories.sort((a, b) => a.order - b.order));
    setItems(res.items);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (item: MenuItem) => {
    try {
      await saveMenuItem(item);
      toast.success("נשמר");
      await load();
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בשמירה — Firebase מחובר?");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("למחוק את הפריט?")) return;
    try {
      await deleteMenuItem(id);
      toast.success("נמחק");
      await load();
    } catch (err) {
      console.error(err);
      toast.error("שגיאה במחיקה");
    }
  };

  const handleSeed = async () => {
    if (!confirm("לטעון את תפריט ההדגמה ל-Firestore? פעולה זו תדרוס פריטים עם אותו ID.")) return;
    setSeeding(true);
    try {
      await seedMenuToFirestore();
      toast.success("התפריט נטען");
      await load();
    } catch (err) {
      console.error(err);
      toast.error("שגיאה בטעינה");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <header className="mb-10 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs text-ramta-wood uppercase tracking-[0.4em] mb-3">ניהול תפריט</p>
          <h1 className="text-4xl font-frank-ruhl font-black text-ramta-text">פריטים</h1>
        </div>
        <div className="flex gap-3">
          {isFirebaseConfigured && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="px-4 py-2 text-sm border border-ramta-border text-ramta-muted hover:text-ramta-text hover:border-ramta-wood rounded-full transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              טען תפריט הדגמה
            </button>
          )}
          <button
            onClick={() =>
              setEditing({
                id: `item-${Date.now()}`,
                categoryId: categories[0]?.id ?? "mains",
                name: "",
                description: "",
                price: 0,
                available: true,
              })
            }
            className="px-5 py-2.5 bg-ramta-wood text-ramta-ink font-bold rounded-full hover:bg-ramta-gold transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            הוסף פריט
          </button>
        </div>
      </header>

      {!isFirebaseConfigured && (
        <div className="mb-8 p-4 rounded-xl border border-amber-700/40 bg-amber-900/10 text-amber-200 text-sm">
          Firebase לא מחובר. הצגה בלבד מתוך seed-menu.ts. חבר Firebase כדי לערוך.
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-ramta-wood" />
        </div>
      )}

      {!loading && categories.map((cat) => {
        const catItems = items.filter((i) => i.categoryId === cat.id);
        return (
          <section key={cat.id} className="mb-12">
            <h2 className="font-frank-ruhl text-2xl font-bold text-ramta-wood mb-4 pb-2 border-b border-ramta-border">
              {cat.name}{" "}
              <span className="text-sm text-ramta-muted/60 font-normal">({catItems.length})</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {catItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-ramta-char border border-ramta-border rounded-xl p-4 flex justify-between items-start gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-ramta-text truncate">{item.name}</h3>
                      {!item.available && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/40 text-red-300 border border-red-800/40 shrink-0">
                          לא זמין
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ramta-muted line-clamp-2">{item.description}</p>
                    <p className="text-sm font-bold text-ramta-gold mt-2 tabular-nums">{item.price} ₪</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      onClick={() => setEditing(item)}
                      className="p-2 text-ramta-muted hover:text-ramta-wood transition-colors"
                      aria-label="ערוך"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-ramta-muted hover:text-red-400 transition-colors"
                      aria-label="מחק"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {editing && (
        <EditModal
          item={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function EditModal({
  item,
  categories,
  onClose,
  onSave,
}: {
  item: MenuItem;
  categories: MenuCategory[];
  onClose: () => void;
  onSave: (item: MenuItem) => void;
}) {
  const [draft, setDraft] = useState<MenuItem>(item);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-ramta-ink/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-ramta-char border border-ramta-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-ramta-border sticky top-0 bg-ramta-char">
          <h3 className="font-frank-ruhl text-xl font-bold">עריכת פריט</h3>
          <button onClick={onClose} className="text-ramta-muted hover:text-ramta-text">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <Field label="שם" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
          <Field
            label="תיאור"
            value={draft.description}
            onChange={(v) => setDraft({ ...draft, description: v })}
            multiline
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="מחיר (₪)"
              value={String(draft.price)}
              onChange={(v) => setDraft({ ...draft, price: Number(v) || 0 })}
              type="number"
            />
            <label className="block">
              <span className="block text-xs text-ramta-wood uppercase tracking-widest mb-2">קטגוריה</span>
              <select
                value={draft.categoryId}
                onChange={(e) => setDraft({ ...draft, categoryId: e.target.value })}
                className="w-full px-4 py-3 bg-ramta-ink border border-ramta-border focus:border-ramta-wood text-ramta-text rounded-xl outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Field
            label="תמונה (URL, אופציונלי)"
            value={draft.image ?? ""}
            onChange={(v) => setDraft({ ...draft, image: v || undefined })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.available}
              onChange={(e) => setDraft({ ...draft, available: e.target.checked })}
              className="accent-ramta-wood"
            />
            זמין להזמנה
          </label>
        </div>
        <div className="p-5 border-t border-ramta-border flex justify-end gap-3 sticky bottom-0 bg-ramta-char">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm text-ramta-muted hover:text-ramta-text"
          >
            ביטול
          </button>
          <button
            onClick={() => onSave(draft)}
            disabled={!draft.name.trim()}
            className="px-6 py-2.5 bg-ramta-wood text-ramta-ink font-bold rounded-full hover:bg-ramta-gold transition-colors disabled:opacity-40"
          >
            שמור
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full px-4 py-3 bg-ramta-ink border border-ramta-border focus:border-ramta-wood text-ramta-text rounded-xl outline-none transition-colors";
  return (
    <label className="block">
      <span className="block text-xs text-ramta-wood uppercase tracking-widest mb-2">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cls}
        />
      )}
    </label>
  );
}
