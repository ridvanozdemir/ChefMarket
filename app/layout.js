import "./globals.css";

export const metadata = {
  title: "ChefMarket",
  description: "Mutfağını seç, tarifini tamamla, marketten doğru malzemeleri topla.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return <html lang="tr"><body>{children}</body></html>;
}