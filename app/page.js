"use client";
import { useEffect, useState } from "react";

import { aisles, cuisines, categories, dishes, quizBank, prices } from "./gameData";

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
 const [progress,setProgress]=useState({});
 const [progressReady,setProgressReady]=useState(false);

 const cuisine=cuisines.find(c=>c.id===selected);
 const chosen=dish&&dishes[category].find(d=>d.id===dish);
 const activeAisle=aisles.find(a=>a.id===aisle);
 const aisleProducts=activeAisle?activeAisle.products:[];
 const total=basket.reduce((sum,i)=>sum+(prices[i]||0),0);
 const questions=chosen?quizBank[chosen.id]||[]:[];
 const quizScore=questions.length?Math.round((quizAnswers.filter((answer,i)=>answer===questions[i]?.a).length/questions.length)*100):0;
 const finalScore=shoppingScore===null?0:Math.round((shoppingScore+quizScore)/2);
 const categoryStats=Object.fromEntries(categories.map(c=>{
  const scores=dishes[c.id].map(d=>progress[d.id]?.best).filter(v=>typeof v==="number");
  return [c.id,{completed:scores.length,total:dishes[c.id].length,score:scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null}];
 }));
 const allDishIds=Object.values(dishes).flat().map(d=>d.id);
 const overallScores=allDishIds.map(id=>progress[id]?.best).filter(v=>typeof v==="number");
 const turkishScore=overallScores.length?Math.round(overallScores.reduce((a,b)=>a+b,0)/overallScores.length):null;
 const completedTotal=overallScores.length;

 useEffect(()=>{
  try{
   const saved=localStorage.getItem("chefmarket-tr-progress");
   if(saved)setProgress(JSON.parse(saved));
  }catch{}
  setProgressReady(true);
 },[]);

 useEffect(()=>{
  if(!progressReady||stage!=="final"||!chosen||shoppingScore===null||quizAnswers.length<5)return;
  setProgress(prev=>{
   const old=prev[chosen.id];
   const best=Math.max(old?.best??0,finalScore);
   const next={...prev,[chosen.id]:{best,attempts:(old?.attempts??0)+1,last:finalScore}};
   try{localStorage.setItem("chefmarket-tr-progress",JSON.stringify(next))}catch{}
   return next;
  });
 },[stage]);

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

 const questionShift=chosen?((quizIndex+chosen.id.length)%3):0;
 const shownOptions=questions[quizIndex]?questions[quizIndex].o.map((_,i)=>questions[quizIndex].o[(i+questionShift)%3]):[];
 const shownCorrectIndex=questions[quizIndex]?((questions[quizIndex].a-questionShift+3)%3):0;

 const answerQuiz=answer=>{
  const next=[...quizAnswers];
  next[quizIndex]=answer===shownCorrectIndex?questions[quizIndex].a:-1;
  setQuizAnswers(next);
  if(quizIndex===questions.length-1)setStage("final");
  else setQuizIndex(i=>i+1);
 };

 const restartDish=()=>chooseDish(chosen.id);

 return <main>
 <header className="topbar"><div className="brand"><span>👨‍🍳</span> ChefMarket</div><div className="badge">{stage==="market"?"🛒 Alışveriş":stage==="quiz"?"🍳 Pişirme":"🏆 Sonuç"}</div></header>
 <section className="hero">
 {!selected?<><div className="eyebrow">MUTFAK MACERASI</div><h1>Bugün hangi mutfakta<br/><em>şef olacaksın?</em></h1><p>Doğru malzemeleri bul, alışveriş barajını geç ve ardından aşçılık bilgini kanıtla.</p><div className="cards">{cuisines.map(c=><button disabled={c.locked} key={c.id} className={"cuisine "+(c.locked?"locked":"")} onClick={()=>!c.locked&&setSelected(c.id)}><div className={"flag "+c.color}>{c.flag}</div><h2>{c.title}</h2><p>{c.text}</p><span>{c.locked?"🔒 Yakında":"Mutfağı seç →"}</span></button>)}</div></>
 :!category?<><button className="back" onClick={resetBack}>← Mutfaklara dön</button><div className="eyebrow">{cuisine.flag} TÜRK MUTFAĞI</div><h1>Şeflik <em>yolculuğun.</em></h1><p>Her yemeğin en iyi puanı kaydedilir. Yemekleri tamamladıkça kategori ustalığın ve Türk Mutfağı Şeflik Puanın oluşur.</p>
 <div className="masteryHero"><div><span>🇹🇷 TÜRK MUTFAĞI ŞEFLİK PUANI</span><strong>{turkishScore===null?"—":turkishScore}<small>{turkishScore===null?"":"/100"}</small></strong><p>{completedTotal}/30 yemek tamamlandı{completedTotal<30?" · 30/30 tamamlanınca tam karnen hazır.":" · Türk Mutfağı karnen tamamlandı!"}</p></div><div className="masteryRing" style={{"--score":turkishScore??0}}><b>{turkishScore??0}%</b></div></div>
 <div className="cards categories masteryCards">{categories.map(c=>{const st=categoryStats[c.id];return <button key={c.id} className="cuisine category" onClick={()=>setCategory(c.id)}><div className="food">{c.icon}</div><h2>{c.title} Ustalığı</h2><div className="categoryScore"><b>{st.score===null?"—":st.score}</b><span>{st.score===null?"Henüz puan yok":"/100"}</span></div><p>{st.completed}/{st.total} yemek tamamlandı</p><div className="miniProgress"><i style={{width:`${(st.completed/st.total)*100}%`}}/></div><span>{st.completed===st.total?"🏅 Ustalık tamamlandı":"Devam et →"}</span></button>})}</div></>
 :!dish?<><button className="back" onClick={resetBack}>← Kategorilere dön</button><div className="eyebrow">{categories.find(c=>c.id===category).icon} {categories.find(c=>c.id===category).title.toUpperCase()} USTALIĞI · {categoryStats[category].completed}/10</div><h1>Yemeğini <em>seç.</em></h1><p>Malzeme listesi verilmeyecek. Her yemeğin en iyi sonucu kategori ustalık puanına eklenir.</p><div className="cards">{dishes[category].map(d=>{const saved=progress[d.id];return <button key={d.id} className="cuisine dish" onClick={()=>chooseDish(d.id)}><div className="food">{d.emoji}</div><h2>{d.name}</h2><p>⏱ {d.time} · 🎯 {d.difficulty}</p>{saved&&<div className="dishBest">🏆 En iyi: <b>{saved.best}/100</b><small>{saved.attempts} deneme</small></div>}<span>{saved?"Puanını yükselt →":"Teste başla →"}</span></button>})}</div></>
 :stage==="market"?<><button className="back" onClick={resetBack}>← Yemeklere dön</button><div className="eyebrow">1. ETAP · 🛒 ALIŞVERİŞ</div><h1><em>{chosen.name}</em> için alışveriş</h1><p>Malzeme listesi yok. Bu yemeğin gerektirdiğini düşündüğün ürünleri doğru reyonlardan bulup sepete ekle. Gereksiz ürünler puanını düşürür.</p>
 <div className="game"><aside className="recipe"><div className="bigfood">{chosen.emoji}</div><h2>{chosen.name}</h2><p>Bilgine güven ve alışverişini tamamla.</p><div className="hint neutral">🎯 Pişirme etabına geçiş barajı: <b>%70</b></div><div className="scoreformula">Doğru seçimler puanı yükseltir.<br/>Gereksiz ürünler puanı düşürür.</div></aside>
 <div className="market">{!aisle?<><div className="maphead"><div><h2>🏪 ChefMarket Haritası</h2><p className="marketnote">Doğru reyonu kendin bul.</p></div><div className="maptotal">🛒 {basket.length} ürün · <b>₺{total}</b></div></div><div className="storemap"><div className="entrance">🚪 GİRİŞ<br/><small>Buradasın 👨‍🍳</small></div><div className="mapgrid">{aisles.map((a,n)=><button className={"mapaisle map"+n} key={a.id} onClick={()=>setAisle(a.id)}><b>{a.icon}</b><span>{a.name}</span><small>Reyona gir</small></button>)}</div><div className="checkout">🧾 KASA <span>Sepet ₺{total}</span></div></div></>:<><button className="aisleback" onClick={()=>setAisle(null)}>← Market haritasına dön</button><h2>{activeAisle.icon} {activeAisle.name}</h2><p className="marketnote">Bu reyondan gerekli olduğunu düşündüğün ürünleri seç.</p><div className="shelf">{aisleProducts.map(i=><button key={i} draggable onDragStart={e=>e.dataTransfer.setData("text/plain",i)} onClick={()=>toggle(i)} className={basket.includes(i)?"product selected":"product"}><span>{basket.includes(i)?"✓":"+"}</span><strong>{i}</strong><em>≈ ₺{prices[i]||0}</em><small>Sürükle veya dokun</small></button>)}</div></>}
 <div className="basket dropbasket" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const i=e.dataTransfer.getData("text/plain");if(i&&!basket.includes(i))setBasket(b=>[...b,i])}}><div>🛒 Sepet: <b>{basket.length} ürün</b></div><div className="basketprice">Yaklaşık toplam <b>₺{total}</b></div><small>Fiyatlar oyun içi yaklaşık değerlerdir.</small></div>
 <button className="primaryAction" onClick={finishShopping}>Alışverişi tamamla ve kasaya git →</button>
 {marketMessage&&<div className="result bad">{marketMessage}<button className="retry" onClick={retryShopping}>Sepeti boşaltıp tekrar dene</button></div>}
 </div></div></>
 :stage==="quiz"?<><div className="eyebrow">2. ETAP · 🍳 PİŞİRME BİLGİSİ</div><h1><em>{chosen.name}</em> ustası mısın?</h1><p>Alışveriş barajını geçtin: <b>%{shoppingScore}</b>. Şimdi 5 soruluk, 3 seçenekli mini quiz var.</p>
 <div className="quizWrap"><div className="quizProgress"><span>Soru {quizIndex+1}/5</span><div><i style={{width:`${((quizIndex+1)/5)*100}%`}}/></div></div><div className="quizCard"><div className="quizEmoji">{chosen.emoji}</div><h2>{questions[quizIndex].q}</h2><div className="answers">{shownOptions.map((o,i)=><button key={o} onClick={()=>answerQuiz(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div></div></div></>
 :<><div className="eyebrow">🏆 ŞEFLİK KARNESİ</div><h1><em>{chosen.name}</em> sonucun</h1><p>Hem alışveriş bilgisi hem de pişirme bilgisi birlikte değerlendirildi.</p>
 <div className="finalCard"><div className="finalFood">{chosen.emoji}</div><h2>{chosen.name}</h2><div className="scoreGrid"><div><span>🛒 Alışveriş</span><strong>%{shoppingScore}</strong></div><div><span>🍳 Pişirme Quiz</span><strong>%{quizScore}</strong></div></div><div className="average"><span>BU DENEME</span><strong>{finalScore}<small>/100</small></strong></div><div className="savedScore"><span>🏆 Kaydedilen en iyi puan</span><b>{Math.max(progress[chosen.id]?.best??0,finalScore)}/100</b></div><p>{finalScore>=90?"🏅 Usta şef!":finalScore>=75?"👏 Gayet iyi bir aşçılık bilgisi.":finalScore>=60?"👍 Temel bilgin iyi, biraz daha pratikle yükselir.":"📚 Bu yemek için biraz daha mutfak çalışması gerekiyor."}</p><div className="masteryMini"><b>{categories.find(c=>c.id===category).title} Ustalığı</b><span>{categoryStats[category].score??finalScore}/100 · {Math.max(categoryStats[category].completed,progress[chosen.id]?categoryStats[category].completed:categoryStats[category].completed+1)}/10 yemek</span></div><div className="finalActions"><button className="secondaryAction" onClick={()=>{setDish(null);setStage("market");setBasket([])}}>Başka yemek seç</button><button className="primaryAction" onClick={restartDish}>Tekrar oyna</button></div></div></>}
 </section><footer><span>🛒 Bilgini alışverişte göster</span><span>🍳 5 soruda aşçılığını test et</span><span>🏆 Ortalama puanını gör</span></footer></main>
}