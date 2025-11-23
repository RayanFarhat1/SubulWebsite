import React, { useState } from 'react';
import '../styles/AdminPage.css';

function AdminPage() {
  const [newItem, setNewItem] = useState({
    title: '',
    price: '',
    type: '',
    description: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewItem({
      ...newItem,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يتم إرسال البيانات إلى قاعدة البيانات أو تخزينها
    console.log('تمت إضافة العنصر:', newItem);
  };

  return (
    <div className="admin-page">
      <h2>لوحة التحكم</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>إضافة عنصر جديد</h3>
        <input type="text" name="title" placeholder="اسم العنصر" onChange={handleChange} required />
        <input type="number" name="price" placeholder="السعر" onChange={handleChange} required />
        <select name="type" onChange={handleChange} required>
          <option value="">اختر النوع</option>
          <option value="book">كتاب</option>
          <option value="wrap">تغليف</option>
          <option value="gift">هدية</option>
        </select>
        <textarea name="description" placeholder="الوصف" onChange={handleChange} />
        <input type="number" name="stock" placeholder="الكمية المتوفرة" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">➕ إضافة</button>
      </form>

      <div className="orders-section">
        <h3>الطلبات</h3>
        {/* جدول الطلبات هنا */}
        <table>
          <thead>
            <tr>
              <th>العميل</th>
              <th>العنصر</th>
              <th>الكمية</th>
              <th>التاريخ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {/* بيانات الطلبات من قاعدة البيانات */}
            <tr>
              <td>أحمد</td>
              <td>كتاب 1</td>
              <td>2</td>
              <td>2025-11-17</td>
              <td>جديد</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;