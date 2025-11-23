import React from "react";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="contact-items">
        <div className="contact-item">
          <a
            href="https://www.instagram.com/subul.leb/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaInstagram className="contact-icon instagram-icon" />
            <p className="contact-text ltr">@subul.leb</p>
          </a>
        </div>
        <div className="contact-item">
          <FaEnvelope className="contact-icon email-icon" />
          <p className="contact-text ltr">info@subul.com</p>
        </div>
        <div className="contact-item">
          <a
            href="https://wa.me/81180014"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <FaWhatsapp className="contact-icon whatsapp-icon" />
            <p className="contact-text ltr">+961 81 180 014</p>
          </a>
        </div>
      </div>
      <p className="copy">Subul &copy; 2025</p>
    </div>
  );
}

export default Footer;