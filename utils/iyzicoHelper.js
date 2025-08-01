const crypto = require('crypto');
const fetch = require('node-fetch');

// Try to load config from different possible locations
let iyzicoConfig;
try {
  iyzicoConfig = require('../config/iyzico');
} catch (error) {
  try {
    iyzicoConfig = require('../config').iyzico;
  } catch (error2) {
    // Fallback configuration
    iyzicoConfig = {
      apiKey: process.env.IYZICO_API_KEY || 'sandbox-afXhZPW0MQlE4dCUUlHcEopnMBgXnAZI',
      secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-wbwpzKJDmlBmGdO6JYXrlIYHqYJqbU1q',
      baseUrl: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
      callbackUrl: process.env.IYZICO_CALLBACK_URL || 'http://localhost:3000/payment/callback',
      cancelUrl: process.env.IYZICO_CANCEL_URL || 'http://localhost:3000/payment/cancel',
      currency: 'TRY',
      locale: 'tr'
    };
  }
}

class IyzicoHelper {
  constructor() {
    this.apiKey = iyzicoConfig.apiKey;
    this.secretKey = iyzicoConfig.secretKey;
    this.baseUrl = iyzicoConfig.baseUrl;
  }

  // Hash oluşturma
  generateHash(data) {
    const hashStr = this.apiKey + data + this.secretKey;
    return crypto.createHash('sha1').update(hashStr).digest('base64');
  }

  // Random string oluşturma
  generateRandomString(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Ödeme formu oluşturma
  createPaymentForm(orderData) {
    const {
      orderId,
      totalAmount,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items
    } = orderData;

    const basketItems = items.map((item, index) => ({
      id: item._id || `item_${index}`,
      name: item.name,
      category1: 'Çiçek',
      itemType: 'PHYSICAL',
      price: item.price.toString()
    }));

    const buyer = {
      id: `buyer_${orderId}`,
      name: customerName.split(' ')[0] || customerName,
      surname: customerName.split(' ').slice(1).join(' ') || '',
      gsmNumber: customerPhone,
      email: customerEmail,
      identityNumber: '11111111111',
      registrationAddress: shippingAddress,
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34000',
      ip: '85.34.78.112'
    };

    const shippingAddressData = {
      contactName: customerName,
      city: 'Istanbul',
      country: 'Turkey',
      address: shippingAddress,
      zipCode: '34000'
    };

    const billingAddress = {
      contactName: customerName,
      city: 'Istanbul',
      country: 'Turkey',
      address: shippingAddress,
      zipCode: '34000'
    };

    const formData = {
      locale: iyzicoConfig.locale,
      conversationId: orderId,
      price: totalAmount.toString(),
      paidPrice: totalAmount.toString(),
      currency: iyzicoConfig.currency,
      basketId: orderId,
      paymentGroup: 'PRODUCT',
      callbackUrl: iyzicoConfig.callbackUrl,
      cancelUrl: iyzicoConfig.cancelUrl,
      buyer: buyer,
      shippingAddress: shippingAddressData,
      billingAddress: billingAddress,
      basketItems: basketItems,
      enabledInstallments: [1, 2, 3, 6, 9]
    };

    return formData;
  }

  // Ödeme doğrulama
  async verifyPayment(paymentData) {
    try {
      const { token, conversationId } = paymentData;
      
      const response = await fetch(`${this.baseUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `IYZWS ${this.apiKey}:${this.secretKey}`
        },
        body: JSON.stringify({
          locale: iyzicoConfig.locale,
          conversationId: conversationId,
          token: token
        })
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  // Ödeme durumu kontrolü
  checkPaymentStatus(paymentResult) {
    if (paymentResult.status === 'success' && paymentResult.paymentStatus === 'SUCCESS') {
      return {
        success: true,
        message: 'Ödeme başarıyla tamamlandı',
        transactionId: paymentResult.paymentId,
        amount: paymentResult.price
      };
    } else {
      return {
        success: false,
        message: paymentResult.errorMessage || 'Ödeme başarısız',
        errorCode: paymentResult.errorCode
      };
    }
  }

  // Hata mesajlarını Türkçe'ye çevirme
  getErrorMessage(errorCode) {
    const errorMessages = {
      '5001': 'Kart bilgileri hatalı',
      '5002': 'Yetersiz bakiye',
      '5003': 'Kart limiti aşıldı',
      '5004': 'Kart geçersiz',
      '5005': 'İşlem reddedildi',
      '5006': 'Banka hatası',
      '5007': 'Sistem hatası',
      '5008': 'Zaman aşımı',
      '5009': 'Geçersiz işlem',
      '5010': 'Kart blokeli'
    };

    return errorMessages[errorCode] || 'Bilinmeyen hata';
  }
}

module.exports = IyzicoHelper; 