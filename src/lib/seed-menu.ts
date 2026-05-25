import type { MenuCategory, MenuItem } from "./firestore-types";

export const SEED_CATEGORIES: MenuCategory[] = [
  { id: "business",   name: "ארוחות עסקיות", order: 1, active: true },
  { id: "mains",      name: "ארוחות (עיקריות)", order: 2, active: true },
  { id: "sandwiches", name: "כריכים ומיוחדים", order: 3, active: true },
  { id: "sides",      name: "תוספות",       order: 4, active: true },
  { id: "drinks",     name: "שתייה קלה",    order: 5, active: true },
  { id: "beers",      name: "בירות מהחבית", order: 6, active: true },
  { id: "desserts",   name: "קינוחים",      order: 7, active: true },
];

export const SEED_ITEMS: MenuItem[] = [
  // ארוחות עסקיות
  {
    id: "business-burger",
    categoryId: "business",
    name: "עסקית המבורגר פרימיום",
    description: "המבורגר קלאסי (220 גרם) מבשר בקר מובחר, מוגש עם צ׳יפס כמהין לבחירה ושתייה קלה או בירה קטנה.",
    price: 95,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800",
    available: true,
    tags: ["premium"],
  },
  {
    id: "business-brisket",
    categoryId: "business",
    name: "עסקית בריסקט מעושן",
    description: "כריך בריסקט בעישון עמוק, מוגש עם טבעות בצל בטמפורה, סלט קולסלאו אישי ושתייה קלה.",
    price: 110,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800",
    available: true,
    tags: ["signature", "premium"],
  },

  // עיקריות
  {
    id: "entrecote-plate",
    categoryId: "mains",
    name: "נתח אנטריקוט משויש",
    description: "300 גרם אנטריקוט מיושן 21 יום, צרוב על פלנצ׳ה לוהטת. מוגש עם תפוחי אדמה אפויים ורוטב צ׳ימיצ׳ורי ארגנטינאי.",
    price: 139,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=800",
    available: true,
    tags: ["premium", "gluten-free"],
  },
  {
    id: "ribs-platter",
    categoryId: "mains",
    name: "צלעות בקר בעישון חביות אלון",
    description: "שדרת צלעות בעישון מסורתי של 14 שעות, בזיגוג רוטב בורבון ומייפל טבעי.",
    price: 165,
    image: "https://images.unsplash.com/photo-1544025162-811114b0b0e4?q=80&w=800",
    available: true,
    tags: ["signature", "premium"],
  },

  // כריכים
  {
    id: "burger-classic",
    categoryId: "sandwiches",
    name: "המבורגר רמתא קלאסי",
    description: "קציצת בקר מובחרת 220 גרם (תערובת סודית), איולי כמהין, עלי רוקט טריים, קורנישונים ובצל מקורמל.",
    price: 72,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
    available: true,
    tags: ["signature"],
  },
  {
    id: "brisket-sandwich",
    categoryId: "sandwiches",
    name: "כריך בריסקט מפורק",
    description: "בריסקט בעישון עמוק (12 שעות) בעצי פקאן, מוגש בלחמניית בריוש רכה, ברביקיו ביתי וסלאו תפוחים קריספי.",
    price: 85,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800",
    available: true,
    tags: ["signature"],
  },

  // תוספות
  {
    id: "truffle-fries",
    categoryId: "sides",
    name: "צ׳יפס כמהין ופרמז׳ן טבעוני",
    description: "תפוחי אדמה פריכים במיוחד, שמן כמהין איטלקי, מלח ים אטלנטי, ושום קונפי.",
    price: 35,
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=800",
    available: true,
    tags: ["vegan"],
  },
  {
    id: "onion-rings",
    categoryId: "sides",
    name: "טבעות בצל בטמפורה ובירה",
    description: "טבעות בצל טריות בבלילת בירה פריכה. מוגש עם מטבל איולי שום צלוי עשיר.",
    price: 32,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=800",
    available: true,
    tags: ["vegan"],
  },

  // בירות
  {
    id: "beer-ipa",
    categoryId: "beers",
    name: "בירת קראפט IPA (מהחבית)",
    description: "בירה מקומית קריספית ומרירה, 5.5% אלכוהול, מלאה בארומות הדריות.",
    price: 32,
    image: "https://images.unsplash.com/photo-1538505676343-3bc34927230b?q=80&w=800",
    available: true,
  },
  {
    id: "beer-stout",
    categoryId: "beers",
    name: "סטאוט שוקולד-קפה (מהחבית)",
    description: "בירה כהה ועשירה בטעמי קלייה, קפה ושוקולד מריר. 6% אלכוהול.",
    price: 34,
    image: "https://images.unsplash.com/photo-1606822291586-455b57d07920?q=80&w=800",
    available: true,
  },

  // שתייה קלה
  {
    id: "lemonade-fresh",
    categoryId: "drinks",
    name: "לימונענע גרוסה",
    description: "לימונים טריים שנסחטו הבוקר, עלי נענע רעננים וקרח כתוש.",
    price: 18,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800",
    available: true,
    tags: ["vegan"],
  },
  {
    id: "soda-crafted",
    categoryId: "drinks",
    name: "סודה לימון ורוזמרין",
    description: "סודה צוננת עם טוויסט של לימון טרי וענף רוזמרין ריחני.",
    price: 15,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800",
    available: true,
    tags: ["vegan"],
  },

  // קינוחים
  {
    id: "dessert-brownie",
    categoryId: "desserts",
    name: "בראוניז שוקולד וקרמל מלוח",
    description: "בראוניז נימוח וחם מבפנים, מוגש עם רוטב קרמל מלוח.",
    price: 42,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800",
    available: true,
  }
];
