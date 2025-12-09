# 📋 Kod Yazılmayan Form Oluşturucu

Kod yazmadan, görsel arayüz üzerinden dinamik formlar oluşturun, yönetin ve kullanın! **Form Generator** ile profesyonel formlar saniyeler içinde hazır hale getirebilirsiniz.

## ✨ Özellikler

- 🎨 **Sürükle-Bırak Arayüzü** - Kodlama bilgisi gerektirmez
- 📝 **10+ Alan Türü** - Metin, Email, Şifre, Sayı, Tarih, Textarea, Dosya, Checkbox, Radio Button, Seçim Kutusu
- ✔️ **Gelişmiş Doğrulama** - Gerekli alan, minimum/maksimum uzunluk, email, özel pattern
- 💾 **Otomatik Kayıt** - Tüm formlar tarayıcıda yerel depolama ile kaydedilir
- 📤 **İçe/Dışa Aktarma** - Formlarınızı JSON formatında indirin ve yükleyin
- 🎯 **Gözden Geçirme & Gönderme** - Hazırlanan formları test edin ve verilerini görüntüleyin
- 📱 **Mobil Uyumlu** - Tüm cihazlarda sorunsuz çalışır
- 🎭 **Modern Tasarım** - Bootstrap 5 ve gradyan renk şeması

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn paket yöneticisi

### Kurulum

```bash
# Depoyu klonlayın
git clone https://github.com/alicanyucel/FormGeneratOR.git
cd Nocode

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

Tarayıcınız otomatik olarak `http://localhost:4200` adresine yönlendirilecektir.

## 📖 Nasıl Kullanılır

### Form Oluşturma
1. **"Oluşturucu"** sekmesine gidin
2. **Yeni Form Oluştur** butonuna tıklayın
3. Form adı ve açıklaması ekleyin
4. **Alan Ekle** butonuyla form alanları oluşturun
5. Her alan için türü, adı, etiketini ve doğrulama kurallarını belirleyin
6. **Kaydet** butonuyla formu kaydedin

### Formunuzu Test Etme
1. **"Görüntüleyici"** sekmesine geçin
2. Oluşturduğunuz formunuzu seçin
3. Form alanlarını doldurun ve **Gönder** butonuna basın
4. Gönderilen verileri ekranda görüntüleyin

### Form Dışa Aktarma
- Form listesindeki **"JSON'a Aktar"** butonuyla formu indirin
- Dosyayı güvenli bir şekilde saklayabilirsiniz

### Form İçe Aktarma
- **"JSON Yükle"** butonuyla daha önce kaydedilen formu projeye ekleyin

## 🛠️ Teknoloji Stack

- **Angular 16** - Modern web uygulaması framework'ü
- **TypeScript 5** - Güçlü tip sistemi
- **Bootstrap 5** - Duyarlı tasarım sistemi
- **RxJS** - Reaktif programlama kütüphanesi
- **Reactive Forms** - Dinamik form yönetimi

## 📦 Yapı

```
src/
├── app/
│   ├── form-generator/
│   │   ├── form-generator.service.ts      # Veri yönetimi ve iş mantığı
│   │   ├── form-generator.component.*     # Ana konteyner
│   │   ├── form-builder.component.*       # Form oluşturma arayüzü
│   │   ├── form-viewer.component.*        # Form görüntüleme ve gönderme
│   │   └── form-generator-routing.module.ts
│   ├── app.component.*
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
├── index.html
├── styles.css
└── main.ts
```

## 🔧 Komutlar

```bash
# Geliştirme sunucusu
npm start

# Yapı oluştur
npm run build

# Birim testleri çalıştır
npm test

# Linting
npm run lint
```

## 💾 Veri Depolama

Tüm formlar `localStorage` kullanılarak tarayıcıda güvenli bir şekilde depolanır. Uygulamayı kapatıp açarsanız bile tüm formlarınız korunur.

**Not:** Tarayıcı verilerini temizlerseniz tüm formlar silinir. Önemli formları JSON olarak dışa aktarmayı unutmayın!

## 🎯 Alan Türleri ve Doğrulama Kuralları

| Alan Türü | Açıklama | Doğrulama Seçenekleri |
|-----------|----------|---------------------|
| **Metin** | Basit metin girdisi | Gerekli, Min/Max Uzunluk, Pattern |
| **Email** | E-posta adresi | Gerekli, Format Kontrolü |
| **Şifre** | Gizli metin girdisi | Gerekli, Min/Max Uzunluk |
| **Sayı** | Sayısal girdisi | Gerekli, Min/Max Değer |
| **Tarih** | Tarih seçici | Gerekli |
| **Textarea** | Çok satırlı metin | Gerekli, Min/Max Uzunluk |
| **Dosya** | Dosya yüklemesi | Gerekli |
| **Checkbox** | Tek seçim | Gerekli |
| **Radio Button** | Tekli seçim grubu | Gerekli |
| **Seçim Kutusu** | Açılır liste | Gerekli |

## 📱 Tarayıcı Desteği

- ✅ Chrome (son 2 sürüm)
- ✅ Firefox (son 2 sürüm)
- ✅ Safari (son 2 sürüm)
- ✅ Edge (son 2 sürüm)

## 🤝 Katkıda Bulunma

Hata bildirimleri ve öneriler için GitHub Issues bölümünü kullanabilirsiniz. Pull request'ler daima hoştur!

## 📄 Lisans

Bu proje MIT lisansı altında yayımlanmıştır.

## 👨‍💻 Geliştirici

**Ali Can Yücel** - [GitHub Profili](https://github.com/alicanyucel)

## 🙋 Destek

Herhangi bir sorunuz olursa lütfen GitHub Issues bölümüne yazın veya bana e-posta gönderin.

---

**Mutlu Form Oluşturmalar! 🎉**
