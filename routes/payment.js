const express = require('express');
const router = express.Router();
const IyzicoHelper = require('../utils/iyzicoHelper');
const Order = require('../models/Order');

const iyzico = new IyzicoHelper();

// Ödeme başlatma
router.post('/initiate', async (req, res) => {
  try {
    const {
      orderId,
      totalAmount,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items
    } = req.body;

    // Sipariş verilerini hazırla
    const orderData = {
      orderId,
      totalAmount,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items
    };

    // iyzico ödeme formunu oluştur
    const paymentForm = iyzico.createPaymentForm(orderData);

    // iyzico API'sine istek gönder
    const response = await fetch(`${iyzico.baseUrl}/payment/iyzipos/checkoutform/initialize/ecom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `IYZWS ${iyzico.apiKey}:${iyzico.secretKey}`
      },
      body: JSON.stringify(paymentForm)
    });

    const result = await response.json();

    if (result.status === 'success') {
      // Siparişi veritabanında güncelle
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'pending',
        paymentToken: result.token
      });

      res.json({
        success: true,
        paymentPageUrl: result.paymentPageUrl,
        token: result.token,
        message: 'Ödeme sayfası hazırlandı'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Ödeme başlatılamadı',
        error: result.errorMessage
      });
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Ödeme başlatılırken hata oluştu'
    });
  }
});

// Ödeme callback (iyzico'dan gelen yanıt)
router.post('/callback', async (req, res) => {
  try {
    const { token, conversationId } = req.body;

    // Ödeme doğrulama
    const paymentResult = await iyzico.verifyPayment({ token, conversationId });
    const paymentStatus = iyzico.checkPaymentStatus(paymentResult);

    // Siparişi güncelle
    const order = await Order.findById(conversationId);
    if (order) {
      order.paymentStatus = paymentStatus.success ? 'completed' : 'failed';
      order.transactionId = paymentStatus.transactionId;
      order.paymentDetails = paymentResult;
      await order.save();
    }

    if (paymentStatus.success) {
      // Başarılı ödeme sayfasına yönlendir
      res.redirect(`/payment/success?orderId=${conversationId}`);
    } else {
      // Başarısız ödeme sayfasına yönlendir
      res.redirect(`/payment/failed?orderId=${conversationId}&error=${paymentStatus.errorCode}`);
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    res.redirect('/payment/failed?error=system');
  }
});

// Ödeme iptal
router.get('/cancel', (req, res) => {
  const { orderId } = req.query;
  res.redirect(`/payment/cancelled?orderId=${orderId}`);
});

// Ödeme durumu kontrolü
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Sipariş bulunamadı'
      });
    }

    res.json({
      success: true,
      orderId: order._id,
      paymentStatus: order.paymentStatus,
      orderStatus: order.status,
      totalAmount: order.totalAmount,
      transactionId: order.transactionId
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Ödeme durumu kontrol edilemedi'
    });
  }
});

// Test ödeme (sadece geliştirme ortamında)
router.post('/test', async (req, res) => {
  try {
    const testOrderData = {
      orderId: 'test_order_' + Date.now(),
      totalAmount: 100.00,
      customerName: 'Test Müşteri',
      customerEmail: 'test@example.com',
      customerPhone: '+905551234567',
      shippingAddress: 'Test Adres, İstanbul',
      items: [
        {
          _id: 'test_product_1',
          name: 'Test Çiçek',
          price: 100.00
        }
      ]
    };

    const paymentForm = iyzico.createPaymentForm(testOrderData);

    res.json({
      success: true,
      testData: paymentForm,
      message: 'Test ödeme verileri hazırlandı'
    });
  } catch (error) {
    console.error('Test payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Test ödeme oluşturulamadı'
    });
  }
});

module.exports = router; 