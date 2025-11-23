import React, { useState, useEffect } from 'react';

function AddBook() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    image: '',
  });

  const [books, setBooks] = useState([]);

  // تحميل الكتب من localStorage عند بدء التشغيل
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(storedBooks);
  }, []);

  // تحديث localStorage عند إضافة كتاب جديد
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBook({ title: '', author: '', price: '', image: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  return (
    <div className="add-book-page">
      <h2>إضافة كتاب جديد</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          name="title"
          placeholder="عنوان الكتاب"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="اسم المؤلف"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={book.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="رابط صورة الغلاف"
          value={book.image}
          onChange={handleChange}
        />
        <button type="submit">➕ إضافة</button>
      </form>

      <h3>📚 الكتب المضافة:</h3>
      <div className="book-list">
        {books.map((b, index) => (
          <div key={index} className="book-card">
            <img src={b.image} alt={b.title} />
            <h4>{b.title}</h4>
            <p>المؤلف: {b.author}</p>
            <p>السعر: {b.price} د.أ</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddBook;