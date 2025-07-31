# Garden Çiçekçilik E-commerce Website

Modern ve kullanıcı dostu bir çiçek satış platformu. React.js frontend ve Node.js backend ile geliştirilmiş, iyzico ödeme entegrasyonu içeren tam özellikli e-ticaret sitesi.

## 🚀 Özellikler

### Frontend
- **Modern UI/UX**: Glassmorphism tasarım, animasyonlar ve responsive layout
- **Ürün Katalog**: Kategorilere göre filtreleme ve arama
- **Sepet Yönetimi**: Ürün ekleme, çıkarma ve miktar güncelleme
- **Ödeme Sistemi**: iyzico entegrasyonu ile güvenli ödeme
- **Sipariş Takibi**: Gerçek zamanlı sipariş durumu
- **Admin Paneli**: Ürün ve kategori yönetimi

### Backend
- **RESTful API**: Express.js ile modern API tasarımı
- **Veritabanı**: MongoDB ile veri yönetimi
- **Kimlik Doğrulama**: JWT tabanlı güvenlik
- **Ödeme Entegrasyonu**: iyzico API entegrasyonu
- **Dosya Yönetimi**: Resim yükleme ve depolama

## 🛠️ Teknolojiler

### Frontend
- React.js 18.2.0
- React Router DOM 6.8.1
- Axios 1.3.4
- React Icons 4.8.0
- React Toastify 9.1.2
- Styled Components 5.3.9
- Framer Motion 10.0.1

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer (dosya yükleme)
- node-fetch (iyzico API)

## 📦 Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- MongoDB
- npm veya yarn

### Adım 1: Repository'yi Klonlayın
```bash
git clone https://github.com/KULLANICI_ADINIZ/garden-cicekcilik.git
cd garden-cicekcilik
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
# Backend bağımlılıkları
npm install

# Frontend bağımlılıkları
cd client
npm install
cd ..
```

### Adım 3: Environment Variables
`.env` dosyası oluşturun:
```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# iyzico Configuration
IYZICO_API_KEY=your_iyzico_api_key
IYZICO_SECRET_KEY=your_iyzico_secret_key
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
IYZICO_MERCHANT_ID=your_merchant_id
```

### Adım 4: Veritabanını Hazırlayın
```bash
# Admin kullanıcısı oluşturun
node createAdmin.js

# Test verilerini yükleyin
node seed.js
```

### Adım 5: Uygulamayı Başlatın
```bash
# Backend'i başlatın (port 5000)
npm start

# Yeni terminal açın ve frontend'i başlatın (port 3000)
cd client
npm start
```

## 🔧 Kullanım

### Admin Paneli
- URL: `http://localhost:3000/admin`
- Varsayılan kullanıcı: `admin`
- Varsayılan şifre: `admin123`

### API Endpoints
- `GET /api/products` - Ürün listesi
- `GET /api/categories` - Kategori listesi
- `POST /api/orders` - Sipariş oluşturma
- `GET /api/orders/:id` - Sipariş detayı
- `POST /api/payment/initiate` - Ödeme başlatma

## 🌐 Deployment

### Vercel ile Deployment
1. Vercel CLI kurulumu: `npm install -g vercel`
2. Vercel'e giriş: `vercel login`
3. Deploy: `vercel`

### Environment Variables (Production)
Vercel dashboard'da aşağıdaki environment variables'ları ayarlayın:
- `MONGODB_URI`
- `JWT_SECRET`
- `IYZICO_API_KEY`
- `IYZICO_SECRET_KEY`
- `IYZICO_BASE_URL`
- `IYZICO_MERCHANT_ID`

## 🔒 Güvenlik

- JWT tabanlı kimlik doğrulama
- CORS koruması
- Input validation
- SQL injection koruması
- XSS koruması

## 📱 Responsive Tasarım

- Mobile-first yaklaşım
- Tablet ve desktop uyumlu
- Touch-friendly arayüz
- Progressive Web App özellikleri

## 🎨 UI/UX Özellikleri

- Glassmorphism efektleri
- Smooth animasyonlar
- Loading states
- Error handling
- Success notifications
- Modern gradient'lar
- Hover efektleri

## 🔄 Geliştirme

### Yeni Özellik Ekleme
1. Feature branch oluşturun: `git checkout -b feature/yeni-ozellik`
2. Geliştirmeyi yapın
3. Test edin
4. Commit yapın: `git commit -m "feat: yeni özellik eklendi"`
5. Push edin: `git push origin feature/yeni-ozellik`
6. Pull request oluşturun

### Kod Stili
- ESLint kurallarına uyun
- Prettier kullanın
- Component'leri modüler tutun
- Prop types kullanın

## 🐛 Sorun Giderme

### Yaygın Sorunlar

1. **Port 5000 kullanımda**
   ```bash
   taskkill /f /im node.exe
   ```

2. **MongoDB bağlantı hatası**
   - MongoDB servisinin çalıştığından emin olun
   - Connection string'i kontrol edin

3. **iyzico ödeme hatası**
   - API key'leri kontrol edin
   - Sandbox/Production ayarlarını kontrol edin

## 📞 Destek

Sorunlarınız için:
- GitHub Issues kullanın
- Email: support@gardencicekcilik.com

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

---

**Garden Çiçekçilik** - Modern çiçek satış platformu 🌸 