"use client";
import { useState } from "react";

const aisles=[
{id:"produce",icon:"🥕",name:"Manav",products:["Soğan","Havuç","Domates","Biber","Patlıcan","Limon","Sarımsak","Maydanoz","Patates","Salatalık"]},
{id:"meat",icon:"🥩",name:"Kasap",products:["Kıyma"]},
{id:"dairy",icon:"🥛",name:"Süt & Kahvaltı",products:["Süt","Yoğurt","Tereyağı","Yumurta","Kaşar"]},
{id:"pantry",icon:"🌾",name:"Bakliyat & Tahıl",products:["Kırmızı mercimek","Bulgur","Pirinç","Kuru fasulye","İrmik","Un","Nişasta","Makarna"]},
{id:"grocery",icon:"🫙",name:"Temel Gıda",products:["Şeker","Tuz","Domates salçası","Vanilya","Nane","Çam fıstığı","Zeytin"]},
{id:"other",icon:"🧺",name:"Diğer",products:["Krema","Mantar","Su"]}
];

const cuisines=[
{id:"tr",flag:"🇹🇷",title:"Türk Mutfağı",text:"Çorba, ana yemek ve tatlılarla sofrayı tamamla.",color:"red"},
{id:"it",flag:"🇮🇹",title:"İtalyan Mutfağı",text:"Yakında açılacak.",color:"green",locked:true},
{id:"kr",flag:"🇰🇷",title:"Kore Mutfağı",text:"Yakında açılacak.",color:"blue",locked:true}
];
const categories=[
{id:"soup",icon:"🥣",title:"Çorba",text:"Sıcak bir başlangıç seç"},
{id:"main",icon:"🍲",title:"Ana Yemek",text:"Sofranın yıldızını hazırla"},
{id:"dessert",icon:"🍰",title:"Tatlı",text:"Menüyü tatlı bitir"}
];
const dishes={
soup:[
{id:"mercimek",emoji:"🥣",name:"Mercimek Çorbası",difficulty:"Kolay",time:"35 dk",ingredients:["Kırmızı mercimek","Soğan","Havuç","Un","Tereyağı","Tuz"]},
{id:"ezogelin",emoji:"🍲",name:"Ezogelin Çorbası",difficulty:"Orta",time:"40 dk",ingredients:["Kırmızı mercimek","Bulgur","Pirinç","Soğan","Domates salçası","Nane"]},
{id:"yayla",emoji:"🥛",name:"Yayla Çorbası",difficulty:"Orta",time:"35 dk",ingredients:["Yoğurt","Pirinç","Yumurta","Un","Tereyağı","Nane"]}
],
main:[
{id:"karniyarik",emoji:"🍆",name:"Karnıyarık",difficulty:"Orta",time:"60 dk",ingredients:["Patlıcan","Kıyma","Soğan","Domates","Biber","Domates salçası"]},
{id:"manti",emoji:"🥟",name:"Mantı",difficulty:"Zor",time:"75 dk",ingredients:["Un","Yumurta","Kıyma","Soğan","Yoğurt","Sarımsak"]},
{id:"kuru",emoji:"🫘",name:"Kuru Fasulye",difficulty:"Orta",time:"70 dk",ingredients:["Kuru fasulye","Soğan","Domates salçası","Tereyağı","Tuz","Su"]}
],
dessert:[
{id:"sutlac",emoji:"🍚",name:"Sütlaç",difficulty:"Kolay",time:"45 dk",ingredients:["Süt","Pirinç","Şeker","Nişasta","Vanilya"]},
{id:"revani",emoji:"🍰",name:"Revani",difficulty:"Orta",time:"55 dk",ingredients:["İrmik","Un","Yumurta","Yoğurt","Şeker","Limon"]},
{id:"irmik",emoji:"🥄",name:"İrmik Helvası",difficulty:"Kolay",time:"30 dk",ingredients:["İrmik","Tereyağı","Süt","Şeker","Çam fıstığı"]}
]};
const marketExtras=["Makarna","Mantar","Kaşar","Patates","Maydanoz","Salatalık","Zeytin","Krema"];
const prices={"Soğan":12,"Havuç":14,"Domates":22,"Biber":24,"Patlıcan":28,"Limon":10,"Sarımsak":18,"Maydanoz":9,"Patates":18,"Salatalık":16,"Kıyma":185,"Süt":38,"Yoğurt":55,"Tereyağı":95,"Yumurta":65,"Kaşar":110,"Kırmızı mercimek":48,"Bulgur":32,"Pirinç":58,"Kuru fasulye":72,"İrmik":35,"Un":30,"Nişasta":25,"Makarna":28,"Şeker":42,"Tuz":12,"Domates salçası":45,"Vanilya":12,"Nane":18,"Çam fıstığı":85,"Zeytin":70,"Krema":42,"Mantar":45,"Su":8};

