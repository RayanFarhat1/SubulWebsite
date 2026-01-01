require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'subul'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ MySQL connected');
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// ---------------- USERS ----------------


app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "خطأ في التشفير" });

      const q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
      db.query(q, [name, email, hashedPassword], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json({ message: "تم إنشاء الحساب بنجاح", userId: data.insertId });
      });
    });
  });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(401).json({ message: "البريد الإلكتروني غير موجود" });

    const user = data[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "خطأ في التحقق" });
      if (!isMatch) return res.status(401).json({ message: "كلمة المرور غير صحيحة" });

      return res.json({ message: "تم تسجيل الدخول بنجاح", user: { id: user.id, name: user.name, email: user.email } });
    });
  });
});

// ---------------- PRODUCTS ----------------
app.get('/api/products', (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

// ---------------- FAVORITES ----------------
app.get('/api/favorites/:userId', (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT p.* FROM favorites f JOIN products p ON f.product_id = p.id WHERE f.user_id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post('/api/favorites', (req, res) => {
  const { user_id, product_id } = req.body;
  const q = "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)";
  db.query(q, [user_id, product_id], (err) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "تمت الإضافة إلى المفضلة" });
  });
});


app.delete('/api/favorites/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const q = "DELETE FROM favorites WHERE user_id = ? AND product_id = ?";
  db.query(q, [userId, productId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "تمت إزالة المنتج من المفضلة" });
  });
});

// ---------------- CART ----------------
app.get('/api/cart/:userId', (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT p.*, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});


app.post('/api/cart', (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const check = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
  db.query(check, [user_id, product_id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      const update = "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?";
      db.query(update, [quantity, user_id, product_id], (err) => {
        if (err) return res.status(500).json(err);

        const q = "SELECT p.*, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?";
        db.query(q, [user_id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json(data);
        });
      });
    } else {
      const insert = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
      db.query(insert, [user_id, product_id, quantity], (err) => {
        if (err) return res.status(500).json(err);

        const q = "SELECT p.*, c.quantity FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?";
        db.query(q, [user_id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json(data);
        });
      });
    }
  });
});


app.put('/api/cart/:userId/:productId', (req, res) => {
  const { quantity } = req.body;
  const { userId, productId } = req.params;
  const q = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?";
  db.query(q, [quantity, userId, productId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "تم تحديث الكمية" });
  });
});


app.delete('/api/cart/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const q = "DELETE FROM cart WHERE user_id = ? AND product_id = ?";
  db.query(q, [userId, productId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "تمت إزالة المنتج من السلة" });
  });
});

// ---------------- ORDERS ----------------
app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT o.*, p.name AS product_name FROM orders o JOIN products p ON o.product_id = p.id WHERE o.user_id = ?";
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post('/api/orders', (req, res) => {
  const { user_id, product_id, quantity, purchase_price, phone, address } = req.body;
  const q = "INSERT INTO orders (user_id, product_id, quantity, purchase_price, phone, address) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(q, [user_id, product_id, quantity, purchase_price, phone, address], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "تم إنشاء الطلب", orderId: data.insertId });
  });
});

// ---------------- START SERVER ----------------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));