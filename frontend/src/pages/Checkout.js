import React, { useState } from 'react';
import '../styles/Checkout.css';

function Checkout() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    locationDetails: '',
    instagram: '', // ✅ اسم مستخدم إنستغرام (اختياري)
    notes: '',
    region: 'بيروت',
  });

  const shippingRates = {
    بيروت: 2.0,
    الجنوب: 3.0,
    البقاع: 4.0,
    الشمال: 3.5,
    'جبل لبنان': 2.5,
  };

  const cartTotal = 30.0; // اربطه بـ props لاحقًا
  const shipping = shippingRates[form.region] || 0;
  const grandTotal = cartTotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // الحقل اختياري، لا نضع required
    alert('تم إرسال الطلب بنجاح!');
  };

  return (
    <div className="checkout-page">
      <h2>إتمام الطلب</h2>
      <div className="checkout-container">
        {/* النموذج */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <label>الاسم الكامل</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />

          <label>رقم الهاتف</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />

          <label>العنوان</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} required />

          <label>تفاصيل الموقع (شارع، طابق، مبنى...)</label>
          <input type="text" name="locationDetails" value={form.locationDetails} onChange={handleChange} />

          {/* ✅ إنستغرام اختياري */}
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

        {/* ملخص الطلب على اليسار */}
        <div className="checkout-summary">
          <h3>إجمالي سلة المشتريات</h3>
          <p>المنطقة: {form.region}</p>
          <p>المجموع: ${cartTotal.toFixed(2)}</p>
          <p>الشحن: ${shipping.toFixed(2)} (إلى {form.region})</p>
          <p><strong>الإجمالي: ${grandTotal.toFixed(2)}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;