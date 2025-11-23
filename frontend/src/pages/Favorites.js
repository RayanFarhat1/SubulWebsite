import React from 'react';
import '../styles/Favorites.css';

function Favorites({ favorites, removeFromFavorites }) {
  return (
    <div className={`favorites-page ${favorites.length === 0 ? 'empty-page' : ''}`}>
      <h2>المفضلة</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">لا توجد عناصر في المفضلة</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <button onClick={() => removeFromFavorites(item.id)}>إزالة</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;