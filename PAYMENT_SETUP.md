# 🌸 Garden Çiçekçilik - iyzico Ödeme Sistemi

## 📋 Kurulum Kılavuzu

### 1. Gerekli Dosyalar

```
config/
├── iyzico.js          # iyzico konfigürasyonu
utils/
├── iyzicoHelper.js    # iyzico yardımcı fonksiyonları
routes/
├── payment.js         # Ödeme route'ları
client/src/pages/
├── Payment.js         # Ödeme sayfası
├── PaymentSuccess.js  # Başarılı ödeme sayfası
└── PaymentFailed.js   # Başarısız ödeme sayfası
```

### 2. Konfigürasyon

#### `config/iyzico.js` - Konfigürasyon Dosyası

```javascript
// Test ortamı için
apiKey: 'sandbox-afXhZPW0MQlE4dCUUlHcEopnMBgXnAZI',
secretKey: 'sandbox-wbwpzKJDmlBmGdO6JYXrlIYHqYJqbU1q',
baseUrl: 'https://sandbox-api.iyzipay.com',

// Production ortamı için (canlıya geçerken değiştirilecek)
// apiKey: 'your-production-api-key',
// secretKey: 'your-production-secret-key',
// baseUrl: 'https://api.iyzipay.com',
```

### 3. Ödeme Akışı

1. **Sipariş Oluşturma** → `/checkout`
2. **Ödeme Sayfası** → `/payment?orderId=xxx`
3. **iyzico Ödeme** → iyzico ödeme sayfası
4. **Callback** → `/payment/success` veya `/payment/failed`

### 4. API Endpoints

#### Backend Routes (`/api/payment/`)

- `POST /initiate` - Ödeme başlatma
- `POST /callback` - iyzico callback
- `GET /cancel` - Ödeme iptal
- `GET /status/:orderId` - Ödeme durumu kontrolü
- `POST /test` - Test ödeme (sadece geliştirme)

#### Frontend Routes

- `/payment` - Ödeme sayfası
- `/payment/success` - Başarılı ödeme
- `/payment/failed` - Başarısız ödeme

### 5. Ödeme Yöntemleri

- ✅ Kredi Kartı
- ✅ Banka Kartı
- ✅ Taksitli Ödeme (1, 2, 3, 6, 9 taksit)

### 6. Güvenlik Özellikleri

- 🔒 SSL Şifreleme
- 🔒 Kart bilgileri saklanmaz
- 🔒 iyzico güvenlik altyapısı
- 🔒 Hash doğrulama

### 7. Hata Kodları

| Kod | Açıklama |
|-----|----------|
| 5001 | Kart bilgileri hatalı |
| 5002 | Yetersiz bakiye |
| 5003 | Kart limiti aşıldı |
| 5004 | Kart geçersiz |
| 5005 | İşlem reddedildi |
| 5006 | Banka hatası |
| 5007 | Sistem hatası |
| 5008 | Zaman aşımı |
| 5009 | Geçersiz işlem |
| 5010 | Kart blokeli |

### 8. Test Kartları

#### Başarılı Ödeme
- Kart No: `5528790000000008`
- Son Kullanma: `12/2030`
- CVV: `123`

#### Başarısız Ödeme
- Kart No: `4111111111111129`
- Son Kullanma: `12/2030`
- CVV: `123`

### 9. Production'a Geçiş

1. **iyzico Hesabı Oluştur**
   - https://merchant.iyzipay.com
   - Production API anahtarlarını al

2. **Konfigürasyonu Güncelle**
   ```javascript
   // config/iyzico.js
   apiKey: 'your-production-api-key',
   secretKey: 'your-production-secret-key',
   baseUrl: 'https://api.iyzipay.com',
   ```

3. **Callback URL'lerini Güncelle**
   ```javascript
   callbackUrl: 'https://yoursite.com/payment/callback',
   cancelUrl: 'https://yoursite.com/payment/cancel',
   ```

### 10. Özelleştirme

#### Renk Teması
```css
/* Ana renk */
--primary-color: #4CAF50;

/* Başarı rengi */
--success-color: #4CAF50;

/* Hata rengi */
--error-color: #dc3545;
```

#### Logo ve Marka
```javascript
// config/iyzico.js
merchantName: 'Garden Çiçekçilik',
merchantWebsite: 'https://gardencicekcilik.com',
```

### 11. Sorun Giderme

#### Yaygın Hatalar

1. **"API Key geçersiz"**
   - Konfigürasyon dosyasını kontrol et
   - Test/Production ortamını doğrula

2. **"Callback URL hatası"**
   - URL'lerin doğru olduğunu kontrol et
   - HTTPS kullan (production'da)

3. **"Hash doğrulama hatası"**
   - Secret key'i kontrol et
   - Hash algoritmasını doğrula

### 12. Destek

- 📧 E-posta: support@gardencicekcilik.com
- 📞 Telefon: +90 555 123 45 67
- 🌐 Website: https://gardencicekcilik.com

---

**Not:** Bu sistem test ortamında çalışmaktadır. Canlıya geçmeden önce iyzico hesabınızı oluşturup production API anahtarlarını almanız gerekmektedir. 