import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Favorites.css';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem("userId");

  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
        setFavorites(res.data);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    if (userId) fetchFavorites();
  }, [userId]);

  
  const removeFromFavorites = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${userId}/${id}`);
      setFavorites(favorites.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };

  return (
    <div className={`favorites-page ${favorites.length === 0 ? 'empty-page' : ''}`}>
      <h2>المفضلة</h2>
      {favorites.length === 0 ? (
        <p className="empty-message">لا توجد عناصر في المفضلة</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((item) => {
            let productImage;
            try {
              productImage = require(`../assets/${item.image_url}`);
            } catch {
              productImage = null;
            }

            return (
              <div key={item.id} className="favorite-card">
                {productImage ? (
                  <img src={productImage} alt={item.name} />
                ) : (
                  <div className="no-image">لا توجد صورة</div>
                )}
                <h3>{item.name}</h3>
                <button onClick={() => removeFromFavorites(item.id)}>إزالة</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Favorites;

