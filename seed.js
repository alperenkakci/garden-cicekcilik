const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://admin:admin123456@cluster0.va2y2ff.mongodb.net/garden-cicekcilik?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

const seedData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    
    console.log('Existing data cleared');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Güller',
        description: 'En güzel güller, özel günleriniz için',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Papatyalar',
        description: 'Taze ve güzel papatyalar',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Orkideler',
        description: 'Zarif orkideler, evinizin dekorasyonu için',
        image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Laleler',
        description: 'Renkli laleler, baharın habercisi',
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        isActive: true
      },
      {
        name: 'Çiçek Buketleri',
        description: 'Özel tasarım çiçek buketleri',
        image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        isActive: true
      }
    ]);

    console.log('Categories created');

    // Create products
    const products = await Product.create([
      {
        name: 'Kırmızı Gül Buketi',
        description: '12 adet taze kırmızı gül, özel günleriniz için mükemmel seçim. Romantik anlarınızı unutulmaz kılacak bu güzel buket.',
        price: 89.99,
        category: categories[0]._id,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 50,
        isAvailable: true,
        rating: 4.8,
        numReviews: 25,
        tags: ['romantik', 'özel gün', 'kırmızı']
      },
      {
        name: 'Beyaz Papatya Buketi',
        description: '15 adet beyaz papatya, doğal ve taze. Evinizin dekorasyonu için ideal, aynı zamanda hediye olarak da mükemmel.',
        price: 45.99,
        category: categories[1]._id,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 30,
        isAvailable: true,
        rating: 4.5,
        numReviews: 18,
        tags: ['doğal', 'beyaz', 'dekorasyon']
      },
      {
        name: 'Pembe Orkide',
        description: 'Zarif pembe orkide, uzun ömürlü ve bakımı kolay. Ofis ve ev dekorasyonu için mükemmel seçim.',
        price: 129.99,
        category: categories[2]._id,
        image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 20,
        isAvailable: true,
        rating: 4.9,
        numReviews: 32,
        tags: ['zarif', 'uzun ömürlü', 'pembe']
      },
      {
        name: 'Sarı Laleler',
        description: '20 adet sarı lale, baharın en güzel habercisi. Canlı renkleri ile her ortamı aydınlatır.',
        price: 65.99,
        category: categories[3]._id,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 40,
        isAvailable: true,
        rating: 4.6,
        numReviews: 22,
        tags: ['bahar', 'sarı', 'canlı']
      },
      {
        name: 'Karışık Çiçek Buketi',
        description: 'Özel tasarım karışık çiçek buketi. Güller, papatyalar ve lalelerden oluşan renkli kompozisyon.',
        price: 95.99,
        category: categories[4]._id,
        image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 25,
        isAvailable: true,
        rating: 4.7,
        numReviews: 28,
        tags: ['karışık', 'renkli', 'özel tasarım']
      },
      {
        name: 'Beyaz Gül Buketi',
        description: '10 adet beyaz gül, saflık ve zarafetin simgesi. Düğün ve özel törenler için ideal.',
        price: 75.99,
        category: categories[0]._id,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 35,
        isAvailable: true,
        rating: 4.4,
        numReviews: 15,
        tags: ['beyaz', 'zarif', 'düğün']
      },
      {
        name: 'Mor Orkide',
        description: 'Egzotik mor orkide, nadir bulunan türlerden. Koleksiyoncular için özel seçim.',
        price: 159.99,
        category: categories[2]._id,
        image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 10,
        isAvailable: true,
        rating: 5.0,
        numReviews: 8,
        tags: ['egzotik', 'mor', 'nadir']
      },
      {
        name: 'Turuncu Laleler',
        description: '15 adet turuncu lale, enerji ve neşe dolu. Ofis ortamları için mükemmel seçim.',
        price: 55.99,
        category: categories[3]._id,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        stock: 45,
        isAvailable: true,
        rating: 4.3,
        numReviews: 19,
        tags: ['turuncu', 'enerji', 'ofis']
      }
    ]);

    console.log('Products created');
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

db.once('open', () => {
  console.log('MongoDB connected successfully');
  seedData();
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}); 