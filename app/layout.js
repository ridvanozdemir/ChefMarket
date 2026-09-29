import "./globals.css";

export const metadata = {
  title: "Who Is the Chef?",
  description: "Dünya mutfaklarını keşfet, doğru malzemeleri seç ve aşçılık bilgini test et.",
  manifest: "/manifest.json",
  icons: {
    icon: "/app-icon.svg",
    apple: "/app-icon.svg",
  },
  themeColor: "#ff6f20",
};

export default function RootLayout({ children }) {
  return <html lang="tr"><body>{children}</body></html>;
}