export default function Home(){
 const [selected,setSelected]=useState(null),[category,setCategory]=useState(null),[dish,setDish]=useState(null),[basket,setBasket]=useState([]),[aisle,setAisle]=useState(null);
 const cuisine=cuisines.find(c=>c.id===selected),chosen=dish&&dishes[category].find(d=>d.id===dish);
 const market=chosen?[...new Set([...chosen.ingredients,...marketExtras])]:[];
 const activeAisle=aisles.find(a=>a.id===aisle);
 const aisleProducts=activeAisle?activeAisle.products.filter(i=>market.includes(i)):[];
 const toggle=i=>setBasket(b=>b.includes(i)?b.filter(x=>x!==i):[...b,i]);
 const resetBack=()=>{if(aisle){setAisle(null)}else if(dish){setDish(null);setBasket([])}else if(category)setCategory(null);else setSelected(null)};
 const correct=chosen&&chosen.ingredients.every(i=>basket.includes(i))&&basket.every(i=>chosen.ingredients.includes(i));
 const total=basket.reduce((sum,i)=>sum+(prices[i]||0),0);
 return <main>
 <header className="topbar"><div className="brand"><span>👨‍🍳</span> ChefMarket</div><div className="badge">⭐ {basket.length*10} puan</div></header>
 <section className="hero">
 {!selected?<><div className="eyebrow">MUTFAK MACERASI</div><h1>Bugün hangi mutfakta<br/><em>şef olacaksın?</em></h1><p>İlk oynanabilir mutfağımız hazır. Türk mutfağıyla başlayalım!</p><div className="cards">{cuisines.map(c=><button disabled={c.locked} key={c.id} className={"cuisine "+(c.locked?"locked":"")} onClick={()=>!c.locked&&setSelected(c.id)}><div className={"flag "+c.color}>{c.flag}</div><h2>{c.title}</h2><p>{c.text}</p><span>{c.locked?"🔒 Yakında":"Mutfağı seç →"}</span></button>)}</div></>
 :!category?<><button className="back" onClick={resetBack}>← Mutfaklara dön</button><div className="eyebrow">{cuisine.flag} TÜRK MUTFAĞI</div><h1>Ne <em>pişirelim?</em></h1><p>Kategorini seç, ardından tarifini belirle.</p><div className="cards categories">{categories.map(c=><button key={c.id} className="cuisine category" onClick={()=>setCategory(c.id)}><div className="food">{c.icon}</div><h2>{c.title}</h2><p>{c.text}</p><span>3 yemek →</span></button>)}</div></>
 :!dish?<><button className="back" onClick={resetBack}>← Kategorilere dön</button><div className="eyebrow">{categories.find(c=>c.id===category).icon} {categories.find(c=>c.id===category).title.toUpperCase()}</div><h1>Tarifini <em>seç.</em></h1><p>Her tarifin market listesi farklı. Birini seç ve alışverişe başla.</p><div className="cards">{dishes[category].map(d=><button key={d.id} className="cuisine dish" onClick={()=>setDish(d.id)}><div className="food">{d.emoji}</div><h2>{d.name}</h2><p>⏱ {d.time} · 🎯 {d.difficulty}</p><span>Markete git →</span></button>)}</div></>
 :<><button className="back" onClick={resetBack}>← Yemeklere dön</button><div className="eyebrow">🛒 CHEFMARKET</div><h1><em>{chosen.name}</em> için alışveriş</h1><p>Tarifi ezberle: gerekli olduğunu düşündüğün ürünleri sepete ekle. Fazladan ürün alma!</p>
 <div className="game"><aside className="recipe"><div className="bigfood">{chosen.emoji}</div><h2>{chosen.name}</h2><p>Gerekli malzeme: <b>{chosen.ingredients.length}</b></p><div className="hint">💡 İpucu: Sepette tam {chosen.ingredients.length} ürün olmalı.</div></aside>
 <div className="market">{!aisle?<><div className="maphead"><div><h2>🏪 ChefMarket Haritası</h2><p className="marketnote">Koridorda ilerle, doğru reyonu bul ve içeri gir.</p></div><div className="maptotal">🛒 ${basket.length} ürün · <b>₺${total}</b></div></div><div className="storemap"><div className="entrance">🚪 GİRİŞ<br/><small>Buradasın 👨‍🍳</small></div><div className="mapgrid">{aisles.map((a,n)=><button className={"mapaisle map"+n} key={a.id} onClick={()=>setAisle(a.id)}><b>{a.icon}</b><span>{a.name}</span><small>Reyona gir</small></button>)}</div><div className="checkout">🧾 KASA <span>Sepet ₺{total}</span></div></div></>:<><button className="aisleback" onClick={()=>setAisle(null)}>← Market haritasına dön</button><h2>{activeAisle.icon} {activeAisle.name}</h2><p className="marketnote">Raftaki ürünlerden ihtiyacın olanı seç.</p><div className="shelf">{aisleProducts.length?aisleProducts.map(i=><button key={i} draggable onDragStart={e=>e.dataTransfer.setData("text/plain",i)} onClick={()=>toggle(i)} className={basket.includes(i)?"product selected":"product"}><span>{basket.includes(i)?"✓":"+"}</span><strong>{i}</strong><em>≈ ₺{prices[i]||0}</em><small>Sürükle veya dokun</small></button>):<div className="empty">Bu rafta şu an aradığın ürünlerden yok.</div>}</div></>}
 <div className="basket dropbasket" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const i=e.dataTransfer.getData("text/plain");if(i&&!basket.includes(i))setBasket(b=>[...b,i])}}><div>🛒 Sepet: <b>{basket.length}/{chosen.ingredients.length}</b></div><div className="basketprice">Yaklaşık toplam <b>₺{total}</b></div><small>Fiyatlar oyun içi yaklaşık değerlerdir.</small></div>
 {basket.length>=chosen.ingredients.length&&<div className={correct?"result good":"result bad"}>{correct?"🎉 Harika! Tüm malzemeler doğru. +100 puan":"🤔 Sepette eksik veya gereksiz bir ürün var. Tekrar dene!"}</div>}
 </div></div></>}
 </section><footer><span>🥕 Seç</span><span>🛒 Alışveriş yap</span><span>🍳 Pişir</span><span>⭐ Puan kazan</span></footer></main>
}