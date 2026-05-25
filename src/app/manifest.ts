import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "רמתא — קולינריית בשרים מעושנים",
    short_name: "רמתא",
    description: "הזמינו ארוחות פרימיום מפודטראק רמתא — חוויית קרניבורים ללא פשרות.",
    start_url: "/menu",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0A0807",
    theme_color: "#0A0807",
    lang: "he",
    dir: "rtl",
    categories: ["food", "lifestyle", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
      { src: "/icons/icon-384.png", sizes: "384x384", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icons/icon-1024.png", sizes: "1024x1024", type: "image/png" },
    ],
    shortcuts: [
      {
        name: "תפריט",
        short_name: "תפריט",
        url: "/menu",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "מעקב הזמנה",
        short_name: "סטטוס",
        url: "/menu",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
