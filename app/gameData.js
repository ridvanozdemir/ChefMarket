
export const cuisines=[
{id:"tr",flag:"🇹🇷",title:"Türk Mutfağı",text:"Çorba, ana yemek ve tatlılarla bilgini test et.",color:"red"},
{id:"it",flag:"🇮🇹",title:"İtalyan Mutfağı",text:"Yakında açılacak.",color:"green",locked:true},
{id:"kr",flag:"🇰🇷",title:"Kore Mutfağı",text:"Yakında açılacak.",color:"blue",locked:true}
];

export const categories=[
{id:"soup",icon:"🥣",title:"Çorba",text:"Çorba bilgini test et"},
{id:"main",icon:"🍲",title:"Ana Yemek",text:"Ana yemeklerde ne kadar iyisin?"},
{id:"dessert",icon:"🍰",title:"Tatlı",text:"Tatlı ustalığını göster"}
];

export const aisles=[
{id:"produce",icon:"🥕",name:"Manav",products:["Soğan","Havuç","Domates","Biber","Patlıcan","Limon","Sarımsak","Maydanoz","Patates","Salatalık","Kabak","Kereviz","Pırasa"]},
{id:"meat",icon:"🥩",name:"Kasap",products:["Kıyma","Dana kuşbaşı","Tavuk","Dana işkembe","Kuzu eti"]},
{id:"dairy",icon:"🥛",name:"Süt & Kahvaltı",products:["Süt","Yoğurt","Tereyağı","Yumurta","Kaşar","Beyaz peynir"]},
{id:"pantry",icon:"🌾",name:"Bakliyat & Tahıl",products:["Kırmızı mercimek","Bulgur","Pirinç","Kuru fasulye","Nohut","İrmik","Un","Nişasta","Makarna","Arpa şehriye","Tel şehriye","Buğday","Tarhana","Maya"]},
{id:"grocery",icon:"🫙",name:"Temel Gıda",products:["Şeker","Tuz","Domates salçası","Biber salçası","Vanilya","Nane","Karabiber","Pul biber","Tarçın","Çam fıstığı","Antep fıstığı","Fındık","Ceviz","Kuş üzümü","Zeytin","Sıvı yağ","Zeytinyağı"]},
{id:"bakery",icon:"🥖",name:"Hamur & Yufka",products:["Baklavalık yufka","Güllaç yaprağı","Ekmek"]},
{id:"other",icon:"🧺",name:"Diğer",products:["Krema","Mantar","Su","Asma yaprağı","Gül suyu"]}
];

const q=(question,a,b,c)=>({q:question,o:[a,b,c],a:0});
const dish=(id,emoji,name,difficulty,time,ingredients,quiz)=>({id,emoji,name,difficulty,time,ingredients,quiz});

