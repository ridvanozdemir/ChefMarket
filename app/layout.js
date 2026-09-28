import "./globals.css";

export const metadata = {
  title: "Who Is the Chef?",
  description: "Doğru malzemeleri bul, alışverişi tamamla ve aşçılık bilgini test et.",
  manifest: "/manifest.json",
  icons: {
    icon: "/app-icon.svg",
    apple: "/app-icon.svg",
  },
  themeColor: "#ff8a3d",
};

export default function RootLayout({ children }) {
  return <html lang="tr"><body>{children}</body></html>;
}