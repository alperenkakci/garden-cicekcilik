import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEye, FaTimes, FaBox, FaUser, FaPhone, FaMapMarkerAlt, 
  FaCalendarAlt, FaMoneyBillWave, FaSignOutAlt, FaSync, FaPlus, FaEdit, 
  FaTrash, FaSeedling, FaList, FaShoppingBag, FaTags 
} from 'react-icons/fa';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Category management states
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  // Product management states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    rating: '5',
    numReviews: '0'
  });

  useEffect(() => {
    // Admin authentication kontrolü
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      navigate('/login');
      return;
    }
    
    try {
      setAdminUser(JSON.parse(user));
      fetchData();
    } catch (error) {
      console.error('Admin user parse error:', error);
      navigate('/login');
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch orders
      const ordersResponse = await fetch('/api/orders');
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        const ordersArray = ordersData.orders || ordersData;
        setOrders(Array.isArray(ordersArray) ? ordersArray : []);
      }

      // Fetch products
      const productsResponse = await fetch('/api/products');
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);
      }

      // Fetch categories
      const categoriesResponse = await fetch('/api/categories');
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData || []);
      }
    } catch (err) {
      setError(err.message);
      console.error('Fetch data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Order management functions
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Sipariş durumu güncellenirken hata oluştu');
      }

      await fetchData();
    } catch (err) {
      setError(err.message);
      console.error('Update order status error:', err);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Bu siparişi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Sipariş silinirken hata oluştu');
      }

      await fetchData();
    } catch (err) {
      setError(err.message);
      console.error('Delete order error:', err);
    }
  };

  // Product management functions
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...productForm,
        price: parseFloat(productForm.price),
        stock: parseInt(productForm.stock),
        rating: parseFloat(productForm.rating),
        numReviews: parseInt(productForm.numReviews),
        isAvailable: true
      };

      const url = editingProduct 
        ? `/api/products/${editingProduct._id}`
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Ürün kaydedilirken hata oluştu');
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
        rating: '5',
        numReviews: '0'
      });
      
      await fetchData();
    } catch (err) {
      setError(err.message);
      console.error('Product submit error:', err);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category?._id || product.category || '',
      stock: product.stock.toString(),
      rating: product.rating.toString(),
      numReviews: product.numReviews.toString()
    });
    setShowProductForm(true);
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ürün silinirken hata oluştu');
      }

      await fetchData();
    } catch (err) {
      setError(err.message);
      console.error('Delete product error:', err);
    }
  };

  // Category management functions
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingCategory 
        ? `/api/categories/${editingCategory._id}` 
        : '/api/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryForm)
      });

      if (response.ok) {
        setShowCategoryForm(false);
        setEditingCategory(null);
        setCategoryForm({
          name: '',
          description: '',
          image: ''
        });
        await fetchData();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Bir hata oluştu');
      }
    } catch (error) {
      setError('Bir hata oluştu');
    }
  };

  const editCategory = (category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      image: category.image
    });
    setShowCategoryForm(true);
  };

  const deleteCategory = async (categoryId) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/categories/${categoryId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          await fetchData();
        } else {
          setError('Kategori silinirken bir hata oluştu');
        }
      } catch (error) {
        setError('Bir hata oluştu');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#28a745';
      case 'delivered': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'processing': return 'İşleniyor';
      case 'shipped': return 'Kargoda';
      case 'delivered': return 'Teslim Edildi';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>
            <FaSeedling style={{ marginRight: '10px' }} />
            Admin Paneli
          </h1>
          <div className="admin-user-info">
            <span>Hoş geldin, {adminUser?.name || 'Admin'}</span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              <FaSignOutAlt />
              Çıkış
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <FaList />
          Siparişler ({orders.length})
        </button>
        <button 
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <FaShoppingBag />
          Ürünler ({products.length})
        </button>
        <button 
          className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <FaTags />
          Kategoriler ({categories.length})
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {error && (
          <div className="error-container">
            <div className="error-icon">❌</div>
            <p>{error}</p>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <div className="section-header">
              <h2>Sipariş Yönetimi</h2>
              <button onClick={refreshData} className="btn btn-outline" disabled={refreshing}>
                <FaSync className={refreshing ? 'spinning' : ''} />
                Yenile
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="empty-state">
                <FaBox style={{ fontSize: '3rem', opacity: 0.5 }} />
                <p>Henüz sipariş bulunmuyor</p>
              </div>
            ) : (
              <div className="orders-grid">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <h3>Sipariş #{order.orderNumber}</h3>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div className="order-info">
                      <p><FaUser /> {order.customerName}</p>
                      <p><FaPhone /> {order.customerPhone}</p>
                      <p><FaMapMarkerAlt /> {order.shippingAddress}</p>
                      <p><FaCalendarAlt /> {formatDate(order.createdAt)}</p>
                      <p><FaMoneyBillWave /> ₺{calculateTotal(order.items).toFixed(2)}</p>
                    </div>

                    <div className="order-actions">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        className="btn btn-outline btn-sm"
                      >
                        <FaEye />
                        Detaylar
                      </button>
                      
                      <select 
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Beklemede</option>
                        <option value="processing">İşleniyor</option>
                        <option value="shipped">Kargoda</option>
                        <option value="delivered">Teslim Edildi</option>
                        <option value="cancelled">İptal Edildi</option>
                      </select>

                      <button 
                        onClick={() => deleteOrder(order._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h2>Ürün Yönetimi</h2>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    category: '',
                    stock: '',
                    rating: '5',
                    numReviews: '0'
                  });
                  setShowProductForm(true);
                }}
                className="btn btn-primary"
              >
                <FaPlus />
                Yeni Ürün Ekle
              </button>
            </div>

            {products.length === 0 ? (
              <div className="empty-state">
                <FaShoppingBag style={{ fontSize: '3rem', opacity: 0.5 }} />
                <p>Henüz ürün bulunmuyor</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">₺{product.price.toFixed(2)}</p>
                      <p className="product-stock">Stok: {product.stock}</p>
                      <p className="product-category">
                        {product.category?.name || 'Kategori Yok'}
                      </p>
                    </div>
                    <div className="product-actions">
                      <button 
                        onClick={() => editProduct(product)}
                        className="btn btn-outline btn-sm"
                      >
                        <FaEdit />
                        Düzenle
                      </button>
                      <button 
                        onClick={() => deleteProduct(product._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="categories-section">
            <div className="section-header">
              <h2>Kategori Yönetimi</h2>
              <button 
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryForm({
                    name: '',
                    description: '',
                    image: ''
                  });
                  setShowCategoryForm(true);
                }}
                className="btn btn-primary"
              >
                <FaPlus />
                Yeni Kategori Ekle
              </button>
            </div>

            {categories.length === 0 ? (
              <div className="empty-state">
                <FaTags style={{ fontSize: '3rem', opacity: 0.5 }} />
                <p>Henüz kategori bulunmuyor</p>
              </div>
            ) : (
              <div className="categories-grid">
                {categories.map((category) => (
                  <div key={category._id} className="category-card">
                    <img src={category.image} alt={category.name} className="category-image" />
                    <div className="category-info">
                      <h3>{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                    </div>
                    <div className="category-actions">
                      <button 
                        onClick={() => editCategory(category)}
                        className="btn btn-outline btn-sm"
                      >
                        <FaEdit />
                        Düzenle
                      </button>
                      <button 
                        onClick={() => deleteCategory(category._id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FaTrash />
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h2>
              <button 
                onClick={() => setShowProductForm(false)}
                className="modal-close"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleProductSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Ürün Adı *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fiyat *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Stok *</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Resim URL *</label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Açıklama *</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Değerlendirme</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={productForm.rating}
                    onChange={(e) => setProductForm({...productForm, rating: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Değerlendirme Sayısı</label>
                  <input
                    type="number"
                    value={productForm.numReviews}
                    onChange={(e) => setProductForm({...productForm, numReviews: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowProductForm(false)} className="btn btn-outline">
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</h2>
              <button 
                onClick={() => setShowCategoryForm(false)}
                className="modal-close"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleCategorySubmit} className="modal-form">
              <div className="form-group">
                <label>Kategori Adı *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Resim URL *</label>
                <input
                  type="url"
                  value={categoryForm.image}
                  onChange={(e) => setCategoryForm({...categoryForm, image: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Açıklama *</label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowCategoryForm(false)} className="btn btn-outline">
                  İptal
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Sipariş Detayları #{selectedOrder.orderNumber}</h2>
              <button 
                onClick={() => setShowOrderDetails(false)}
                className="modal-close"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="order-details">
              <div className="customer-info">
                <h3>Müşteri Bilgileri</h3>
                <p><FaUser /> {selectedOrder.customerName}</p>
                <p><FaPhone /> {selectedOrder.customerPhone}</p>
                <p><FaMapMarkerAlt /> {selectedOrder.shippingAddress}</p>
                <p><FaCalendarAlt /> {formatDate(selectedOrder.createdAt)}</p>
              </div>

              <div className="order-items">
                <h3>Sipariş Ürünleri</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>Adet: {item.quantity}</p>
                      <p>Fiyat: ₺{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <h3>Toplam: ₺{calculateTotal(selectedOrder.items).toFixed(2)}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 