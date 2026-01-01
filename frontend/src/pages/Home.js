import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import hajar from '../assets/hajar.png'; 
import wrap1 from '../assets/package1.jpeg';
import wrap2 from '../assets/package2.jpeg';
import feedProfile from '../assets/feed-profile.jpg';

function Home() {
  const [books, setBooks] = useState([]);
  const wraps = [wrap1, wrap2];

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        const newBooks = res.data.filter(p => p.type === "book").slice(0, 3);
        setBooks(newBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="home-page">
      <div className="hero-image">
        <img src={hajar} alt="غلاف سبل" />
      </div>
      <section className="section">
        <h2>الإصدارات الجديدة</h2>
        <div className="book-grid">
          {books.map((book) => {
            let bookImage;
            try {
              bookImage = require(`../assets/${book.image_url}`);
            } catch {
              bookImage = null;
            }

            return (
              <div className="book-card" key={book.id}>
                {bookImage ? (
                  <img src={bookImage} alt={book.name} />
                ) : (
                  <div className="no-image">لا توجد صورة</div>
                )}
                <h3>{book.name}</h3>
                <p>{book.price ? `${book.price} $` : "السعر حسب الطلب"}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2>التغليف</h2>
        <div className="wrap-grid">
          {wraps.map((img, index) => (
            <div className="wrap-card" key={index}>
              <img src={img} alt={`تغليف ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="section feedback-slider">
        <h2>إقرأ الآراء</h2>
        <div className="feedback-container">
          {[1, 2, 3].map((_, index) => (
            <div className="feedback-card" key={index}>
              <img
                src={feedProfile}
                alt="زائر"
                className="feedback-avatar"
              />
              <p className="feedback-text">
                من المريح جداً شعورك أنك تنتمي لمكانها، وكل شيء منظم بطريقة رائعة.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;