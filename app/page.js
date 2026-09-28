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
 const [jokerUsed,setJokerUsed]=useState(false);
 const [jokerItem,setJokerItem]=useState(null);
 const [touchStartX,setTouchStartX]=useState(null);
 const [showSplash,setShowSplash]=useState(true);
 const [soundEnabled,setSoundEnabled]=useState(true);

 const cuisine=cuisines.find(c=>c.id===selected);
 const chosen=dish&&dishes[category].find(d=>d.id===dish);
 const activeAisle=aisles.find(a=>a.id===aisle);
 const activeAisleIndex=aisles.findIndex(a=>a.id===aisle);
 const aisleProducts=activeAisle?activeAisle.products:[];
 const total=basket.reduce((sum,i)=>sum+(prices[i]||0),0);
 const questions=chosen?quizBank[chosen.id]||[]:[];
 const quizScore=questions.length?Math.round((quizAnswers.filter((answer,i)=>answer===questions[i]?.a).length/questions.length)*100):0;
 const finalScore=shoppingScore===null?0:Math.round((shoppingScore+quizScore)/2);
 const categoryStats=Object.fromEntries(categories.map(c=>{
  const allScores=dishes[c.id].map(d=>typeof progress[d.id]?.best==="number"?progress[d.id].best:0);
  const completed=allScores.filter(v=>v>0).length;
  const score=Math.round(allScores.reduce((a,b)=>a+b,0)/dishes[c.id].length);
  return [c.id,{completed,total:dishes[c.id].length,score}];
 }));
 const allDishIds=Object.values(dishes).flat().map(d=>d.id);
 const allScores=allDishIds.map(id=>typeof progress[id]?.best==="number"?progress[id].best:0);
 const completedTotal=allScores.filter(v=>v>0).length;
 const turkishScore=Math.round(allScores.reduce((a,b)=>a+b,0)/allDishIds.length);

 useEffect(()=>{
  const timer=setTimeout(()=>setShowSplash(false),1400);
  return ()=>clearTimeout(timer);
 },[]);

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

 const playSound=(type)=>{
  if(!soundEnabled||typeof window==="undefined")return;
  try{
   const AudioCtx=window.AudioContext||window.webkitAudioContext;
   if(!AudioCtx)return;
   const ctx=new AudioCtx();
   const patterns={
    add:[[660,0],[880,.07]],
    remove:[[360,0]],
    success:[[523,0],[659,.09],[784,.18]],
    fail:[[240,0],[180,.12]],
    joker:[[740,0],[988,.08],[1174,.16]],
    tap:[[500,0]]
   };
   (patterns[type]||patterns.tap).forEach(([freq,delay])=>{
    const osc=ctx.createOscillator();
    const gain=ctx.createGain();
    osc.type="sine";
    osc.frequency.value=freq;
    gain.gain.setValueAtTime(.0001,ctx.currentTime+delay);
    gain.gain.exponentialRampToValueAtTime(.08,ctx.currentTime+delay+.01);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+delay+.11);
    osc.connect(gain);gain.connect(ctx.destination);
    osc.start(ctx.currentTime+delay);osc.stop(ctx.currentTime+delay+.12);
   });
   setTimeout(()=>ctx.close(),450);
  }catch{}
 };

 const toggle=i=>setBasket(b=>{
  const removing=b.includes(i);
  playSound(removing?"remove":"add");
  return removing?b.filter(x=>x!==i):[...b,i];
 });

 const chooseDish=id=>{
  setDish(id);setBasket([]);setAisle(null);setStage("market");setShoppingScore(null);setQuizIndex(0);setQuizAnswers([]);setMarketMessage("");setJokerUsed(false);setJokerItem(null);setTouchStartX(null);
 };

 const resetBack=()=>{
  if(stage==="quiz"||stage==="final"){setStage("market");setQuizIndex(0);setQuizAnswers([]);return}
  if(dish){setDish(null);setBasket([]);setAisle(null);setShoppingScore(null);setMarketMessage("");setJokerUsed(false);setJokerItem(null);return}
  if(category){setCategory(null);return}
  setSelected(null);
 };

 const finishShopping=()=>{
  if(!basket.length){setMarketMessage("Sepetin boş. Önce gerekli olduğunu düşündüğün ürünleri seç.");return}
  const correctPicked=basket.filter(i=>chosen.ingredients.includes(i)).length;
  const wrongPicked=basket.filter(i=>!chosen.ingredients.includes(i)).length;
  const unionCount=chosen.ingredients.length+wrongPicked;
  const jokerHalfPoint=jokerItem&&basket.includes(jokerItem)?0.5:0;
  const weightedCorrect=Math.max(0,correctPicked-jokerHalfPoint);
  const score=Math.round((weightedCorrect/unionCount)*100);
  setShoppingScore(score);
  if(score>=70){
   playSound("success");
   setMarketMessage("");
   setAisle(null);
   setStage("quiz");
  }else{
   playSound("fail");
   setMarketMessage(`Alışveriş puanın %${score}. Pişirme etabına geçmek için en az %70 gerekiyor.`);
  }
 };

 const retryShopping=()=>{setBasket([]);setShoppingScore(null);setMarketMessage("");setJokerUsed(false);setJokerItem(null)};

 const useJoker=()=>{
  if(jokerUsed||!chosen)return;
  const missing=chosen.ingredients.filter(i=>!basket.includes(i));
  if(!missing.length){setMarketMessage("Tüm doğru ürünleri zaten bulmuş görünüyorsun; jokerini sakla.");return}
  const item=missing[0];
  playSound("joker");
  setJokerUsed(true);
  setJokerItem(item);
  setBasket(b=>b.includes(item)?b:[...b,item]);
  const targetAisle=aisles.find(a=>a.products.includes(item));
  if(targetAisle)setAisle(targetAisle.id);
  setMarketMessage(`🃏 Joker sana bir doğru ürün verdi: ${item}. Bu ürün alışveriş skorunda yarım doğru sayılacak.`);
 };

 const changeAisle=dir=>{
  if(activeAisleIndex<0)return;
  const next=(activeAisleIndex+dir+aisles.length)%aisles.length;
  setAisle(aisles[next].id);
 };

 const handleTouchStart=e=>setTouchStartX(e.touches[0]?.clientX??null);
 const handleTouchEnd=e=>{
  if(touchStartX===null)return;
  const endX=e.changedTouches[0]?.clientX??touchStartX;
  const delta=endX-touchStartX;
  if(Math.abs(delta)>55)changeAisle(delta<0?1:-1);
  setTouchStartX(null);
 };

 const questionShift=chosen?((quizIndex+chosen.id.length)%3):0;
 const shownOptions=questions[quizIndex]?questions[quizIndex].o.map((_,i)=>questions[quizIndex].o[(i+questionShift)%3]):[];
 const shownCorrectIndex=questions[quizIndex]?((questions[quizIndex].a-questionShift+3)%3):0;

 const answerQuiz=answer=>{
  playSound("tap");
  const next=[...quizAnswers];
  next[quizIndex]=answer===shownCorrectIndex?questions[quizIndex].a:-1;
  setQuizAnswers(next);
  if(quizIndex===questions.length-1)setStage("final");
  else setQuizIndex(i=>i+1);
 };

 const restartDish=()=>chooseDish(chosen.id);

 if(showSplash)return <div className="splashScreen"><img src="/splash-screen.svg" alt="Who Is the Chef?"/></div>;

 return <main>
 <header className="topbar"><div className="brand"><img src="/app-icon.svg" alt=""/><span>Who Is the Chef?</span></div><div className="topActions"><button className="soundToggle" onClick={()=>setSoundEnabled(v=>!v)} aria-label="Sesi aç veya kapat">{soundEnabled?"🔊":"🔇"}</button><div className="badge">{stage==="market"?"🛒 Alışveriş":stage==="quiz"?"🍳 Pişirme":"🏆 Sonuç"}</div></div></header>
 <section className="hero">
 {!selected?<><div className="eyebrow">MUTFAK MACERASI</div><h1>Bugün hangi mutfakta<br/><em>şef olacaksın?</em></h1><p>Doğru malzemeleri bul, alışveriş barajını geç ve ardından aşçılık bilgini kanıtla.</p><div className="cards">{cuisines.map(c=><button disabled={c.locked} key={c.id} className={"cuisine "+(c.locked?"locked":"")} onClick={()=>!c.locked&&setSelected(c.id)}><div className={"flag "+c.color}>{c.flag}</div><h2>{c.title}</h2><p>{c.text}</p><span>{c.locked?"🔒 Yakında":"Mutfağı seç →"}</span></button>)}</div></>
 :!category?<><button className="back" onClick={resetBack}>← Mutfaklara dön</button><div className="eyebrow">{cuisine.flag} TÜRK MUTFAĞI</div><h1>Şeflik <em>yolculuğun.</em></h1><p>Her yemeğin en iyi puanı kaydedilir. Yemekleri tamamladıkça kategori ustalığın ve Türk Mutfağı Şeflik Puanın oluşur.</p>
 <div className="masteryHero"><div><span>🇹🇷 TÜRK MUTFAĞI ŞEFLİK PUANI</span><strong>{turkishScore}<small>/100</small></strong><p>{completedTotal}/30 yemek tamamlandı{completedTotal<30?" · 30/30 tamamlanınca tam karnen hazır.":" · Türk Mutfağı karnen tamamlandı!"}</p></div><div className="masteryRing" style={{"--score":turkishScore}}><b>{turkishScore}%</b></div></div>
 <div className="cards categories masteryCards">{categories.map(c=>{const st=categoryStats[c.id];return <button key={c.id} className="cuisine category" onClick={()=>setCategory(c.id)}><div className="food">{c.icon}</div><h2>{c.title} Ustalığı</h2><div className="categoryScore"><b>{st.score}</b><span>/100</span></div><p>{st.completed}/{st.total} yemek tamamlandı</p><div className="miniProgress"><i style={{width:`${(st.completed/st.total)*100}%`}}/></div><span>{st.completed===st.total?"🏅 Ustalık tamamlandı":"Devam et →"}</span></button>})}</div></>
 :!dish?<><button className="back" onClick={resetBack}>← Kategorilere dön</button><div className="eyebrow">{categories.find(c=>c.id===category).icon} {categories.find(c=>c.id===category).title.toUpperCase()} USTALIĞI · {categoryStats[category].completed}/10</div><h1>Yemeğini <em>seç.</em></h1><p>Malzeme listesi verilmeyecek. Her yemeğin en iyi sonucu kategori ustalık puanına eklenir.</p><div className="cards">{dishes[category].map(d=>{const saved=progress[d.id];return <button key={d.id} className="cuisine dish" onClick={()=>chooseDish(d.id)}><div className="food">{d.emoji}</div><h2>{d.name}</h2><p>⏱ {d.time} · 🎯 {d.difficulty}</p>{saved&&<div className="dishBest">🏆 En iyi: <b>{saved.best}/100</b><small>{saved.attempts} deneme</small></div>}<span>{saved?"Puanını yükselt →":"Teste başla →"}</span></button>})}</div></>
 :stage==="market"?<><button className="back" onClick={resetBack}>← Yemeklere dön</button><div className="eyebrow">1. ETAP · 🛒 ALIŞVERİŞ</div><h1><em>{chosen.name}</em> için alışveriş</h1><p>Malzeme listesi yok. Bu yemeğin gerektirdiğini düşündüğün ürünleri doğru reyonlardan bulup sepete ekle. Gereksiz ürünler puanını düşürür.</p>
 <div className="game"><aside className="recipe"><div className="bigfood">{chosen.emoji}</div><h2>{chosen.name}</h2><p>Bilgine güven ve alışverişini tamamla.</p><div className="itemCountHint">🧺 Bu yemek için toplam <b>{chosen.ingredients.length} ürün</b> almalısın.</div><div className="hint neutral">🎯 Pişirme etabına geçiş barajı: <b>%70</b></div><button className={"jokerButton "+(jokerUsed?"used":"")} onClick={useJoker} disabled={jokerUsed}>{jokerUsed?"🃏 Joker kullanıldı":"🃏 1 Joker Kullan"}</button>{jokerItem&&<div className="jokerReveal">Gösterilen ürün: <b>{jokerItem}</b><small>Skorda yarım doğru sayılır.</small></div>}<div className="scoreformula">Doğru seçimler puanı yükseltir.<br/>Gereksiz ürünler puanı düşürür.</div></aside>
 <div className="market">{!aisle?<><div className="maphead"><div><h2>🏪 Who Is the Chef? Marketi</h2><p className="marketnote">İlk reyonunu seç. İçeri girdikten sonra reyonlar arasında sağa/sola kaydırarak dolaşacaksın.</p></div><div className="maptotal">🛒 {basket.length}/{chosen.ingredients.length} ürün · <b>₺{total}</b></div></div><div className="storemap"><div className="entrance">🚪 GİRİŞ<br/><small>Buradasın 👨‍🍳</small></div><div className="mapgrid">{aisles.map((a,n)=><button className={"mapaisle map"+n} key={a.id} onClick={()=>setAisle(a.id)}><b>{a.icon}</b><span>{a.name}</span><small>Reyona gir</small></button>)}</div><div className="checkout">🧾 KASA <span>Sepet ₺{total}</span></div></div></>:<div className="aisleView" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}><div className="aisleNav"><button onClick={()=>changeAisle(-1)} aria-label="Önceki reyon">‹</button><div><h2>{activeAisle.icon} {activeAisle.name}</h2><span>{activeAisleIndex+1}/{aisles.length} reyon</span></div><button onClick={()=>changeAisle(1)} aria-label="Sonraki reyon">›</button></div><p className="swipeHint">← Sağa / sola kaydırarak diğer reyona geç →</p><p className="marketnote">Bu reyondan gerekli olduğunu düşündüğün ürünleri seç.</p><div className="shelf">{aisleProducts.map(i=><button key={i} draggable onDragStart={e=>e.dataTransfer.setData("text/plain",i)} onClick={()=>toggle(i)} className={basket.includes(i)?"product selected":"product"}><span>{basket.includes(i)?"✓":"+"}</span><strong>{i}</strong><em>≈ ₺{prices[i]||0}</em><small>Sürükle veya dokun</small></button>)}</div></div>}
 <div className="basket dropbasket" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const i=e.dataTransfer.getData("text/plain");if(i&&!basket.includes(i))setBasket(b=>[...b,i])}}><div>🛒 Sepet: <b>{basket.length}/{chosen.ingredients.length} ürün</b></div><div className="basketprice">Yaklaşık toplam <b>₺{total}</b></div><small>Fiyatlar oyun içi yaklaşık değerlerdir.</small></div>
 <button className="primaryAction" onClick={finishShopping}>Alışverişi tamamla ve kasaya git →</button>
 {marketMessage&&<div className="result bad">{marketMessage}<button className="retry" onClick={retryShopping}>Sepeti boşaltıp tekrar dene</button></div>}
 </div></div></>
 :stage==="quiz"?<><div className="eyebrow">2. ETAP · 🍳 PİŞİRME BİLGİSİ</div><h1><em>{chosen.name}</em> ustası mısın?</h1><p>Alışveriş barajını geçtin: <b>%{shoppingScore}</b>. Şimdi 5 soruluk, 3 seçenekli mini quiz var.</p>
 <div className="quizWrap"><div className="quizProgress"><span>Soru {quizIndex+1}/5</span><div><i style={{width:`${((quizIndex+1)/5)*100}%`}}/></div></div><div className="quizCard"><div className="quizEmoji">{chosen.emoji}</div><h2>{questions[quizIndex].q}</h2><div className="answers">{shownOptions.map((o,i)=><button key={o} onClick={()=>answerQuiz(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div></div></div></>
 :<><div className="eyebrow">🏆 ŞEFLİK KARNESİ</div><h1><em>{chosen.name}</em> sonucun</h1><p>Hem alışveriş bilgisi hem de pişirme bilgisi birlikte değerlendirildi.</p>
 <div className="finalCard"><div className="finalFood">{chosen.emoji}</div><h2>{chosen.name}</h2><div className="scoreGrid"><div><span>🛒 Alışveriş</span><strong>%{shoppingScore}</strong></div><div><span>🍳 Pişirme Quiz</span><strong>%{quizScore}</strong></div></div><div className="average"><span>BU DENEME</span><strong>{finalScore}<small>/100</small></strong></div><div className="savedScore"><span>🏆 Kaydedilen en iyi puan</span><b>{Math.max(progress[chosen.id]?.best??0,finalScore)}/100</b></div><p>{finalScore>=90?"🏅 Usta şef!":finalScore>=75?"👏 Gayet iyi bir aşçılık bilgisi.":finalScore>=60?"👍 Temel bilgin iyi, biraz daha pratikle yükselir.":"📚 Bu yemek için biraz daha mutfak çalışması gerekiyor."}</p><div className="masteryMini"><b>{categories.find(c=>c.id===category).title} Ustalığı</b><span>{categoryStats[category].score??finalScore}/100 · {Math.max(categoryStats[category].completed,progress[chosen.id]?categoryStats[category].completed:categoryStats[category].completed+1)}/10 yemek</span></div><div className="finalActions"><button className="secondaryAction" onClick={()=>{setDish(null);setStage("market");setBasket([])}}>Başka yemek seç</button><button className="primaryAction" onClick={restartDish}>Tekrar oyna</button></div></div></>}
 </section><footer><span>🛒 Bilgini alışverişte göster</span><span>🍳 5 soruda aşçılığını test et</span><span>🏆 Ortalama puanını gör</span></footer></main>
}