export const dishes={
soup:[
dish("mercimek","🥣","Mercimek Çorbası","Kolay","35 dk",["Kırmızı mercimek","Soğan","Havuç","Un","Tereyağı","Tuz"],[
q("Mercimek çorbasında mercimeğe ilk olarak ne yapılır?","Yıkanıp süzülür","Şekerle ovulur","Fırında kızartılır"),
q("Un kullanılacaksa klasik yöntemde nasıl hazırlanır?","Yağda kısa süre kavrulur","Çiğ olarak en son serpilir","Soğuk suda bekletilir"),
q("Çorbayı pürüzsüz hale getirmek için hangi işlem yapılır?","Blenderdan geçirilir","Dondurulur","Süzmeden bekletilir"),
q("Çorba fazla koyu olursa ne yapılır?","Sıcak su eklenir","Un eklenir","Pirinç eklenir"),
q("Servis öncesinde kıvam ve lezzet için son kontrol hangisidir?","Tuz ve kıvam kontrolü","Şeker oranı","Hamur sertliği")
]),
dish("ezogelin","🍲","Ezogelin Çorbası","Orta","40 dk",["Kırmızı mercimek","Bulgur","Pirinç","Soğan","Domates salçası","Nane"],[
q("Ezogelin çorbasının ayırt edici tahıl birlikteliği hangisidir?","Mercimek, bulgur ve pirinç","Nohut ve makarna","Fasulye ve irmik"),
q("Salça klasik hazırlamada genellikle ne zaman eklenir?","Soğan kavrulduktan sonra","Servisten sonra","Pirinç tamamen soğuyunca"),
q("Tahılların pişmiş olduğunu nasıl anlarsın?","İyice yumuşamış olmalarından","Renklerinin beyaza dönmesinden","Tamamen kurumasından"),
q("Ezogeline karakteristik aroma veren baharat hangisidir?","Nane","Tarçın","Vanilya"),
q("Çorba fazla koyuysa en uygun düzeltme nedir?","Sıcak su eklemek","Daha çok bulgur eklemek","Uzun süre açıkta bekletmek")
]),
dish("yayla","🥛","Yayla Çorbası","Orta","35 dk",["Yoğurt","Pirinç","Yumurta","Un","Tereyağı","Nane"],[
q("Yayla çorbasının terbiyesinde temel olarak hangileri kullanılır?","Yoğurt, yumurta ve un","Salça, şeker ve süt","Kıyma, bulgur ve un"),
q("Terbiyenin kesilmemesi için sıcak çorbadan terbiyeye azar azar ekleme işlemine ne denir?","Ilıştırma","Karamelizasyon","Mühürleme"),
q("Yayla çorbasında pirinç ne hale gelene kadar pişirilir?","Yumuşayana kadar","Kıtır kalana kadar","Kavrulana kadar"),
q("Yoğurtlu terbiye eklendikten sonra hangi yaklaşım daha uygundur?","Kontrollü ve karıştırarak ısıtmak","En yüksek ateşte bırakmak","Hemen buz eklemek"),
q("Klasik yayla çorbasında nane çoğunlukla nasıl eklenir?","Tereyağında kızdırılarak","Şekerle kaynatılarak","Çiğ hamura karıştırılarak")
]),
dish("tarhana","🥣","Tarhana Çorbası","Kolay","25 dk",["Tarhana","Domates salçası","Tereyağı","Nane","Su","Tuz"],[
q("Tarhana çorbasında topaklanmayı önlemek için tarhana genellikle nasıl hazırlanır?","Soğuk suyla açılır","Kızgın yağa direkt atılır","Şekerle karıştırılır"),
q("Tarhana tencereye eklendikten sonra en önemli işlem hangisidir?","Sürekli karıştırmak","Hiç karıştırmamak","Kapağı hiç açmamak"),
q("Salça kullanılacaksa genellikle nasıl hazırlanır?","Yağda kısa süre kavrulur","Çiğ olarak servis tabağına konur","Sütle dondurulur"),
q("Tarhana çorbasının kıvamı çok koyu olursa ne yapılır?","Sıcak su eklenir","Daha çok tarhana eklenir","Un eklenir"),
q("Servis öncesi hangi kontrol yapılmalıdır?","Tuz ve kıvam kontrolü","Şeker oranı kontrolü","Hamur elastikiyeti")
]),
dish("domates_corbasi","🍅","Domates Çorbası","Kolay","30 dk",["Domates","Un","Tereyağı","Süt","Tuz","Karabiber"],[
q("Domates çorbasında domatesler temel olarak nasıl kullanılır?","Rendelenip veya ezilip pişirilir","Bütün halde dondurulur","Şekerle kurutulur"),
q("Unlu taban hazırlanırken un ne yapılır?","Yağda kokusu çıkana kadar kavrulur","Çiğ halde tabağa serpilir","Suda bekletilir"),
q("Süt eklenecekse kesilmemesi için neye dikkat edilir?","Isı farkını kontrollü azaltmaya","Sütü dondurmaya","En yüksek ateşe çıkmaya"),
q("Pürüzsüz kıvam için hangi araç kullanılabilir?","Blender","Merdane","Süzgeçsiz bekletme"),
q("Çorba servisinde yaygın eşlikçilerden biri hangisidir?","Rendelenmiş kaşar","Şerbet","Çiğ bulgur")
]),
dish("tavuk_suyu","🍗","Tavuk Suyu Çorbası","Orta","50 dk",["Tavuk","Arpa şehriye","Havuç","Limon","Yumurta","Un"],[
q("Tavuk suyu çorbasında lezzetin temeli nasıl elde edilir?","Tavuğu haşlayarak","Tavuğu şekerleyerek","Tavuğu dondurarak"),
q("Haşlanan tavuk çorbaya nasıl geri eklenir?","Didiklenerek","Bütün halde kemikleriyle","Çiğ olarak"),
q("Şehriye ne zaman eklenir?","Sıcak tavuk suyuna","Servisten sonra","Soğuk tencereye en son"),
q("Limonlu-yumurtalı terbiye kullanılacaksa nasıl eklenir?","Ilıştırılarak","Donmuş halde","Kızgın yağda yakılarak"),
q("Terbiye sonrası çorba nasıl ısıtılmalıdır?","Kontrollü ve karıştırılarak","Şiddetle taşırılarak","Soğuk bırakılarak")
]),
dish("dugun","🍖","Düğün Çorbası","Orta","55 dk",["Kuzu eti","Yoğurt","Yumurta","Un","Tereyağı","Pul biber"],[
q("Düğün çorbasında et genellikle nasıl hazırlanır?","Haşlanıp didiklenir","Çiğ doğranıp servis edilir","Şekerle marine edilir"),
q("Çorbanın terbiyesinde hangileri bulunur?","Yoğurt, yumurta ve un","Pirinç, kakao ve süt","Salça ve şeker"),
q("Terbiyenin kesilmemesi için ne yapılır?","Sıcak suyla ılıştırılır","Buz eklenir","En yüksek ateşte dökülür"),
q("Düğün çorbasının üzerine hangi sos yakışır?","Tereyağlı pul biber","Vanilyalı krema","Karamel"),
q("Et çorbaya hangi aşamada eklenir?","Haşlanmış halde pişirme sırasında","Tatlı servisi sonrası","Çiğ olarak tabakta")
]),
dish("sehriye","🍜","Şehriye Çorbası","Kolay","25 dk",["Tel şehriye","Domates","Domates salçası","Tereyağı","Limon","Maydanoz"],[
q("Şehriye çorbasında salça ne zaman eklenir?","Yağda kısa süre kavrulduktan sonra","Servisten sonra","Soğuk suda bekletildikten sonra"),
q("Şehriye ne zaman tencereye girer?","Kaynamakta olan sıvıya","Servis tabağına","Dondurucuya"),
q("Şehriyenin piştiği nasıl anlaşılır?","Yumuşamasından","Kararmasından","Tamamen erimesinden"),
q("Çorba bekledikçe neden koyulaşabilir?","Şehriye sıvı çektiği için","Tereyağı buharlaştığı için","Limon donduğu için"),
q("Serviste ferahlık vermek için hangisi kullanılabilir?","Limon","Şeker şurubu","Kakao")
]),
dish("iskembe","🥣","İşkembe Çorbası","Zor","90 dk",["Dana işkembe","Sarımsak","Limon","Yumurta","Un","Tereyağı"],[
q("İşkembe çorbasında en önemli ön hazırlıklardan biri nedir?","İşkembeyi çok iyi temizlemek","İşkembeyi şekerlemek","İşkembeyi çiğ bırakmak"),
q("İşkembe temel olarak nasıl pişirilir?","Uzun süre haşlanarak","Hızlıca dondurularak","Şekerli suda bekletilerek"),
q("Klasik terbiyede hangileri kullanılabilir?","Yumurta, un ve limon","Kakao ve süt","Salça ve bulgur"),
q("Terbiyeyi eklerken ne yapılmalıdır?","Sıcak çorbayla ılıştırılmalıdır","Donmuş halde eklenmelidir","Kızgın yağda yakılmalıdır"),
q("Serviste işkembeye sık eşlik eden ikili hangisidir?","Sarımsak ve limon","Bal ve tarçın","Yoğurt ve reçel")
]),
dish("sebze","🥕","Sebze Çorbası","Kolay","40 dk",["Havuç","Patates","Kabak","Pırasa","Kereviz","Tereyağı"],[
q("Sebze çorbasında sebzelerin eşit pişmesi için ne yapılır?","Benzer büyüklükte doğranır","Bütün bırakılır","Dondurulur"),
q("Sert sebzeler genellikle ne zaman eklenir?","Daha erken","Servisten sonra","En son ve çiğ"),
q("Sebzeler pişerken temel amaç nedir?","Yumuşayıp lezzetlerini suya vermeleri","Tamamen kurutulmaları","Şekerlenmeleri"),
q("Pürüzsüz sebze çorbası için hangi işlem yapılabilir?","Blenderdan geçirmek","Merdaneyle açmak","Fırında kurutmak"),
q("Servis öncesi en önemli son kontrol hangisidir?","Tuz ve kıvam","Şeker kristali","Hamur mayası")
])
],
main:[
dish("karniyarik","🍆","Karnıyarık","Orta","60 dk",["Patlıcan","Kıyma","Soğan","Domates","Biber","Domates salçası"],[
q("Karnıyarıkta patlıcan neden boydan yarılır?","İç harca yer açmak için","Çekirdeklerini kurutmak için","Kabuklarını tamamen ayırmak için"),
q("İç harç hazırlanırken kıyma ve soğana ne yapılır?","Kavrulur","Dondurulur","Haşlanmadan çiğ bırakılır"),
q("Patlıcanlar iç harçtan önce genellikle nasıl hazırlanır?","Yumuşatılıp kızartılır veya fırınlanır","Şekerli suda haşlanır","Çiğ olarak doldurulur"),
q("Harç patlıcanın neresine konur?","Açılan orta kısmına","Sapının dışına","Kabuk altına enjekte edilir"),
q("Doldurulan karnıyarık son olarak genellikle ne yapılır?","Fırında pişirilir","Dondurucuda bekletilir","Soğuk servis edilir")
]),
dish("manti","🥟","Mantı","Zor","75 dk",["Un","Yumurta","Kıyma","Soğan","Yoğurt","Sarımsak"],[
q("Mantı hamuru açıldıktan sonra nasıl şekillendirilir?","Küçük karelere kesilir","Uzun şerit halinde bırakılır","Yuvarlak kek kalıbına alınır"),
q("Klasik mantıda iç harç nereye konur?","Hamur karelerinin ortasına","Yoğurdun içine","Haşlama suyuna"),
q("Mantı parçaları kapatıldıktan sonra temel pişirme yöntemi nedir?","Suda haşlamak","Kömürde közlemek","Buharda kek gibi pişirmek"),
q("Klasik mantının temel soslarından biri hangisidir?","Sarımsaklı yoğurt","Vanilyalı krema","Limonlu şerbet"),
q("Mantının üst sosunda tereyağı çoğunlukla neyle aromalandırılır?","Pul biber veya kırmızı biber","Kakao","Tarçın ve şeker")
]),
dish("kuru","🫘","Kuru Fasulye","Orta","70 dk",["Kuru fasulye","Soğan","Domates salçası","Tereyağı","Tuz","Su"],[
q("Kuru fasulyeyi pişirmeden önce uygulanan yaygın hazırlık nedir?","Suda bekletmek","Şekerle ovmak","Fırında kurutmak"),
q("Yemeğin lezzet tabanı için önce ne kavrulur?","Soğan","Yoğurt","Pirinç"),
q("Domates salçası ne zaman eklenir?","Soğan kavrulduktan sonra","Servisten sonra","Fasulye tamamen soğuyunca"),
q("Fasulye tencereye girdikten sonra temel pişirme yaklaşımı nedir?","Sıvıyla yumuşayana kadar pişirmek","Susuz yüksek ateşte yakmak","Soğukta dinlendirmek"),
q("Yemeğin pişmişliğini en iyi ne gösterir?","Fasulyelerin yumuşaması","Suyun tamamen yok olması","Soğanın kıtır kalması")
]),
dish("imam_bayildi","🍆","İmam Bayıldı","Orta","65 dk",["Patlıcan","Soğan","Domates","Sarımsak","Zeytinyağı","Maydanoz"],[
q("İmam bayıldının temel farklarından biri hangisidir?","Zeytinyağlı ve kıymasız olması","Şerbetli tatlı olması","Pirinçle haşlanması"),
q("Patlıcanlar iç harçtan önce nasıl hazırlanır?","Yumuşatılır veya kızartılır","Şekerle haşlanır","Çiğ bırakılır"),
q("İç harcın ana sebzelerinden biri hangisidir?","Soğan","Kereviz sapı şurubu","Kakao"),
q("Yemek doldurulduktan sonra genellikle ne yapılır?","Kısık ateşte veya fırında pişirilir","Dondurulur","Çiğ servis edilir"),
q("İmam bayıldı çoğunlukla nasıl servis edilir?","Ilık veya soğuk","Kaynar şerbet içinde","Donmuş")
]),
dish("hunkar_begendi","🥘","Hünkar Beğendi","Zor","80 dk",["Patlıcan","Dana kuşbaşı","Süt","Un","Tereyağı","Kaşar"],[
q("Hünkar beğendinin 'beğendi' kısmının temeli nedir?","Közlenmiş patlıcan","Haşlanmış pirinç","Mercimek püresi"),
q("Patlıcanlar beğendi için nasıl hazırlanır?","Közlenir","Şekerlenir","Çiğ rendelenir"),
q("Beğendi kıvamı için hangi teknik kullanılır?","Un ve yağla roux benzeri taban hazırlanır","Şerbet kaynatılır","Hamur mayalanır"),
q("Et kısmında dana kuşbaşı nasıl hazırlanır?","Sotelenip yumuşayana kadar pişirilir","Çiğ bırakılır","Şekerle karamelleştirilir"),
q("Serviste et nereye konur?","Patlıcan beğendinin üzerine","Tatlı tabağının altına","Yoğurdun içine")
]),
dish("tas_kebabi","🥩","Tas Kebabı","Orta","75 dk",["Dana kuşbaşı","Soğan","Patates","Havuç","Domates salçası","Tereyağı"],[
q("Tas kebabında et için ilk temel işlem hangisidir?","Mühürleyip kavurmak","Şekerle ovmak","Çiğ servis etmek"),
q("Soğan ne zaman eklenir?","Et renk aldıktan sonra","Servis sonrası","Tatlıdan sonra"),
q("Salça ne amaçla kavrulur?","Çiğ kokusunu gidermek ve lezzet vermek","Tatlandırmak","Kıtırlaştırmak"),
q("Etin yumuşaması için ne gerekir?","Yeterli sıvı ve kontrollü pişirme","Dondurma","Susuz yüksek ateş"),
q("Patates ve havuç neden çok erken eklenmez?","Dağılmamaları için","Şekerlenmeleri için","Renklerini tamamen kaybetmeleri için")
]),
dish("izmir_kofte","🍽️","İzmir Köfte","Orta","70 dk",["Kıyma","Patates","Soğan","Domates","Biber","Domates salçası"],[
q("İzmir köftenin köfteleri genellikle nasıl şekillendirilir?","Uzun-oval şekilde","Çok ince yufka gibi","Sıvı halde"),
q("Patatesler köfteyle birlikte nasıl hazırlanır?","Dilimlenip ön kızartma veya fırınlama yapılır","Çiğ rendelenip tatlı yapılır","Haşlanmadan bütün bırakılır"),
q("Yemeğin sosunun temelinde ne bulunur?","Domates ve salça","Süt ve vanilya","Şeker şurubu"),
q("Köfte ve patatesler son aşamada nerede birleşir?","Fırın kabında","Dondurucuda","Salata kasesinde"),
q("Pişirme sonunda hedef nedir?","Köftenin pişmesi ve sosun bütünleşmesi","Yemeğin tamamen kuruması","Patatesin çiğ kalması")
]),
dish("nohut","🫘","Etli Nohut","Orta","80 dk",["Nohut","Dana kuşbaşı","Soğan","Domates salçası","Tereyağı","Su"],[
q("Nohut için yaygın ön hazırlık nedir?","Bir gece suda bekletmek","Şekerle kaplamak","Fırında kurutmak"),
q("Etli nohutta et ne yapılır?","Kavrulup pişirilir","Çiğ servis edilir","Dondurulur"),
q("Soğan ve salça hangi amaçla kavrulur?","Lezzet tabanı oluşturmak için","Tatlılaştırmak için","Soğutmak için"),
q("Nohut ne zamana kadar pişirilir?","Yumuşayana kadar","Tamamen dağılana kadar","Kıtır kalana kadar"),
q("Yemeğin suyunu ayarlarken amaç nedir?","Sulu ama dengeli kıvam","Tamamen susuz bırakmak","Şerbet kıvamı")
]),
dish("yaprak_sarma","🍃","Zeytinyağlı Yaprak Sarma","Zor","90 dk",["Asma yaprağı","Pirinç","Soğan","Zeytinyağı","Çam fıstığı","Kuş üzümü"],[
q("Salamura yapraklar kullanılmadan önce ne yapılır?","Tuzu azaltmak için yıkanıp bekletilir","Şekerlenir","Fırında kurutulur"),
q("İç harcın ana tahılı hangisidir?","Pirinç","İrmik","Makarna"),
q("Sarma yapılırken yaprağın hangi tarafına harç konur?","Damarlı iç yüzüne","Parlak dış yüzüne","Sapın dışına"),
q("Sarmalar tencereye nasıl dizilir?","Sıkı ve düzenli şekilde","Gelişigüzel üst üste atılır","Dondurularak"),
q("Pişirme sırasında dağılmayı önlemek için ne yapılabilir?","Üzerine tabak kapatmak","Sürekli karıştırmak","Kapağı açık bırakmak")
]),
dish("tavuk_sote","🍗","Tavuk Sote","Kolay","35 dk",["Tavuk","Soğan","Biber","Domates","Sıvı yağ","Karabiber"],[
q("Tavuk sotede tavuklar nasıl doğranır?","Kuşbaşı boyutunda","Bütün halde","İnce yufka gibi"),
q("Tavuğun sulanmasını azaltmak için ne yapılır?","Tava iyi ısıtılır","Soğuk su eklenir","Kapak hemen kapatılır"),
q("Sebzeler hangi amaçla sotelenir?","Diriliklerini kısmen koruyarak lezzet vermek","Tamamen kurutmak","Şekerlemek"),
q("Domates ne zaman eklenir?","Tavuk ve biberler renk aldıktan sonra","Servis sonrası","En başta soğuk tavaya"),
q("Tavuğun piştiği nasıl anlaşılır?","İçi pembe kalmayıp tamamen pişince","Dışı soğuk kalınca","Suyu tamamen donunca")
])
],
dessert:[
dish("sutlac","🍚","Sütlaç","Kolay","45 dk",["Süt","Pirinç","Şeker","Nişasta","Vanilya"],[
q("Sütlaçta pirinç ilk olarak genellikle ne yapılır?","Suda yumuşayana kadar pişirilir","Yağda kızartılır","Çiğ halde sütle dondurulur"),
q("Pirinç yumuşadıktan sonra temel sıvı olarak ne eklenir?","Süt","Et suyu","Zeytinyağı"),
q("Şeker hangi amaçla eklenir?","Tatlandırmak için","Koyulaştırmak için tek başına","Pirinci sertleştirmek için"),
q("Nişasta kullanılacaksa topaklanmaması için nasıl eklenmelidir?","Sıvıyla açılarak","Kuru halde tek parça","Dondurularak"),
q("Sütlaç kıvam aldıktan sonra genellikle nasıl servis edilir?","Kaselere alınıp soğutularak","Tavada kızartılarak","Hamur gibi yoğrularak")
]),
dish("revani","🍰","Revani","Orta","55 dk",["İrmik","Un","Yumurta","Yoğurt","Şeker","Limon"],[
q("Revani hamurunun karakteristik malzemesi hangisidir?","İrmik","Kıyma","Mercimek"),
q("Yumurta ve şeker hazırlanırken amaç nedir?","İyice çırpıp karışımı havalandırmak","Yakmak","Dondurmak"),
q("Revani pişirme yöntemi hangisidir?","Fırında pişirme","Suda haşlama","Tavada mühürleme"),
q("Revaniyi karakteristik olarak tamamlayan işlem nedir?","Şerbet dökmek","Sarımsaklı yoğurt eklemek","Salçayla kavurmak"),
q("Şerbetin keke daha iyi geçmesi için neye dikkat edilir?","Kek ve şerbet arasında uygun sıcaklık farkına","İkisinin de donmuş olmasına","Kekin çiğ kalmasına")
]),
dish("irmik","🥄","İrmik Helvası","Kolay","30 dk",["İrmik","Tereyağı","Süt","Şeker","Çam fıstığı"],[
q("İrmik helvasında ilk temel işlem nedir?","İrmiği yağda kavurmak","İrmiği çiğ servis etmek","İrmiği dondurmak"),
q("Kavurma sırasında doğru işaret hangisidir?","İrmiğin renk alıp güzel koku vermesi","Tamamen siyahlaşması","Suyla dolması"),
q("Sütlü karışım kavrulmuş irmiğe nasıl eklenmelidir?","Dikkatlice eklenmelidir","Buz halinde atılmalıdır","Hiç karıştırılmamalıdır"),
q("Sıvı eklendikten sonra helva ne yapana kadar pişirilir?","Sıvıyı çekene kadar","Tamamen sıvı kalana kadar","Donana kadar"),
q("Pişirme bittikten sonra helvaya ne yapmak kıvamı iyileştirir?","Bir süre dinlendirmek","Buzlu suya sokmak","Tekrar çiğ irmik eklemek")
]),
dish("baklava","🥮","Baklava","Zor","120 dk",["Baklavalık yufka","Tereyağı","Antep fıstığı","Şeker","Limon","Su"],[
q("Baklava katları arasında temel olarak ne kullanılır?","Eritilmiş tereyağı","Domates sosu","Yoğurt"),
q("İç harçta klasik seçeneklerden biri hangisidir?","Antep fıstığı","Mercimek","Kıyma"),
q("Baklava fırına girmeden önce nasıl hazırlanır?","Dilimlenir ve yağlanır","Şerbete batırılıp dondurulur","Haşlanır"),
q("Baklavanın iyi piştiğini gösteren işaret nedir?","Katların altın rengi olması","Yufkanın beyaz kalması","Tamamen yumuşak kalması"),
q("Şerbet verirken amaç nedir?","Katları ıslatıp tatlandırmak, hamurlaştırmamak","Baklavayı tuzlamak","Yufkayı çiğ bırakmak")
]),
dish("kazandibi","🍮","Kazandibi","Orta","60 dk",["Süt","Şeker","Nişasta","Tereyağı","Vanilya"],[
q("Kazandibinin temel tatlı tabanı nedir?","Sütlü muhallebi","Et suyu","Şerbetli hamur"),
q("Kıvam vermek için hangi malzeme kullanılabilir?","Nişasta","Kıyma","Bulgur"),
q("Kazandibine adını veren karakteristik özellik nedir?","Tabanının kontrollü biçimde karamelize edilmesi","Üstünün buzlanması","İçine salça konması"),
q("Tabanı yakarken amaç nedir?","Koyu karamel tat ve renk oluşturmak","Tamamen kömürleştirmek","Sütü dondurmak"),
q("Tatlı piştikten sonra nasıl servis edilir?","Soğutulup dilimlenerek","Kaynar halde çorba gibi","Çiğ olarak")
]),
dish("keskul","🥛","Keşkül","Kolay","40 dk",["Süt","Şeker","Nişasta","Fındık","Vanilya"],[
q("Keşkülün temel sıvısı nedir?","Süt","Et suyu","Zeytinyağı"),
q("Keşkülde kıvam için ne kullanılabilir?","Nişasta","Kıyma","Pirinç pilavı"),
q("Karışım pişerken en önemli işlem hangisidir?","Topaklanmaması için karıştırmak","Hiç karıştırmamak","Dondurmak"),
q("Keşkül ne zaman kaselere alınır?","Kıvam aldıktan sonra","Malzemeler çiğken","Donmuş halde"),
q("Servisten önce ne yapılır?","Soğutulur","Fırında yakılır","Yağda kızartılır")
]),
dish("asure","🥣","Aşure","Zor","120 dk",["Buğday","Nohut","Kuru fasulye","Şeker","Kuş üzümü","Fındık"],[
q("Aşurenin ana tahılı hangisidir?","Buğday","Makarna","İrmik"),
q("Nohut ve fasulye için en uygun ön hazırlık nedir?","Önceden ıslatıp haşlamak","Şekerle kızartmak","Çiğ bırakmak"),
q("Aşurede malzemeler birleştirilirken temel amaç nedir?","Kıvam ve lezzeti dengeli birleştirmek","Hepsini kuru bırakmak","Tamamen dondurmak"),
q("Şeker ne zaman eklenir?","Ana malzemeler yumuşadıktan sonra","En başta kuru tencereye","Servisten günler sonra"),
q("Aşure servisinde yaygın uygulama hangisidir?","Üzerini kuru yemişlerle süslemek","Kıyma eklemek","Salça dökmek")
]),
dish("lokma","🍩","Lokma","Orta","70 dk",["Un","Maya","Şeker","Sıvı yağ","Limon","Su"],[
q("Lokma hamurunun kabarmasını ne sağlar?","Maya","Salça","Nişasta tek başına"),
q("Mayalı hamur kızartmadan önce ne yapmalıdır?","Dinlenip kabarmalıdır","Dondurulmalıdır","Tamamen kurutulmalıdır"),
q("Lokmalar nasıl pişirilir?","Kızgın yağda kızartılır","Suda haşlanır","Buharda pişirilir"),
q("Lokmalar kızardıktan sonra ne yapılır?","Şerbete alınır","Yoğurda batırılır","Salçayla karıştırılır"),
q("İyi lokmanın dokusu nasıl olmalıdır?","Dışı çıtır, içi yumuşak","Tamamen taş gibi","İçi çiğ")
]),
dish("gullac","🌙","Güllaç","Kolay","35 dk",["Güllaç yaprağı","Süt","Şeker","Gül suyu","Ceviz"],[
q("Güllaç yapraklarını yumuşatmak için ne kullanılır?","Şekerli ılık süt","Kızgın yağ","Domates suyu"),
q("Sütün çok sıcak olması neye yol açabilir?","Yaprakların fazla erimesine","Yaprakların taşlaşmasına","Tuzlanmasına"),
q("Katlar arasına klasik olarak ne konabilir?","Ceviz","Kıyma","Mercimek"),
q("Gül suyu ne amaçla kullanılır?","Aroma vermek için","Kıvamı katılaştırmak için","Kızartmak için"),
q("Güllaç servis öncesi nasıl bekletilir?","Soğukta dinlendirilir","Fırında kurutulur","Kaynatılır")
]),
dish("sekerpare","🍪","Şekerpare","Orta","65 dk",["Un","İrmik","Yumurta","Tereyağı","Şeker","Limon"],[
q("Şekerpare hamurunda kullanılan karakteristik malzemelerden biri hangisidir?","İrmik","Kıyma","Nohut"),
q("Şekerpareler pişmeden önce nasıl şekillendirilir?","Küçük oval veya yuvarlak parçalar halinde","Sıvı bırakılarak","Yufka gibi çok ince"),
q("Temel pişirme yöntemi hangisidir?","Fırında pişirme","Suda haşlama","Kömürde közleme"),
q("Fırından çıkan şekerpareyi tamamlayan işlem nedir?","Şerbet dökmek","Sarımsaklı yoğurt eklemek","Salçalamak"),
q("Şerbet sonrası ne yapılır?","Tatlı şerbeti çekene kadar dinlendirilir","Hemen dondurulur","Yağda tekrar kızartılır")
])
]};

