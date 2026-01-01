import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginSignUp.css';

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formElements = e.target.elements;
    const name = !isLogin ? formElements[0].value.trim() : null;
    const email = isLogin ? formElements[0].value.trim() : formElements[1].value.trim();
    const password = isLogin ? formElements[1].value.trim() : formElements[2].value.trim();

    if (!email || !password || (!isLogin && !name)) {
      setAlertMessage('يرجى تعبئة جميع الحقول المطلوبة');
      setAlertType('error');
      setIsSubmitting(false);
      return;
    }

    try {
      let userId;

      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/login", { email, password });
        userId = res.data.user.id;
        localStorage.setItem("userId", userId);
        setAlertMessage('تم تسجيل الدخول بنجاح!');
        setAlertType('success');
      } else {
        const res = await axios.post("http://localhost:5000/api/signup", { name, email, password });
        if (res.data.userId) {
          userId = res.data.userId;
          localStorage.setItem("userId", userId);
          setAlertMessage('تم إنشاء الحساب بنجاح!');
          setAlertType('success');
        } else {
          throw new Error("رد غير متوقع من السيرفر");
        }
      }

      const cartRes = await axios.get(`http://localhost:5000/api/cart/${userId}`);
      const count = cartRes.data.reduce((sum, i) => sum + i.quantity, 0);
      console.log("✅ cartCount after login/signup:", count);
      localStorage.setItem("cartCount", count);

      window.dispatchEvent(new Event("userUpdated"));
      window.dispatchEvent(new Event("cartUpdated"));

      setTimeout(() => {
        navigate('/');
        setIsSubmitting(false);
      }, 1500);

    } catch (err) {
      console.error("Auth error:", err);
      if (err.response && err.response.data.message) {
        setAlertMessage(err.response.data.message);
      } else if (
        err.response &&
        err.response.data.code === "ER_DUP_ENTRY" &&
        err.response.data.sqlMessage.includes("for key 'email'")
      ) {
        setAlertMessage("البريد الإلكتروني مستخدم بالفعل");
      } else {
        setAlertMessage("حدث خطأ أثناء العملية");
      }
      setAlertType('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="auth-page">
        <h2>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>

        {alertMessage && (
          <div className={`alert ${alertType}`}>
            {alertMessage}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && <input type="text" placeholder="الاسم الكامل" />}
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="password" placeholder="كلمة المرور" />
          <button type="submit" disabled={isSubmitting}>
            {isLogin ? 'دخول' : 'إنشاء حساب'}
          </button>
        </form>

        <p className="toggle-auth">
          {isLogin ? 'ليس لديك حساب؟' : 'هل لديك حساب؟'}{' '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginSignUp;