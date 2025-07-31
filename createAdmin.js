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
    // Mevcut admin kullanıcısını kontrol et
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin kullanıcısı zaten mevcut!');
      console.log('Kullanıcı adı:', existingAdmin.username);
      console.log('E-posta:', existingAdmin.email);
      console.log('Ad:', existingAdmin.name);
      console.log('Rol:', existingAdmin.role);
      console.log('Aktif:', existingAdmin.isActive);
    } else {
      // Yeni admin kullanıcısı oluştur
      const adminUser = new Admin({
        username: 'admin',
        password: 'admin123',
        email: 'admin@gardencicekcilik.com',
        name: 'Garden Çiçekçilik Admin',
        role: 'admin',
        isActive: true
      });
      
      await adminUser.save();
      console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
      console.log('Kullanıcı adı: admin');
      console.log('Şifre: admin123');
      console.log('E-posta: admin@gardencicekcilik.com');
      console.log('Ad: Garden Çiçekçilik Admin');
      console.log('Rol: admin');
    }
  } catch (error) {
    console.error('❌ Admin kullanıcısı oluşturulurken hata:', error.message);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı.');
  }
}); 