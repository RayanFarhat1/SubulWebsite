import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Checkout.css';

function Checkout() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    locationDetails: '',
    instagram: '',
    notes: '',
    region: 'بيروت',
  });

  const [submitted, setSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const shippingRates = {
    بيروت: 2.0,
    الجنوب: 3.0,
    البقاع: 4.0,
    الشمال: 3.5,
    'جبل لبنان': 2.5,
  };

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);
  const shipping = shippingRates[form.region] || 0;
  const grandTotal = cartTotal + shipping;

  
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(res => setCartItems(res.data))
      .catch(err => console.error("Cart fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      for (const item of cartItems) {
        await axios.post("http://localhost:5000/api/orders", {
          user_id: userId,
          product_id: item.id,
          quantity: item.quantity,
          purchase_price: item.price,
          phone: form.phone,
          address: `${form.address} - ${form.locationDetails || ''}`
        });
      }

      
      for (const item of cartItems) {
        await axios.delete(`http://localhost:5000/api/cart/${userId}/${item.id}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Order submission error:", err);
    }
  };

  return (
    <div className="checkout-page">
      <h2>إتمام الطلب</h2>
      <div className="checkout-container">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            <label>الاسم الكامل</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />

            <label>رقم الهاتف</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />

            <label>العنوان</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required />

            <label>تفاصيل الموقع (شارع، طابق، مبنى...)</label>
            <input type="text" name="locationDetails" value={form.locationDetails} onChange={handleChange} />

            <label>اسم مستخدم إنستغرام (اختياري)</label>
            <input
              type="text"
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="@yourusername"
            />

            <label>اختر المنطقة للتوصيل</label>
            <select name="region" value={form.region} onChange={handleChange}>
              <option value="بيروت">بيروت</option>
              <option value="الجنوب">الجنوب</option>
              <option value="البقاع">البقاع</option>
              <option value="الشمال">الشمال</option>
              <option value="جبل لبنان">جبل لبنان</option>
            </select>

            <label>ملاحظات إضافية</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} />

            <button type="submit">تأكيد الطلب</button>
          </form>
        ) : (
          <div className="receipt">
            <h3>📄 إيصال الطلب</h3>
            <p><strong>الاسم:</strong> {form.name}</p>
            <p><strong>الهاتف:</strong> {form.phone}</p>
            <p><strong>العنوان:</strong> {form.address}</p>
            {form.locationDetails && <p><strong>تفاصيل الموقع:</strong> {form.locationDetails}</p>}
            {form.instagram && <p><strong>إنستغرام:</strong> {form.instagram}</p>}
            {form.notes && <p><strong>ملاحظات:</strong> {form.notes}</p>}
            <p><strong>المنطقة:</strong> {form.region}</p>
            <hr />
            <p>المجموع: ${cartTotal.toFixed(2)}</p>
            <p>الشحن: ${shipping.toFixed(2)} (إلى {form.region})</p>
            <p><strong>الإجمالي: ${grandTotal.toFixed(2)}</strong></p>
            <hr />
            <p>✅ تم إرسال الطلب بنجاح، سنتواصل معك قريبًا!</p>
          </div>
        )}

        {!submitted && (
          <div className="checkout-summary">
            <h3>إجمالي سلة المشتريات</h3>
            <p>المنطقة: {form.region}</p>
            <p>المجموع: ${cartTotal.toFixed(2)}</p>
            <p>الشحن: ${shipping.toFixed(2)} (إلى {form.region})</p>
            <p><strong>الإجمالي: ${grandTotal.toFixed(2)}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;