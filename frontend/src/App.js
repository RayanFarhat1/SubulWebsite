import './App.css';
import NavBar from "./Components/NavBar";
import Menu from './pages/Menu';
import About from './pages/About';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/LoginSignup';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Footer from './Components/Footer';
import Favorites from './pages/Favorites'; // ✅ صفحة المفضلة الجديدة
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  // ✅ إضافة إلى المفضلة
  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (!prev.find(fav => fav.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  // ✅ إزالة من المفضلة
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter(fav => fav.id !== id));
  };

  // ✅ إضافة إلى السلة مع دعم الكمية
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ تعديل الكمية
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // ✅ إزالة من السلة
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(cartItem => cartItem.id !== id));
  };

  return (
    <div className="App">
      <Router>
        <NavBar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} addToFavorites={addToFavorites} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}


export default App;