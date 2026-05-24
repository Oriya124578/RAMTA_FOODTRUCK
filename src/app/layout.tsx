import type { Metadata } from "next";
import { Heebo, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import SplashScreen from "@/components/SplashScreen";
import { Toaster } from "react-hot-toast";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-frank-ruhl",
  subsets: ["hebrew", "latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "RAMTA - חוויה קולינרית",
  description: "קולינריית בשרים ניידת - חווית קרניבורים ללא פשרות",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${frankRuhl.variable} h-full antialiased font-heebo`}>
      <body className="min-h-full flex flex-col bg-ramta-dark text-ramta-text font-heebo selection:bg-ramta-wood selection:text-ramta-darker">
        <SplashScreen />
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#F4EEDB',
              border: '1px solid #333',
            },
            success: {
              iconTheme: {
                primary: '#C19A6B',
                secondary: '#1a1a1a',
              },
            },
          }}
        />
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
