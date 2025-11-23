import React, { useState } from 'react';
import '../styles/Menu.css';

// Books
import book1 from '../assets/abaad-chakhsiyat.png';
import book2 from '../assets/asser.png';
import book3 from '../assets/imamzaman.png';
import book4 from '../assets/imam-reda.png';
import book5 from '../assets/amr.png';
import book6 from '../assets/kilada.png';
import book7 from '../assets/حافظ رسالة.png';
import book8 from '../assets/حامل راية.png';
import book9 from '../assets/مع ابي.png';
import book10 from '../assets/aarefan.jpg';

// Notebooks
import ntbook1 from '../assets/A6-CHAMS.png';
import ntbook2 from '../assets/A6-EMLSH.png';
import ntbook3 from '../assets/A6-Saheb.png';
import ntbook4 from '../assets/sayednotebook.jpg';
import ntbook5 from '../assets/hajkassemntbook.jpg';

// Boxes
import box1 from '../assets/صندوق2.png';
import box2 from '../assets/صندوق-الزهراء.png';
import box3 from '../assets/صندوق-امام-رضا.png';
import box4 from '../assets/sayedbox.jpg';

// Distribution
import distr1 from '../assets/distribution1.jpg';
import distr2 from '../assets/distribution2.jpg';
import distr3 from '../assets/distribution3.jpg';
import distr4 from '../assets/distribution4.jpg';
import distr5 from '../assets/distribution5.jpg';

// Design
import design1 from '../assets/design1.jpg';
import design2 from '../assets/design2.jpg';
import design3 from '../assets/design3.jpg';
import design4 from '../assets/design4.jpg';
import design5 from '../assets/design5.jpg';

// Print
import print1 from '../assets/print1.jpg';
import print2 from '../assets/print2.jpg';
import print3 from '../assets/print3.jpg';
import print4 from '../assets/print4.jpg';
import print5 from '../assets/print5.jpg';

// Misc
import mix1 from '../assets/mix1.jpg';
import mix2 from '../assets/mix2.jpg';
import mix3 from '../assets/mix3.jpg';
import mix4 from '../assets/mix4.jpg';
import mix5 from '../assets/mix5.jpg';

const items = [
  { id: 1, title: "أبعاد شخصيّة السيّدة الزهراء(ع)", author: "الشيخ فادي ياسين", price: "15", image: book1, type: "book" },
  { id: 2, title: "كالأسير المرتهن", author: "عبدالله العلي", price: "15", image: book2, type: "book" },
  { id: 3, title: "هل تعرف إمام زمانك؟", author:"د.بلال نعيم", price: "15", image: book3, type: "book" },
  { id: 4, title: "لمحات من حياة الإمام الرضا(ع)و أخته فاطمة المعصومة(ع)", author: "الشيخ أيوب الحائري", price: "15", image: book4, type: "book" },
  { id: 5, title: "أمر النار بيدك", author: "حجت ايرفاني", price: "15", image: book5, type: "book" },
  { id: 6, title: "القلادة رقم 60", author:"مريم مصطفى", price: "15", image: book6, type: "book" },
  { id: 7, title: "حافظ رسالة الإسلام", author:"السيد حسن نصرالله", price: "15", image: book7, type: "book" },
  { id: 8, title: "حامل راية كربلاء", author:"السيد حسن نصرالله", price: "15", image: book8, type: "book" },
  { id: 9, title: "ذكرياتي مع أبي", author: "محمد مهدي نصرالله", price: "15", image: book9, type: "book" },
  { id: 10, title: "عارفًا بحقّك", author: "سبل", price: "15", image: book10, type: "book" },

  { id: 11, title: "مفكرة شمس الشموس", author: "", price: "7", image: ntbook1, type: "notebook" },
  { id: 12, title: "مفكرة فاطمة أم الشهداء", author: "", price: "7", image: ntbook2, type: "notebook" },
  { id: 13, title: "مفكرة يا صاحب الزمان", author: "", price: "7", image: ntbook3, type: "notebook" },
  { id: 14, title: "مفكرة حسب الطلب", author: "", price: "7", image: ntbook4, type: "notebook" },
  { id: 15, title: "مفكرة حسب الطلب", author: "", price: "7", image: ntbook5, type: "notebook" },

  { id: 16, title: "صندوق الشهادة", author: "", price: "20", image: box1, type: "box" },
  { id: 17, title: "صندوق السيدة الزهراء(ع)", author: "", price: "20", image: box2, type: "box" },
  { id: 18, title: "صندوق الإمام الرضا(ع)", author: "", price: "20", image: box3, type: "box" },
  { id: 19, title:"صندوق حسب الطلب", author: "", price: "", image: box4, type: "box" },

  { id: 20, title: "توزيعات حسب الطلب", author: "", price: "", image: distr1, type: "distribution" },
  { id: 21, title: "توزيعات حسب الطلب", author: "", price: "", image: distr2, type: "distribution" },
  { id: 22, title: "توزيعات حسب الطلب", author: "", price: "", image: distr3, type: "distribution" },
  { id: 23, title: "توزيعات حسب الطلب", author: "", price: "", image: distr4, type: "distribution" },
  { id: 24, title: "توزيعات حسب الطلب", author: "", price: "", image: distr5, type: "distribution" },

  { id: 25, title: "تصميم حسب الطلب", author:"", price: "10", image: design1, type: "design" },
  { id: 26, title: "تصميم حسب الطلب", author:"", price: "10", image: design2, type: "design" },
  { id: 27, title: "تصميم حسب الطلب", author:"", price: "10", image: design3, type: "design" },
  { id: 28, title: "تصميم حسب الطلب", author:"", price: "10", image: design4, type: "design" },
  { id: 29, title: "تصميم حسب الطلب", author:"", price: "10", image: design5, type: "design" },

  { id: 30, title: "تعليقة سيارة حسب الطلب", author: "", price: "4", image: print1, type: "print" },
  { id: 31, title: "صور تذكارية", author: "", price: "2", image: print2, type: "print" },
  { id: 32, title: "صور حسب الطلب", author: "", price: "3", image: print3, type: "print" },
  { id: 33, title: "تعليقة مفاتيح حسب الطلب", author: "", price: "3", image: print4, type: "print" },
  { id: 34, title: "قلادة حسب الطلب", author: "", price: "4", image: print5, type: "print" },

  { id: 35, title: "زاد المؤمن", author: "", price: "5", image: mix1, type: "misc" },
  { id: 36, title:"تعليقة", author: "", price: "2", image: mix2, type: "misc" },
  { id: 37, title: "حافظة سجدة", author: "", price: "3", image: mix3, type: "misc" },
  { id: 38, title: "حافظة سجدة حسب الطلب", author: "", price: "4", image: mix4, type: "misc" },
  { id: 39, title: "مغناطيس للبراد", author: "", price: "2", image: mix5, type: "misc" },
];

function Shop({ addToFavorites, addToCart }) {
  const [filterType, setFilterType] = useState('all');

  // Group items by type
  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.type]) groups[item.type] = [];
    groups[item.type].push(item);
    return groups;
  }, {});

  // Filtered groups
  const filteredItems =
    filterType === 'all' ? groupedItems : { [filterType]: groupedItems[filterType] };

  // Scroll to section on specific filter
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
                return (
                  <div className="shop-card" key={item.id}>
                    <div className="card-actions">
                      <button
                        className="favorite-button"
                        onClick={() => addToFavorites(item)}
                        title="أضف إلى المفضلة"
                      >
                        ❤️
                      </button>
                    </div>

                    <img src={item.image} alt={item.title} />
                    <h4>{item.title}</h4>

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