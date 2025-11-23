import React from 'react';
import '../styles/About.css';
import aboutBg from '../assets/about_background2.jpg';

function AboutUs() {
  return (
    <div className="about-wrapper">
      <img src={aboutBg} alt="خلفية زخرفية" className="about-background" />
      <div className="about-overlay">
        <div className="about-content">
          <h2>قصتنا</h2>
          <p>
            سُبُل متجر إسلامي ثقافي، تمّ تأسيسه في أواخر عام ٢٠٢٣ بهدف أساسيّ تقريب فئة الشباب من الله، من طريق واحد وهو أهل البيت (ع) فهم الطريق لله والمسلك إلى رضوانه.
          </p>
          <p>
           وقد نلنا الترحيب الواسع من بيئتنا ، حيث حملنا ما بقلوبهم حتى غدونا في كلّ بيت .
في البدايات، اُغلقت صفحتنا ، فبدأنا من الصفر ثمّ الحرب والتهجير وما استسلمنا ، واستمرت التحديات حتى خسرنا كلّ التعب الذي استمر خلال السنة وخسرنا صفحتنا مجدداً.
لكنّ هذه المصاعب لم تضعفنا، بدأنا مجدداً ، ومستمرين إن شاء الله في احياء نهج اهل البيت (ع) ونشره باعمالنا الولائية.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;