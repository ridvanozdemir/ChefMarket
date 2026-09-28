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
{id:"tr",flag:"🇹🇷",title:"Türk Mutfağı",text:"Çorba, ana yemek ve tatlılarla bilgini test et.",color:"red"},
{id:"it",flag:"🇮🇹",title:"İtalyan Mutfağı",text:"Yakında açılacak.",color:"green",locked:true},
{id:"kr",flag:"🇰🇷",title:"Kore Mutfağı",text:"Yakında açılacak.",color:"blue",locked:true}
];

const categories=[
{id:"soup",icon:"🥣",title:"Çorba",text:"Çorba bilgini test et"},
{id:"main",icon:"🍲",title:"Ana Yemek",text:"Ana yemeklerde ne kadar iyisin?"},
{id:"dessert",icon:"🍰",title:"Tatlı",text:"Tatlı ustalığını göster"}
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

const quizBank={
mercimek:[
{q:"Mercimek çorbasında mercimeğe ilk olarak ne yapılır?",o:["Yıkanıp süzülür","Şekerle ovulur","Fırında kızartılır"],a:0},
{q:"Un kullanılacaksa klasik yöntemde nasıl hazırlanır?",o:["Yağda kısa süre kavrulur","Çiğ olarak en son serpilir","Soğuk suda bekletilir"],a:0},
{q:"Çorbayı pürüzsüz hale getirmek için hangi işlem yapılır?",o:["Blenderdan geçirilir","Dondurulur","Süzmeden bekletilir"],a:0},
{q:"Çorba fazla koyu olursa ne yapılır?",o:["Sıcak su eklenir","Un eklenir","Pirinç eklenir"],a:0},
{q:"Servis öncesinde kıvam ve lezzet için son kontrol hangisidir?",o:["Tuz ve kıvam kontrolü","Şeker oranı","Hamur sertliği"],a:0}
],
ezogelin:[
{q:"Ezogelin çorbasının ayırt edici tahıl birlikteliği hangisidir?",o:["Mercimek, bulgur ve pirinç","Nohut ve makarna","Fasulye ve irmik"],a:0},
{q:"Salça klasik hazırlamada genellikle ne zaman eklenir?",o:["Soğan kavrulduktan sonra","Servisten sonra","Pirinç tamamen soğuyunca"],a:0},
{q:"Tahılların pişmiş olduğunu nasıl anlarsın?",o:["İyice yumuşamış olmalarından","Renklerinin beyaza dönmesinden","Tamamen kurumasından"],a:0},
{q:"Ezogeline karakteristik aroma veren baharat hangisidir?",o:["Nane","Tarçın","Vanilya"],a:0},
{q:"Çorba fazla koyuysa en uygun düzeltme nedir?",o:["Sıcak su eklemek","Daha çok bulgur eklemek","Uzun süre açıkta bekletmek"],a:0}
],
yayla:[
{q:"Yayla çorbasının terbiyesinde temel olarak hangileri kullanılır?",o:["Yoğurt, yumurta ve un","Salça, şeker ve süt","Kıyma, bulgur ve un"],a:0},
{q:"Terbiyenin kesilmemesi için sıcak çorbadan terbiyeye azar azar ekleme işlemine ne denir?",o:["Ilıştırma","Karamelizasyon","Mühürleme"],a:0},
{q:"Yayla çorbasında pirinç ne hale gelene kadar pişirilir?",o:["Yumuşayana kadar","Kıtır kalana kadar","Kavrulana kadar"],a:0},
{q:"Yoğurtlu terbiye eklendikten sonra hangi yaklaşım daha uygundur?",o:["Kontrollü ve karıştırarak ısıtmak","En yüksek ateşte bırakmak","Hemen buz eklemek"],a:0},
{q:"Klasik yayla çorbasında nane çoğunlukla nasıl eklenir?",o:["Tereyağında kızdırılarak","Şekerle kaynatılarak","Çiğ hamura karıştırılarak"],a:0}
],
karniyarik:[
{q:"Karnıyarıkta patlıcan neden boydan yarılır?",o:["İç harca yer açmak için","Çekirdeklerini kurutmak için","Kabuklarını tamamen ayırmak için"],a:0},
{q:"İç harç hazırlanırken kıyma ve soğana ne yapılır?",o:["Kavrulur","Dondurulur","Haşlanmadan çiğ bırakılır"],a:0},
{q:"Patlıcanlar iç harçtan önce genellikle nasıl hazırlanır?",o:["Yumuşatılıp kızartılır veya fırınlanır","Şekerli suda haşlanır","Çiğ olarak doldurulur"],a:0},
{q:"Harç patlıcanın neresine konur?",o:["Açılan orta kısmına","Sapının dışına","Kabuk altına enjekte edilir"],a:0},
{q:"Doldurulan karnıyarık son olarak genellikle ne yapılır?",o:["Fırında pişirilir","Dondurucuda bekletilir","Soğuk servis edilir"],a:0}
],
manti:[
{q:"Mantı hamuru açıldıktan sonra nasıl şekillendirilir?",o:["Küçük karelere kesilir","Uzun şerit halinde bırakılır","Yuvarlak kek kalıbına alınır"],a:0},
{q:"Klasik mantıda iç harç nereye konur?",o:["Hamur karelerinin ortasına","Yoğurdun içine","Haşlama suyuna"],a:0},
{q:"Mantı parçaları kapatıldıktan sonra temel pişirme yöntemi nedir?",o:["Suda haşlamak","Kömürde közlemek","Buharda kek gibi pişirmek"],a:0},
{q:"Klasik mantının temel soslarından biri hangisidir?",o:["Sarımsaklı yoğurt","Vanilyalı krema","Limonlu şerbet"],a:0},
{q:"Mantının üst sosunda tereyağı çoğunlukla neyle aromalandırılır?",o:["Pul biber veya kırmızı biber","Kakao","Tarçın ve şeker"],a:0}
],
kuru:[
{q:"Kuru fasulyeyi pişirmeden önce uygulanan yaygın hazırlık nedir?",o:["Suda bekletmek","Şekerle ovmak","Fırında kurutmak"],a:0},
{q:"Yemeğin lezzet tabanı için önce ne kavrulur?",o:["Soğan","Yoğurt","Pirinç"],a:0},
{q:"Domates salçası ne zaman eklenir?",o:["Soğan kavrulduktan sonra","Servisten sonra","Fasulye tamamen soğuyunca"],a:0},
{q:"Fasulye tencereye girdikten sonra temel pişirme yaklaşımı nedir?",o:["Sıvıyla yumuşayana kadar pişirmek","Susuz yüksek ateşte yakmak","Soğukta dinlendirmek"],a:0},
{q:"Yemeğin pişmişliğini en iyi ne gösterir?",o:["Fasulyelerin yumuşaması","Suyun tamamen yok olması","Soğanın kıtır kalması"],a:0}
],
sutlac:[
{q:"Sütlaçta pirinç ilk olarak genellikle ne yapılır?",o:["Suda yumuşayana kadar pişirilir","Yağda kızartılır","Çiğ halde sütle dondurulur"],a:0},
{q:"Pirinç yumuşadıktan sonra temel sıvı olarak ne eklenir?",o:["Süt","Et suyu","Zeytinyağı"],a:0},
{q:"Şeker hangi amaçla eklenir?",o:["Tatlandırmak için","Koyulaştırmak için tek başına","Pirinci sertleştirmek için"],a:0},
{q:"Nişasta kullanılacaksa topaklanmaması için nasıl eklenmelidir?",o:["Sıvıyla açılarak","Kuru halde tek parça","Dondurularak"],a:0},
{q:"Sütlaç kıvam aldıktan sonra genellikle nasıl servis edilir?",o:["Kaselere alınıp soğutularak","Tavada kızartılarak","Hamur gibi yoğrularak"],a:0}
],
revani:[
{q:"Revani hamurunun karakteristik malzemesi hangisidir?",o:["İrmik","Kıyma","Mercimek"],a:0},
{q:"Yumurta ve şeker hazırlanırken amaç nedir?",o:["İyice çırpıp karışımı havalandırmak","Yakmak","Dondurmak"],a:0},
{q:"Revani pişirme yöntemi hangisidir?",o:["Fırında pişirme","Suda haşlama","Tavada mühürleme"],a:0},
{q:"Revaniyi karakteristik olarak tamamlayan işlem nedir?",o:["Şerbet dökmek","Sarımsaklı yoğurt eklemek","Salçayla kavurmak"],a:0},
{q:"Şerbetin keke daha iyi geçmesi için neye dikkat edilir?",o:["Kek ve şerbet arasında uygun sıcaklık farkına","İkisinin de donmuş olmasına","Kekin çiğ kalmasına"],a:0}
],
irmik:[
{q:"İrmik helvasında ilk temel işlem nedir?",o:["İrmiği yağda kavurmak","İrmiği çiğ servis etmek","İrmiği dondurmak"],a:0},
{q:"Kavurma sırasında doğru işaret hangisidir?",o:["İrmiğin renk alıp güzel koku vermesi","Tamamen siyahlaşması","Suyla dolması"],a:0},
{q:"Sütlü karışım kavrulmuş irmiğe nasıl eklenmelidir?",o:["Dikkatlice eklenmelidir","Buz halinde atılmalıdır","Hiç karıştırılmamalıdır"],a:0},
{q:"Sıvı eklendikten sonra helva ne yapana kadar pişirilir?",o:["Sıvıyı çekene kadar","Tamamen sıvı kalana kadar","Donana kadar"],a:0},
{q:"Pişirme bittikten sonra helvaya ne yapmak kıvamı iyileştirir?",o:["Bir süre dinlendirmek","Buzlu suya sokmak","Tekrar çiğ irmik eklemek"],a:0}
]};

const prices={"Soğan":12,"Havuç":14,"Domates":22,"Biber":24,"Patlıcan":28,"Limon":10,"Sarımsak":18,"Maydanoz":9,"Patates":18,"Salatalık":16,"Kıyma":185,"Süt":38,"Yoğurt":55,"Tereyağı":95,"Yumurta":65,"Kaşar":110,"Kırmızı mercimek":48,"Bulgur":32,"Pirinç":58,"Kuru fasulye":72,"İrmik":35,"Un":30,"Nişasta":25,"Makarna":28,"Şeker":42,"Tuz":12,"Domates salçası":45,"Vanilya":12,"Nane":18,"Çam fıstığı":85,"Zeytin":70,"Krema":42,"Mantar":45,"Su":8};

export default function Home(){
 const [selected,setSelected]=useState(null);
 const [category,setCategory]=useState(null);
 const [dish,setDish]=useState(null);
 const [basket,setBasket]=useState([]);
 const [aisle,setAisle]=useState(null);
 const [stage,setStage]=useState("market");
 const [shoppingScore,setShoppingScore]=useState(null);
 const [quizIndex,setQuizIndex]=useState(0);
 const [quizAnswers,setQuizAnswers]=useState([]);
 const [marketMessage,setMarketMessage]=useState("");

 const cuisine=cuisines.find(c=>c.id===selected);
 const chosen=dish&&dishes[category].find(d=>d.id===dish);
 const activeAisle=aisles.find(a=>a.id===aisle);
 const aisleProducts=activeAisle?activeAisle.products:[];
 const total=basket.reduce((sum,i)=>sum+(prices[i]||0),0);
 const questions=chosen?quizBank[chosen.id]||[]:[];
 const quizScore=questions.length?Math.round((quizAnswers.filter((answer,i)=>answer===questions[i]?.a).length/questions.length)*100):0;
 const finalScore=shoppingScore===null?0:Math.round((shoppingScore+quizScore)/2);

 const toggle=i=>setBasket(b=>b.includes(i)?b.filter(x=>x!==i):[...b,i]);

 const chooseDish=id=>{
  setDish(id);setBasket([]);setAisle(null);setStage("market");setShoppingScore(null);setQuizIndex(0);setQuizAnswers([]);setMarketMessage("");
 };

 const resetBack=()=>{
  if(stage==="quiz"||stage==="final"){setStage("market");setQuizIndex(0);setQuizAnswers([]);return}
  if(aisle){setAisle(null);return}
  if(dish){setDish(null);setBasket([]);setShoppingScore(null);setMarketMessage("");return}
  if(category){setCategory(null);return}
  setSelected(null);
 };

 const finishShopping=()=>{
  if(!basket.length){setMarketMessage("Sepetin boş. Önce gerekli olduğunu düşündüğün ürünleri seç.");return}
  const correctPicked=basket.filter(i=>chosen.ingredients.includes(i)).length;
  const wrongPicked=basket.filter(i=>!chosen.ingredients.includes(i)).length;
  const unionCount=chosen.ingredients.length+wrongPicked;
  const score=Math.round((correctPicked/unionCount)*100);
  setShoppingScore(score);
  if(score>=70){
   setMarketMessage("");
   setAisle(null);
   setStage("quiz");
  }else{
   setMarketMessage(`Alışveriş puanın %${score}. Pişirme etabına geçmek için en az %70 gerekiyor.`);
  }
 };

 const retryShopping=()=>{setBasket([]);setAisle(null);setShoppingScore(null);setMarketMessage("")};

 const answerQuiz=answer=>{
  const next=[...quizAnswers];
  next[quizIndex]=answer;
  setQuizAnswers(next);
  if(quizIndex===questions.length-1)setStage("final");
  else setQuizIndex(i=>i+1);
 };

 const restartDish=()=>chooseDish(chosen.id);

 return <main>
 <header className="topbar"><div className="brand"><span>👨‍🍳</span> ChefMarket</div><div className="badge">{stage==="market"?"🛒 Alışveriş":stage==="quiz"?"🍳 Pişirme":"🏆 Sonuç"}</div></header>
 <section className="hero">
 {!selected?<><div className="eyebrow">MUTFAK MACERASI</div><h1>Bugün hangi mutfakta<br/><em>şef olacaksın?</em></h1><p>Doğru malzemeleri bul, alışveriş barajını geç ve ardından aşçılık bilgini kanıtla.</p><div className="cards">{cuisines.map(c=><button disabled={c.locked} key={c.id} className={"cuisine "+(c.locked?"locked":"")} onClick={()=>!c.locked&&setSelected(c.id)}><div className={"flag "+c.color}>{c.flag}</div><h2>{c.title}</h2><p>{c.text}</p><span>{c.locked?"🔒 Yakında":"Mutfağı seç →"}</span></button>)}</div></>
 :!category?<><button className="back" onClick={resetBack}>← Mutfaklara dön</button><div className="eyebrow">{cuisine.flag} TÜRK MUTFAĞI</div><h1>Ne <em>pişirelim?</em></h1><p>Kategorini seç ve mutfak bilgini göstermeye başla.</p><div className="cards categories">{categories.map(c=><button key={c.id} className="cuisine category" onClick={()=>setCategory(c.id)}><div className="food">{c.icon}</div><h2>{c.title}</h2><p>{c.text}</p><span>3 yemek →</span></button>)}</div></>
 :!dish?<><button className="back" onClick={resetBack}>← Kategorilere dön</button><div className="eyebrow">{categories.find(c=>c.id===category).icon} {categories.find(c=>c.id===category).title.toUpperCase()}</div><h1>Yemeğini <em>seç.</em></h1><p>Malzeme listesi verilmeyecek. Yemeği ne kadar iyi tanıyorsan o kadar yüksek puan alırsın.</p><div className="cards">{dishes[category].map(d=><button key={d.id} className="cuisine dish" onClick={()=>chooseDish(d.id)}><div className="food">{d.emoji}</div><h2>{d.name}</h2><p>⏱ {d.time} · 🎯 {d.difficulty}</p><span>Teste başla →</span></button>)}</div></>
 :stage==="market"?<><button className="back" onClick={resetBack}>← Yemeklere dön</button><div className="eyebrow">1. ETAP · 🛒 ALIŞVERİŞ</div><h1><em>{chosen.name}</em> için alışveriş</h1><p>Malzeme listesi yok. Bu yemeğin gerektirdiğini düşündüğün ürünleri doğru reyonlardan bulup sepete ekle. Gereksiz ürünler puanını düşürür.</p>
 <div className="game"><aside className="recipe"><div className="bigfood">{chosen.emoji}</div><h2>{chosen.name}</h2><p>Bilgine güven ve alışverişini tamamla.</p><div className="hint neutral">🎯 Pişirme etabına geçiş barajı: <b>%70</b></div><div className="scoreformula">Doğru seçimler puanı yükseltir.<br/>Gereksiz ürünler puanı düşürür.</div></aside>
 <div className="market">{!aisle?<><div className="maphead"><div><h2>🏪 ChefMarket Haritası</h2><p className="marketnote">Doğru reyonu kendin bul.</p></div><div className="maptotal">🛒 {basket.length} ürün · <b>₺{total}</b></div></div><div className="storemap"><div className="entrance">🚪 GİRİŞ<br/><small>Buradasın 👨‍🍳</small></div><div className="mapgrid">{aisles.map((a,n)=><button className={"mapaisle map"+n} key={a.id} onClick={()=>setAisle(a.id)}><b>{a.icon}</b><span>{a.name}</span><small>Reyona gir</small></button>)}</div><div className="checkout">🧾 KASA <span>Sepet ₺{total}</span></div></div></>:<><button className="aisleback" onClick={()=>setAisle(null)}>← Market haritasına dön</button><h2>{activeAisle.icon} {activeAisle.name}</h2><p className="marketnote">Bu reyondan gerekli olduğunu düşündüğün ürünleri seç.</p><div className="shelf">{aisleProducts.map(i=><button key={i} draggable onDragStart={e=>e.dataTransfer.setData("text/plain",i)} onClick={()=>toggle(i)} className={basket.includes(i)?"product selected":"product"}><span>{basket.includes(i)?"✓":"+"}</span><strong>{i}</strong><em>≈ ₺{prices[i]||0}</em><small>Sürükle veya dokun</small></button>)}</div></>}
 <div className="basket dropbasket" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const i=e.dataTransfer.getData("text/plain");if(i&&!basket.includes(i))setBasket(b=>[...b,i])}}><div>🛒 Sepet: <b>{basket.length} ürün</b></div><div className="basketprice">Yaklaşık toplam <b>₺{total}</b></div><small>Fiyatlar oyun içi yaklaşık değerlerdir.</small></div>
 <button className="primaryAction" onClick={finishShopping}>Alışverişi tamamla ve kasaya git →</button>
 {marketMessage&&<div className="result bad">{marketMessage}<button className="retry" onClick={retryShopping}>Sepeti boşaltıp tekrar dene</button></div>}
 </div></div></>
 :stage==="quiz"?<><div className="eyebrow">2. ETAP · 🍳 PİŞİRME BİLGİSİ</div><h1><em>{chosen.name}</em> ustası mısın?</h1><p>Alışveriş barajını geçtin: <b>%{shoppingScore}</b>. Şimdi 5 soruluk, 3 seçenekli mini quiz var.</p>
 <div className="quizWrap"><div className="quizProgress"><span>Soru {quizIndex+1}/5</span><div><i style={{width:`${((quizIndex+1)/5)*100}%`}}/></div></div><div className="quizCard"><div className="quizEmoji">{chosen.emoji}</div><h2>{questions[quizIndex].q}</h2><div className="answers">{questions[quizIndex].o.map((o,i)=><button key={o} onClick={()=>answerQuiz(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div></div></div></>
 :<><div className="eyebrow">🏆 ŞEFLİK KARNESİ</div><h1><em>{chosen.name}</em> sonucun</h1><p>Hem alışveriş bilgisi hem de pişirme bilgisi birlikte değerlendirildi.</p>
 <div className="finalCard"><div className="finalFood">{chosen.emoji}</div><h2>{chosen.name}</h2><div className="scoreGrid"><div><span>🛒 Alışveriş</span><strong>%{shoppingScore}</strong></div><div><span>🍳 Pişirme Quiz</span><strong>%{quizScore}</strong></div></div><div className="average"><span>ORTALAMA PUAN</span><strong>{finalScore}<small>/100</small></strong></div><p>{finalScore>=90?"🏅 Usta şef!":finalScore>=75?"👏 Gayet iyi bir aşçılık bilgisi.":finalScore>=60?"👍 Temel bilgin iyi, biraz daha pratikle yükselir.":"📚 Bu yemek için biraz daha mutfak çalışması gerekiyor."}</p><div className="finalActions"><button className="secondaryAction" onClick={()=>{setDish(null);setStage("market");setBasket([])}}>Başka yemek seç</button><button className="primaryAction" onClick={restartDish}>Tekrar oyna</button></div></div></>}
 </section><footer><span>🛒 Bilgini alışverişte göster</span><span>🍳 5 soruda aşçılığını test et</span><span>🏆 Ortalama puanını gör</span></footer></main>
}