export const quizBank=Object.fromEntries(Object.values(dishes).flat().map(d=>[d.id,d.quiz]));


export const productIcons={
"Soğan":"🧅","Havuç":"🥕","Domates":"🍅","Biber":"🫑","Patlıcan":"🍆","Limon":"🍋","Sarımsak":"🧄","Maydanoz":"🌿","Patates":"🥔","Salatalık":"🥒","Kabak":"🥒","Kereviz":"🌱","Pırasa":"🥬",
"Kıyma":"🥩","Dana kuşbaşı":"🥩","Tavuk":"🍗","Dana işkembe":"🥩","Kuzu eti":"🍖",
"Süt":"🥛","Yoğurt":"🥣","Tereyağı":"🧈","Yumurta":"🥚","Kaşar":"🧀","Beyaz peynir":"🧀",
"Kırmızı mercimek":"🫘","Bulgur":"🌾","Pirinç":"🍚","Kuru fasulye":"🫘","Nohut":"🫘","İrmik":"🌾","Un":"🌾","Nişasta":"🥣","Makarna":"🍝","Arpa şehriye":"🍜","Tel şehriye":"🍜","Buğday":"🌾","Tarhana":"🥣",
"Şeker":"🍬","Tuz":"🧂","Domates salçası":"🥫","Biber salçası":"🥫","Vanilya":"🌼","Nane":"🌿","Karabiber":"⚫","Pul biber":"🌶️","Tarçın":"🪵","Çam fıstığı":"🌰","Antep fıstığı":"🥜","Fındık":"🌰","Ceviz":"🌰","Kuş üzümü":"🍇","Zeytin":"🫒","Sıvı yağ":"🫗","Zeytinyağı":"🫒",
"Baklavalık yufka":"🫓","Güllaç yaprağı":"🫓","Ekmek":"🍞",
"Krema":"🥛","Mantar":"🍄","Su":"💧","Asma yaprağı":"🍃","Gül suyu":"🌹","Maya":"🧫"
};

export const prices={
"Soğan":12,"Havuç":14,"Domates":22,"Biber":24,"Patlıcan":28,"Limon":10,"Sarımsak":18,"Maydanoz":9,"Patates":18,"Salatalık":16,"Kabak":18,"Kereviz":28,"Pırasa":22,
"Kıyma":185,"Dana kuşbaşı":210,"Tavuk":105,"Dana işkembe":140,"Kuzu eti":230,
"Süt":38,"Yoğurt":55,"Tereyağı":95,"Yumurta":65,"Kaşar":110,"Beyaz peynir":90,
"Kırmızı mercimek":48,"Bulgur":32,"Pirinç":58,"Kuru fasulye":72,"Nohut":60,"İrmik":35,"Un":30,"Nişasta":25,"Makarna":28,"Arpa şehriye":30,"Tel şehriye":30,"Buğday":38,"Tarhana":65,
"Şeker":42,"Tuz":12,"Domates salçası":45,"Biber salçası":48,"Vanilya":12,"Nane":18,"Karabiber":20,"Pul biber":20,"Tarçın":22,"Çam fıstığı":85,"Antep fıstığı":160,"Fındık":120,"Ceviz":110,"Kuş üzümü":65,"Zeytin":70,"Sıvı yağ":75,"Zeytinyağı":150,
"Baklavalık yufka":65,"Güllaç yaprağı":70,"Ekmek":15,
"Krema":42,"Mantar":45,"Su":8,"Asma yaprağı":75,"Gül suyu":35,"Maya":10
};
