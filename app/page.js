"use client";

import { useState } from "react";

const cuisines = [
  { id: "tr", flag: "🇹🇷", title: "Türk Mutfağı", text: "Çorba, ana yemek ve tatlılarla sofrayı tamamla.", color: "red" },
  { id: "it", flag: "🇮🇹", title: "İtalyan Mutfağı", text: "Makarna, pizza ve klasik İtalyan lezzetlerini keşfet.", color: "green" },
  { id: "kr", flag: "🇰🇷", title: "Kore Mutfağı", text: "Kore mutfağının renkli ve eğlenceli tariflerini hazırla.", color: "blue" },
];

const categories = [
  { icon: "🥣", title: "Çorba", text: "Sıcak bir başlangıç seç" },
  { icon: "🍲", title: "Ana Yemek", text: "Sofranın yıldızını hazırla" },
  { icon: "🍰", title: "Tatlı", text: "Menüyü tatlı bitir" },
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const cuisine = cuisines.find((c) => c.id === selected);

  return (
    <main>
      <header className="topbar"><div className="brand"><span>👨‍🍳</span> ChefMarket</div><div className="badge">🎮 İlk Seviye</div></header>
      <section className="hero">
        {!selected ? <>
          <div className="eyebrow">MUTFAK MACERASI</div>
          <h1>Bugün hangi mutfakta<br/><em>şef olacaksın?</em></h1>
          <p>Mutfağını seç. Menünü oluştur. Markete git ve doğru malzemeleri sepete at!</p>
          <div className="cards">
            {cuisines.map(c => <button key={c.id} className="cuisine" onClick={() => setSelected(c.id)}>
              <div className={"flag "+c.color}>{c.flag}</div><h2>{c.title}</h2><p>{c.text}</p><span>Mutfağı seç →</span>
            </button>)}
          </div>
        </> : <>
          <button className="back" onClick={() => setSelected(null)}>← Mutfaklara dön</button>
          <div className="eyebrow">{cuisine.flag} {cuisine.title.toUpperCase()}</div>
          <h1>Menünü <em>oluşturalım.</em></h1>
          <p>Önce bir kategori seç. Sonraki adımda yemeğini belirleyip markete gideceğiz.</p>
          <div className="cards categories">
            {categories.map(c => <button key={c.title} className="cuisine category">
              <div className="food">{c.icon}</div><h2>{c.title}</h2><p>{c.text}</p><span>Yemekleri gör →</span>
            </button>)}
          </div>
        </>}
      </section>
      <footer><span>🥕 Seç</span><span>🛒 Alışveriş yap</span><span>🍳 Pişir</span><span>⭐ Puan kazan</span></footer>
    </main>
  );
}