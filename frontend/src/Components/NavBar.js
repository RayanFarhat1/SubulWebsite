import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logowhite.png';
import cart_icon from '../assets/cart-icon2.png';
import '../styles/NavBar.css';
import { FaHeart, FaUser, FaBars } from 'react-icons/fa';

function NavBar() {
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userId"));
  const [cartCount, setCartCount] = useState(parseInt(localStorage.getItem("cartCount")) || 0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      const count = parseInt(localStorage.getItem("cartCount")) || 0;
      console.log(" Navbar read cartCount:", count);
      setIsLoggedIn(!!localStorage.getItem("userId"));
      setCartCount(count);
    };

    window.addEventListener("cartUpdated", handleUpdate);
    window.addEventListener("userUpdated", handleUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
      window.removeEventListener("userUpdated", handleUpdate);
    };
  }, []);

  const handleLinkClick = (selectedMenu) => {
    setMenu(selectedMenu);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.setItem("cartCount", 0);
    console.log(" Logout reset cartCount to 0");
    setCartCount(0);
    setIsLoggedIn(false);
    setMobileOpen(false);
    navigate("/login");
    window.dispatchEvent(new Event("userUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="nav-logo">
          <Link to="/" onClick={() => handleLinkClick("home")}>
            <img src={logo} alt="سبل" />
          </Link>
        </div>
        <div className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <FaBars />
        </div>
      </div>

      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => handleLinkClick("home")}>
          الصفحة الرئيسية {menu === "home" ? <hr /> : null}
        </Link>
        <Link to="/menu" onClick={() => handleLinkClick("menu")}>
          متجرنا {menu === "menu" ? <hr /> : null}
        </Link>
        <Link to="/about" onClick={() => handleLinkClick("about")}>
          قصّتُنا {menu === "about" ? <hr /> : null}
        </Link>
        <Link to="/contact" onClick={() => handleLinkClick("contact")}>
          تواصل معنا {menu === "contact" ? <hr /> : null}
        </Link>

        <div className="nav-icons-mobile">
          {isLoggedIn ? (
            <span className="logout-link" onClick={handleLogout}>تسجيل الخروج</span>
          ) : (
            <Link to="/login" onClick={() => handleLinkClick("login")}>
              <FaUser title="تسجيل الدخول" />
            </Link>
          )}
          <Link to="/favorites" onClick={() => handleLinkClick("favorites")}>
            <FaHeart title="المفضلة" />
          </Link>
          <Link to="/cart" className="nav-cart" onClick={() => handleLinkClick("cart")}>
            <div className="nav-cart-count">{cartCount}</div>
            <img src={cart_icon} alt="السلة" />
          </Link>
        </div>
      </div>

      <div className="nav-icons">
        {isLoggedIn ? (
          <span className="logout-link" onClick={handleLogout}>تسجيل الخروج</span>
        ) : (
          <Link to="/login"><FaUser title="تسجيل الدخول" /></Link>
        )}
        <Link to="/favorites"><FaHeart title="المفضلة" /></Link>
        <div className="nav-cart">
          <div className="nav-cart-count">{cartCount}</div>
          <Link to="/cart"><img src={cart_icon} alt="السلة" /></Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;