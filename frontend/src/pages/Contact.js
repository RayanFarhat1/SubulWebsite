import React from 'react';
import '../styles/Contact.css';

function ContactUs() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2>تواصل معنا</h2>
        <p>يسعدنا تواصلك معنا لأي استفسار أو اقتراح. نحن هنا لخدمتك بكل حب واحترام.</p>
      </div>

      <form className="contact-form">
        <label htmlFor="name">الاسم الكامل:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="phone">رقم الهاتف:</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="email">البريد الإلكتروني:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">رسالتك:</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">إرسال</button>
      </form>
    </div>
  );
}

export default ContactUs;