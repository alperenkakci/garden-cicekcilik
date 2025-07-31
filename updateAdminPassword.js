const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin123456@cluster0.va2y2ff.mongodb.net/garden-cicekcilik?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('MongoDB connected successfully');
  
  try {
    // Admin kullanıcısını bul
    const adminUser = await Admin.findOne({ username: 'admin' });
    
    if (!adminUser) {
      console.log('❌ Admin kullanıcısı bulunamadı!');
      return;
    }
    
    // Şifreyi güncelle
    adminUser.password = 'admin123';
    await adminUser.save();
    
    console.log('✅ Admin kullanıcısının şifresi başarıyla güncellendi!');
    console.log('Kullanıcı adı: admin');
    console.log('Yeni şifre: admin123');
    console.log('E-posta:', adminUser.email);
    console.log('Ad:', adminUser.name);
    console.log('Rol:', adminUser.role);
    
  } catch (error) {
    console.error('❌ Şifre güncellenirken hata:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı.');
  }
}); 