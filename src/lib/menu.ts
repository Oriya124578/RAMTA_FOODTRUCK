/**
 * Menu data layer.
 * Reads from Firestore when configured; falls back to local seed data.
 */
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { SEED_CATEGORIES, SEED_ITEMS } from "./seed-menu";
import type { MenuCategory, MenuItem } from "./firestore-types";

export async function fetchMenu(): Promise<{
  categories: MenuCategory[];
  items: MenuItem[];
  source: "firestore" | "seed";
}> {
  if (!isFirebaseConfigured || !db) {
    return { categories: SEED_CATEGORIES, items: SEED_ITEMS, source: "seed" };
  }

  try {
    const [catSnap, itemSnap] = await Promise.all([
      getDocs(query(collection(db, "menu_categories"), orderBy("order"))),
      getDocs(collection(db, "menu_items")),
    ]);

    if (catSnap.empty) {
      return { categories: SEED_CATEGORIES, items: SEED_ITEMS, source: "seed" };
    }

    const categories = catSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as MenuCategory);
    const items = itemSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as MenuItem);
    return { categories, items, source: "firestore" };
  } catch (err) {
    console.error("fetchMenu fallback to seed:", err);
    return { categories: SEED_CATEGORIES, items: SEED_ITEMS, source: "seed" };
  }
}

export async function saveMenuItem(item: MenuItem): Promise<void> {
  if (!db) throw new Error("Firestore not configured");
  await setDoc(doc(db, "menu_items", item.id), {
    categoryId: item.categoryId,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image ?? null,
    available: item.available,
    tags: item.tags ?? [],
    allergens: item.allergens ?? [],
  });
}

export async function deleteMenuItem(id: string): Promise<void> {
  if (!db) throw new Error("Firestore not configured");
  await deleteDoc(doc(db, "menu_items", id));
}

export async function saveCategory(category: MenuCategory): Promise<void> {
  if (!db) throw new Error("Firestore not configured");
  await setDoc(doc(db, "menu_categories", category.id), {
    name: category.name,
    order: category.order,
    active: category.active,
  });
}

/**
 * One-time seed: copies the local seed data into Firestore.
 * Safe to re-run; overwrites with current seed content.
 */
export async function seedMenuToFirestore(): Promise<void> {
  if (!db) throw new Error("Firestore not configured");
  const batch = writeBatch(db);
  SEED_CATEGORIES.forEach((c) => {
    batch.set(doc(db!, "menu_categories", c.id), {
      name: c.name,
      order: c.order,
      active: c.active,
    });
  });
  SEED_ITEMS.forEach((i) => {
    batch.set(doc(db!, "menu_items", i.id), {
      categoryId: i.categoryId,
      name: i.name,
      description: i.description,
      price: i.price,
      image: i.image ?? null,
      available: i.available,
      tags: i.tags ?? [],
      allergens: i.allergens ?? [],
    });
  });
  await batch.commit();
}
