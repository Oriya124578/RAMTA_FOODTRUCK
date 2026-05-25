/**
 * Firebase client SDK initialization.
 * When env vars are not configured, exports `null` for db/auth so the app
 * can fall back to local seed data and not crash in development.
 */
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { initializeFirestore, getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  config.apiKey && config.projectId && config.appId
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  const existing = getApps()[0];
  app = existing ?? initializeApp(config);
  // ignoreUndefinedProperties: critical — otherwise addDoc({ notes: undefined })
  // throws and breaks the order flow when a field is optionally empty.
  // initializeFirestore must be called BEFORE getFirestore on the same app.
  if (!existing) {
    db = initializeFirestore(app, { ignoreUndefinedProperties: true });
  } else {
    db = getFirestore(app);
  }
  auth = getAuth(app);
}

export { app, db, auth };
