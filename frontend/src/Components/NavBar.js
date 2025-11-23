import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logowhite.png';
import cart_icon from '../assets/cart-icon2.png';
import '../styles/NavBar.css';
import { FaHeart, FaUser, FaBars } from 'react-icons/fa';

function NavBar() {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/"><img src={logo} alt="سبل" /></Link>
      </div>

      {/* ✅ زر القائمة للجوال */}
      <div className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        <FaBars />
      </div>

      {/* ✅ روابط التنقل + أيقونات للجوال */}
      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenu("home")}>الصفحة الرئيسية {menu === "home" ? <hr /> : null}</Link>
        <Link to="/menu" onClick={() => setMenu("menu")}>متجرنا {menu === "menu" ? <hr /> : null}</Link>
        <Link to="/about" onClick={() => setMenu("about")}>قصّتُنا {menu === "about" ? <hr /> : null}</Link>
        <Link to="/contact" onClick={() => setMenu("contact")}>تواصل معنا {menu === "contact" ? <hr /> : null}</Link>

        {/* ✅ أيقونات للجوال فقط */}
        <div className="nav-icons-mobile">
          <Link to="/login"><FaUser title="حسابي" /></Link>
          <Link to="/favorites"><FaHeart title="المفضلة" /></Link>
          <Link to="/cart" className="nav-cart">
            <div className="nav-cart-count">0</div>
            <img src={cart_icon} alt="السلة" />
          </Link>
        </div>
      </div>

      {/* ✅ أيقونات لسطح المكتب فقط */}
      <div className="nav-icons">
        <Link to="/login"><FaUser title="حسابي" /></Link>
        <Link to="/favorites"><FaHeart title="المفضلة" /></Link>
        <div className="nav-cart">
          <div className="nav-cart-count">0</div>
          <Link to="/cart"><img src={cart_icon} alt="السلة" /></Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;