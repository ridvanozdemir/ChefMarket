# Who Is the Chef?

Sevimli, mobil öncelikli yemek bilgisi ve market oyunu.

**Android package:** `com.ridvanozdemir.whoisthechef`

## Türk Mutfağı
- 10 çorba
- 10 ana yemek
- 10 tatlı
- Toplam 30 yemek ve 150 adet 3 şıklı pişirme sorusu
- Kuşbakışı market ve reyon sistemi
- Yaklaşık ürün fiyatları
- Toplam ürün sayısı ipucu
- Tek kullanımlık joker
- Reyonlar arasında sağ/sol kaydırma
- %70 alışveriş barajı
- Yemek, kategori ve Türk Mutfağı ustalık puanları
- Basit oyun sesleri ve ses aç/kapat kontrolü

## Web geliştirme
```bash
npm install
npm run dev
```

## Test APK
GitHub Actions'taki **Build Android APK** workflow'u yalnızca manuel çalışır.

1. Actions > Build Android APK
2. Run workflow
3. Başarılı build sonunda `Who-Is-the-Chef-debug-...` artifact'ını indir
4. ZIP içindeki `app-debug.apk` dosyasını Android telefona kur

## Play Store AAB
**Build Play Store AAB** workflow'u imzalı release AAB üretir ve yalnızca manuel çalışır.

Gerekli GitHub Actions secrets:
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

Her Play yüklemesinde `version_code` artırılmalıdır. İlk yükleme için 1 kullanılabilir.

Signing key hiçbir zaman repoya commit edilmemelidir.
