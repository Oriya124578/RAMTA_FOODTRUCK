import type { Metadata, Viewport } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import SplashScreen from "@/components/SplashScreen";
import GrainOverlay from "@/components/GrainOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import CursorFollower from "@/components/CursorFollower";
import PwaRegister from "@/components/PwaRegister";
import InstallPrompt from "@/components/InstallPrompt";
import { Toaster } from "react-hot-toast";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "רמתא — קולינריית בשרים מעושנים",
    template: "%s | רמתא",
  },
  description: "קולינריית בשרים מעושנים — חוויית קרניבורים ללא פשרות מול הנוף.",
  keywords: ["בשרים", "פודטראק", "אנטריקוט", "קרניבורים", "אוכל בחוץ"],
  authors: [{ name: "Ramta Foodtruck" }],
  creator: "Ramta",
  publisher: "Ramta",
  applicationName: "רמתא",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "רמתא",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "רמתא — קולינריית בשרים מעושנים",
    description: "בואו לחוות בשרים מעושנים ואיכותיים מול הנוף הפתוח.",
    url: "/",
    siteName: "Ramta Foodtruck",
    locale: "he_IL",
    images: ["/icons/icon-512.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0807",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frankRuhl.variable} h-full antialiased font-heebo`}
    >
      <body className="min-h-full flex flex-col bg-ramta-ink text-ramta-text font-heebo selection:bg-ramta-wood selection:text-ramta-ink">
        <SplashScreen />
        <ScrollProgress />
        <GrainOverlay />
        <CursorFollower />
        <PwaRegister />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#14100D",
              color: "#F5EBDC",
              border: "1px solid #2A211B",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#B07A4A", secondary: "#0A0807" },
            },
          }}
        />
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
        <InstallPrompt />
      </body>
    </html>
  );
}
