const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'garden-cicekcilik-secret-key-2024';

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Kullanıcı adı ve şifre gereklidir' 
      });
    }

    // Admin kullanıcısını bul
    const admin = await Admin.findOne({ username, isActive: true });
    
    if (!admin) {
      return res.status(401).json({ 
        message: 'Geçersiz kullanıcı adı veya şifre' 
      });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Geçersiz kullanıcı adı veya şifre' 
      });
    }

    // Son giriş zamanını güncelle
    admin.lastLogin = new Date();
    await admin.save();

    // JWT token oluştur
    const token = jwt.sign(
      { 
        id: admin._id, 
        username: admin.username, 
        role: admin.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Çıkış başarılı' });
});

// Token doğrulama middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token gereklidir' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Geçersiz token' });
    }
    req.user = user;
    next();
  });
};

// Admin bilgilerini getir
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    
    if (!admin) {
      return res.status(404).json({ message: 'Admin bulunamadı' });
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ 
      message: 'Sunucu hatası', 
      error: error.message 
    });
  }
});

module.exports = { router, authenticateToken }; 