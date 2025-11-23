import React from 'react';
import '../styles/Home.css';
import hajar from '../assets/hajar.png'; // صورة الغلاف
import book1 from '../assets/مع ابي.png';
import book2 from '../assets/حافظ رسالة.png';
import book3 from '../assets/حامل راية.png';
import wrap1 from '../assets/package1.jpeg';
import wrap2 from '../assets/package2.jpeg';
import feedProfile from '../assets/feed-profile.jpg';

function Home({ addToCart }) {
  const books = [
    { id: 1, image: book1, title: "ذكرياتي مع أبي", price: "$15" },
    { id: 2, image: book2, title: "حافظ رسالة الإسلام", price: "$15" },
    { id: 3, image: book3, title: "حامل راية كربلاء", price: "$15" },
  ];

  const wraps = [wrap1, wrap2];

  return (
    <div className="home-page">
      {/* صورة الغلاف */}
      <div className="hero-image">
        <img src={hajar} alt="غلاف سبل" />
      </div>

      {/* قسم الإصدارات الجديدة */}
      <section className="section">
        <h2>الإصدارات الجديدة</h2>
        <div className="book-grid">
          {books.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.price}</p>
              
            </div>
          ))}
        </div>
      </section>

      {/* قسم التغليف */}
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

      {/* قسم آراء الزوار */}
      <section className="section feedback-slider">
        <h2>إقرأ الآراء </h2>
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