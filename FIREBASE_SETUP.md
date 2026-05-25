# Firebase Setup — RAMTA Foodtruck

מדריך מלא להפעלת המערכת מול חשבון Google ו-Firebase חדשים.

---

## שלב 1 — יצירת פרויקט Firebase

1. גש ל-https://console.firebase.google.com והתחבר עם חשבון Google של הפוד טראק.
2. לחץ **Add project** → תן שם (לדוגמה `ramta-foodtruck`).
3. **Google Analytics** — אפשר לדלג כדי לקצר.
4. סיים.

## שלב 2 — Web App

1. בעמוד הפרויקט, לחץ על אייקון `</>` (Web).
2. תן שם לאפליקציה (לדוגמה `ramta-web`). אל תסמן Hosting.
3. **Register app** → תקבל אובייקט קונפיג כזה:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "ramta-foodtruck.firebaseapp.com",
  projectId: "ramta-foodtruck",
  storageBucket: "ramta-foodtruck.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef..."
};
```

## שלב 3 — מילוי הקובץ `.env.local`

1. העתק את `.env.local.example` ל-`.env.local`:
   ```powershell
   copy .env.local.example .env.local
   ```
2. מלא את הערכים שקיבלת:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ramta-foodtruck.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ramta-foodtruck
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ramta-foodtruck.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef...

ADMIN_PASSWORD=בחר-סיסמה-חזקה
PAYMENT_PROVIDER=mock
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **הפעל מחדש את שרת הפיתוח** (`npm run dev`) — Next.js לא טוען env vars בלייב.

## שלב 4 — הפעלת Firestore

1. ב-Firebase Console, בתפריט הצד: **Build → Firestore Database**.
2. **Create database** → בחר אזור: `eur3 (europe-west)` או `me-west1 (Tel Aviv)`.
3. בחר **Production mode**.
4. אחרי שה-DB נוצר, עבור ללשונית **Rules** והדבק את התוכן של `firestore.rules` (יש בתיקיית הפרויקט).

## שלב 5 — טעינת תפריט ראשוני

1. כנס לאתר ב-http://localhost:3000/admin/login עם הסיסמה מ-`.env.local`.
2. עבור לטאב **תפריט**.
3. לחץ **טען תפריט הדגמה** — הקבצים יועתקו אוטומטית ל-Firestore.

## שלב 6 — בדיקה מקצה לקצה

1. במצב גלישה רגיל, גש ל-http://localhost:3000/scan.
2. הזן `1` כמספר שולחן → אמור להגיע ל-`/order/manual-1`.
3. הוסף פריט, לחץ "המשך לפרטים", מלא שם וטלפון, ושלם.
4. במסך אדמין (`/admin/orders`) — אמור להופיע בעמודה **התקבל**.
5. לחץ על הכרטיס → עובר ל**בהכנה** → **מוכן**.
6. הלקוח רואה את העדכון בזמן אמת ב-`/order/status/[orderId]`.

---

## חיבור ספק סליקה אמיתי (מאוחר יותר)

1. צור קובץ `src/lib/payments/tranzila.ts` (או `cardcom.ts` / `meshulam.ts`).
2. ממשק את ה-`PaymentProvider` מ-`types.ts`.
3. רשום ב-`src/lib/payments/index.ts`.
4. עדכן `PAYMENT_PROVIDER=tranzila` ב-`.env.local`.

המבנה כבר תומך — אין צורך לגעת ב-CartSidebar או בכל מקום אחר.

## שדרוג Auth של אדמין

ה-MVP משתמש בקובץ env למילת סיסמה. כשעוברים ל-production:

1. הפעל **Firebase Authentication → Google Provider**.
2. הוסף allowlist של מיילי אדמינים ב-collection `admins`.
3. החלף את `src/lib/admin-auth.ts` ואת `src/app/admin/actions.ts` כדי לבדוק `auth.currentUser.email` במקום סיסמה.

---

## מצב הדגמה

אם לא תמלא `.env.local`, האתר עדיין עובד:
- התפריט נטען מ-`src/lib/seed-menu.ts`.
- שליחת הזמנה תציג טוסט הצלחה אבל לא תישמר.
- מסך האדמין מציג הודעת "Firebase לא מחובר".

נוח לפיתוח UI ולהדגמה ללא תלות בענן.
