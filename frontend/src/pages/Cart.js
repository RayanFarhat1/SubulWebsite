import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('بيروت');

  const shippingRates = {
    بيروت: 2.0,
    الجنوب: 3.0,
    البقاع: 4.0,
    الشمال: 3.5,
    'جبل لبنان': 2.5,
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(res => {
        setCartItems(res.data);
        localStorage.setItem("cartCount", res.data.reduce((sum, i) => sum + i.quantity, 0));
        window.dispatchEvent(new Event("cartUpdated")); 
      })
      .catch(err => console.error("Cart fetch error:", err));
  }, []);

  const updateQuantity = (productId, quantity) => {
    const userId = localStorage.getItem("userId");
    axios.put(`http://localhost:5000/api/cart/${userId}/${productId}`, { quantity })
      .then(() => {
        setCartItems(prev => {
          const updated = prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
          );
          localStorage.setItem("cartCount", updated.reduce((sum, i) => sum + i.quantity, 0));
          window.dispatchEvent(new Event("cartUpdated")); 
          return updated;
        });
      })
      .catch(err => console.error("Update error:", err));
  };

  const removeFromCart = (productId) => {
    const userId = localStorage.getItem("userId");
    axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`)
      .then(() => {
        setCartItems(prev => {
          const updated = prev.filter(item => item.id !== productId);
          localStorage.setItem("cartCount", updated.reduce((sum, i) => sum + i.quantity, 0));
          window.dispatchEvent(new Event("cartUpdated")); 
          return updated;
        });
      })
      .catch(err => console.error("Remove error:", err));
  };

  const shipping = shippingRates[selectedRegion] || 0;
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);
  const grandTotal = total + shipping;

  return (
    <div className={`cart-page ${cartItems.length === 0 ? 'empty-page' : ''}`}>
      <h2>سلة المشتريات</h2>

      {cartItems.length === 0 ? (
        <p className="empty-message">السلة فارغة</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item, index) => (
              <div className="cart-card" key={index}>
                <img src={require(`../assets/${item.image_url}`)} alt={item.name} />
                <div className="cart-details">
                  <h3 className="cart-title">{item.name}</h3>
                  <p>السعر: ${item.price}</p>
                  <div className="quantity-row">
                    <label style={{ marginLeft: '6px' }}>الكمية:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <p>المجموع: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)}>🗑️ إزالة</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>إجمالي سلة المشتريات</h3>
            <label>اختر المنطقة للتوصيل</label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              <option value="بيروت">بيروت</option>
              <option value="الجنوب">الجنوب</option>
              <option value="البقاع">البقاع</option>
              <option value="الشمال">الشمال</option>
              <option value="جبل لبنان">جبل لبنان</option>
            </select>
            <p>المجموع: ${total.toFixed(2)}</p>
            <p>الشحن: ${shipping.toFixed(2)} (إلى {selectedRegion})</p>
            <p><strong>الإجمالي: ${grandTotal.toFixed(2)}</strong></p>
            <button className="checkout-button" onClick={() => navigate('/checkout')}>
              التقدم لإتمام الطلب
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
