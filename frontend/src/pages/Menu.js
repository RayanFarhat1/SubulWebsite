import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Menu.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

function Shop() {
  const [filterType, setFilterType] = useState('all');
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get("http://localhost:5000/api/products");
        setProducts(prodRes.data);

        if (userId) {
          const favRes = await axios.get(`http://localhost:5000/api/favorites/${userId}`);
          setFavorites(favRes.data);

          const cartRes = await axios.get(`http://localhost:5000/api/cart/${userId}`);
          setCart(cartRes.data);

          const initialCount = cartRes.data.reduce((sum, i) => sum + i.quantity, 0);
          console.log("✅ Initial cartCount stored:", initialCount);
          localStorage.setItem("cartCount", initialCount);
          window.dispatchEvent(new Event("cartUpdated"));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [userId]);

  const addToFavorites = async (item) => {
    if (!userId) {
      alert("⚠️ يرجى تسجيل الدخول أولاً لإضافة المنتج إلى المفضلة.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/favorites", {
        user_id: userId,
        product_id: item.id
      });
      setFavorites([...favorites, item]);
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const removeFromFavorites = async (id) => {
    if (!userId) {
      alert("⚠️ يرجى تسجيل الدخول أولاً لإدارة المفضلة.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${userId}/${id}`);
      setFavorites(favorites.filter(fav => fav.id !== id));
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };

  const addToCart = async (item) => {
    if (!userId) {
      alert("⚠️ يرجى تسجيل الدخول أولاً لإضافة المنتج إلى السلة.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/cart", {
        user_id: userId,
        product_id: item.id,
        quantity: 1
      });

      setCart(res.data);

      const newCount = res.data.reduce((sum, i) => sum + i.quantity, 0);
      console.log("✅ cartCount after add:", newCount);
      localStorage.setItem("cartCount", newCount);

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const groupedItems = products.reduce((groups, item) => {
    if (!groups[item.type]) groups[item.type] = [];
    groups[item.type].push(item);
    return groups;
  }, {});

  const filteredItems =
    filterType === 'all' ? groupedItems : { [filterType]: groupedItems[filterType] };

  const handleFilterClick = (type) => {
    setFilterType(type);
    if (type !== 'all') {
      setTimeout(() => {
        const section = document.getElementById(type);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="shop-page">
      <h2>متجرنا</h2>

      <div className="filter-buttons">
        <button className={filterType === 'all' ? 'active' : ''} onClick={() => handleFilterClick('all')}>الكل</button>
        <button className={filterType === 'book' ? 'active' : ''} onClick={() => handleFilterClick('book')}>كتب</button>
        <button className={filterType === 'notebook' ? 'active' : ''} onClick={() => handleFilterClick('notebook')}>مفكرات</button>
        <button className={filterType === 'box' ? 'active' : ''} onClick={() => handleFilterClick('box')}>صناديق</button>
        <button className={filterType === 'distribution' ? 'active' : ''} onClick={() => handleFilterClick('distribution')}>بطاقات توزيع</button>
        <button className={filterType === 'design' ? 'active' : ''} onClick={() => handleFilterClick('design')}>تصاميم</button>
        <button className={filterType === 'print' ? 'active' : ''} onClick={() => handleFilterClick('print')}>منتجات طباعة</button>
        <button className={filterType === 'misc' ? 'active' : ''} onClick={() => handleFilterClick('misc')}>منتجات متنوعة</button>
      </div>

      <div className="shop-grid">
        {Object.keys(filteredItems).map((type) => (
          <div key={type} id={type} className="shop-section">
            <h3 className="section-title">
              {type === 'book' && 'كتب'}
              {type === 'notebook' && 'مفكرات'}
              {type === 'box' && 'صناديق'}
              {type === 'distribution' && 'بطاقات توزيع'}
              {type === 'design' && 'تصاميم'}
              {type === 'print' && 'منتجات طباعة'}
              {type === 'misc' && 'منتجات متنوعة'}
            </h3>

            <div className="section-grid">
              {filteredItems[type]?.map((item) => {
                const hasPrice = item.price !== undefined && item.price !== null && item.price !== '';
                const isFavorite = favorites?.find(fav => fav.id === item.id);

                let productImage;
                try {
                  productImage = require(`../assets/${item.image_url}`);
                } catch {
                  productImage = null;
                }

                return (
                  <div className="shop-card" key={item.id}>
                    <div className="card-actions">
                      <button
                        className="favorite-button"
                        onClick={() => {
                          if (isFavorite) {
                            removeFromFavorites(item.id);
                          } else {
                            addToFavorites(item);
                          }
                        }}
                        title="أضف إلى المفضلة"
                      >
                        {isFavorite ? (
                          <FaHeart style={{ color: 'red' }} />
                        ) : (
                          <FaRegHeart style={{ color: 'black' }} />
                        )}
                      </button>
                    </div>

                    {productImage ? (
                      <img src={productImage} alt={item.name} />
                    ) : (
                      <div className="no-image">لا توجد صورة</div>
                    )}

                    <h4>{item.name}</h4>
                    {item.author && <p>{item.author}</p>}
                    {hasPrice ? (
                      <p>{item.price} $</p>
                    ) : (
                      <p className="on-demand">السعر حسب الطلب</p>
                    )}
                    {hasPrice && (
                      <button className="cart-button" onClick={() => addToCart(item)}>
                        أضف إلى السلة
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;