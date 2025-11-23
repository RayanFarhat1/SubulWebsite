import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignUp.css';

function LoginSignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // success أو error
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formElements = e.target.elements;
    const name = !isLogin ? formElements[0].value.trim() : null;
    const email = isLogin ? formElements[0].value.trim() : formElements[1].value.trim();
    const password = isLogin ? formElements[1].value.trim() : formElements[2].value.trim();

    if (!email || !password || (!isLogin && !name)) {
      setAlertMessage('يرجى تعبئة جميع الحقول المطلوبة');
      setAlertType('error');
      return;
    }

    // هنا منطق التحقق أو الاتصال بالسيرفر
    const success = true;

    if (success) {
      setAlertMessage(isLogin ? 'تم تسجيل الدخول بنجاح!' : 'تم إنشاء الحساب بنجاح!');
      setAlertType('success');

      setTimeout(() => {
        navigate('/');
      }, 1500); // ينتظر ثانية ونصف قبل الانتقال
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
          <button type="submit">{isLogin ? 'دخول' : 'إنشاء حساب'}</button>
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