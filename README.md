# ChefMarket

Mobil öncelikli yemek bilgisi ve market oyunu.

## Türk Mutfağı
- 10 çorba
- 10 ana yemek
- 10 tatlı
- Toplam 30 yemek ve 150 adet 3 şıklı pişirme sorusu
- Kuşbakışı market ve reyon sistemi
- Yaklaşık ürün fiyatları
- %70 alışveriş barajı
- Yemek, kategori ve Türk Mutfağı ustalık puanları

## Web geliştirme
```bash
npm install
npm run dev
```

## Android / APK
Proje Capacitor ile Android uygulamasına paketlenir.

GitHub Actions'ta **Build Android APK** iş akışı yalnızca manuel olarak çalışır. Bu özellikle GitHub Actions kotasını korumak için push ve pull request tetikleyicileri kapalı tutulmuştur.

1. GitHub reposunda **Actions** sekmesine gir.
2. **Build Android APK** iş akışını seç.
3. **Run workflow** düğmesine bas.
4. İş tamamlandığında **Artifacts** bölümündeki `ChefMarket-debug-...` paketini indir.
5. ZIP içindeki `app-debug.apk` dosyasını Android telefona kur.

Artifact saklama süresi gereksiz depolama kullanmamak için 3 gündür.

### Yerel Android hazırlığı
```bash
npm install
npx cap add android
npm run android:prepare
npm run android:open
```
