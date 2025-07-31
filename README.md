# Garden Çiçekçilik - E-ticaret Sitesi

MERN stack (MongoDB, Express.js, React.js, Node.js) kullanılarak geliştirilmiş modern çiçekçilik e-ticaret sitesi.

## 🚀 Özellikler

### Kullanıcı Özellikleri
- **Ürün Katalog**: Çeşitli çiçek kategorileri ve ürünler
- **Arama ve Filtreleme**: Ürün arama, kategori filtreleme ve sıralama
- **Sepet Yönetimi**: Ürün ekleme, çıkarma, miktar güncelleme
- **Ödeme Sistemi**: Kredi kartı ve kapıda ödeme seçenekleri
- **Sipariş Takibi**: Sipariş durumu ve detayları
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

### Teknik Özellikler
- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, React Router, React Icons
- **State Management**: React Hooks
- **Styling**: CSS3, Responsive Design
- **API**: RESTful API endpoints
- **Validation**: Form validation ve error handling

## 📋 Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

## 🛠️ Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd garden-cicekcilik
```

### 2. Backend Bağımlılıklarını Yükleyin
```bash
npm install
```

### 3. Frontend Bağımlılıklarını Yükleyin
```bash
cd client
npm install
cd ..
```

### 4. Environment Variables (Opsiyonel)
`.env` dosyası oluşturun:
```env
PORT=5000
NODE_ENV=development
```

**Not**: Bu proje mock data ile çalışır, MongoDB bağlantısı gerektirmez.

### 6. Uygulamayı Çalıştırın

#### Geliştirme Modu (Backend + Frontend)
```bash
npm run dev
```

#### Sadece Backend
```bash
npm run server
```

#### Sadece Frontend
```bash
npm run client
```

## 📁 Proje Yapısı

```
garden-cicekcilik/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React bileşenleri
│   │   ├── pages/        # Sayfa bileşenleri
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── models/                # MongoDB modelleri
│   ├── Category.js
│   ├── Order.js
│   └── Product.js
├── routes/               # API route'ları
│   ├── categories.js
│   ├── cart.js
│   ├── orders.js
│   └── products.js
├── server.js             # Ana server dosyası
├── seed.js              # Örnek veri yükleme
└── package.json
```

## 🎯 API Endpoints

### Ürünler
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/:id` - Tek ürün detayı
- `POST /api/products` - Yeni ürün ekle (Admin)
- `PUT /api/products/:id` - Ürün güncelle (Admin)
- `DELETE /api/products/:id` - Ürün sil (Admin)

### Kategoriler
- `GET /api/categories` - Tüm kategorileri listele
- `GET /api/categories/:id` - Tek kategori detayı
- `POST /api/categories` - Yeni kategori ekle (Admin)
- `PUT /api/categories/:id` - Kategori güncelle (Admin)
- `DELETE /api/categories/:id` - Kategori sil (Admin)

### Sepet
- `GET /api/cart` - Sepeti getir
- `POST /api/cart/add` - Ürün ekle
- `PUT /api/cart/update` - Ürün miktarını güncelle
- `DELETE /api/cart/remove/:productId` - Ürün kaldır
- `DELETE /api/cart/clear` - Sepeti temizle

### Siparişler
- `POST /api/orders` - Yeni sipariş oluştur
- `GET /api/orders` - Tüm siparişleri listele (Admin)
- `GET /api/orders/:id` - Sipariş detayı
- `PUT /api/orders/:id/status` - Sipariş durumu güncelle (Admin)
- `PUT /api/orders/:id/payment` - Ödeme durumu güncelle (Admin)

## 🎨 Sayfalar

### Kullanıcı Sayfaları
- **Ana Sayfa**: Hero section, kategoriler, öne çıkan ürünler
- **Ürünler**: Ürün listesi, filtreleme, arama, sıralama
- **Ürün Detay**: Ürün bilgileri, sepete ekleme
- **Sepet**: Sepet yönetimi, miktar güncelleme
- **Ödeme**: Müşteri bilgileri, ödeme yöntemi seçimi
- **Sipariş Onayı**: Sipariş detayları, durum bilgisi

## 🛒 E-ticaret Özellikleri

### Sepet Sistemi
- Session-based sepet yönetimi
- Ürün miktarı güncelleme
- Sepet toplamı hesaplama
- Sepet temizleme

### Ödeme Sistemi
- Kredi kartı ödeme
- Kapıda ödeme seçeneği
- Müşteri bilgileri formu
- Adres bilgileri

### Sipariş Yönetimi
- Sipariş oluşturma
- Stok kontrolü
- Sipariş durumu takibi
- Müşteri bilgileri

## 🎯 Kategoriler

1. **Güller** - Romantik ve özel günler için
2. **Papatyalar** - Doğal ve taze çiçekler
3. **Orkideler** - Zarif ve uzun ömürlü
4. **Laleler** - Baharın renkli habercileri
5. **Çiçek Buketleri** - Özel tasarım kompozisyonlar

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=5000
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Telefon**: +90 555 123 45 67
- **E-posta**: info@gardencicekcilik.com
- **Adres**: İstanbul, Türkiye

---

**Garden Çiçekçilik** - En güzel çiçekler, en uygun fiyatlarla! 🌸 