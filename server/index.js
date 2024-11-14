import express from "express";
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, "database.sqlite"));
const app = express();
const port = process.env.PORT || 3000;

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image TEXT,
    available BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    total REAL NOT NULL,
    status TEXT DEFAULT 'pending',
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER,
    productId INTEGER,
    quantity INTEGER NOT NULL,
    rentalDays INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY(orderId) REFERENCES orders(id),
    FOREIGN KEY(productId) REFERENCES products(id)
  );
`);

// Create default admin user if not exists
const createDefaultAdmin = db.prepare(`
  INSERT OR IGNORE INTO users (username, password, isAdmin)
  VALUES (?, ?, TRUE)
`);

const defaultAdminPassword = process.env.ADMIN_PASSWORD || "admin123";
const hashedPassword = bcrypt.hashSync(defaultAdminPassword, 10);
createDefaultAdmin.run("admin", hashedPassword);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(join(__dirname, "uploads")));

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET || "your-secret-key",
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  next();
};

// Auth routes
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "24h" }
  );

  res.json({ token });
});

// Product routes
app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post(
  "/api/products",
  authenticateToken,
  isAdmin,
  upload.single("image"),
  (req, res) => {
    const { name, category, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = db
      .prepare(
        `
    INSERT INTO products (name, category, price, description, image)
    VALUES (?, ?, ?, ?, ?)
  `
      )
      .run(name, category, price, description, image);

    res.status(201).json({ id: result.lastInsertRowid });
  }
);

app.put(
  "/api/products/:id",
  authenticateToken,
  isAdmin,
  upload.single("image"),
  (req, res) => {
    const { name, category, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateFields = [];
    const values = [];

    if (name) {
      updateFields.push("name = ?");
      values.push(name);
    }
    if (category) {
      updateFields.push("category = ?");
      values.push(category);
    }
    if (price) {
      updateFields.push("price = ?");
      values.push(price);
    }
    if (description) {
      updateFields.push("description = ?");
      values.push(description);
    }
    if (image) {
      updateFields.push("image = ?");
      values.push(image);
    }

    if (updateFields.length === 0)
      return res.status(400).json({ error: "No fields to update" });

    values.push(req.params.id);

    const result = db
      .prepare(
        `
    UPDATE products 
    SET ${updateFields.join(", ")}
    WHERE id = ?
  `
      )
      .run(...values);

    if (result.changes === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  }
);

app.delete("/api/products/:id", authenticateToken, isAdmin, (req, res) => {
  const result = db
    .prepare("DELETE FROM products WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0)
    return res.status(404).json({ error: "Product not found" });
  res.json({ success: true });
});

// Order routes
app.post("/api/orders", authenticateToken, (req, res) => {
  const { items, total, startDate, endDate } = req.body;

  const order = db
    .prepare(
      `
    INSERT INTO orders (userId, total, startDate, endDate)
    VALUES (?, ?, ?, ?)
  `
    )
    .run(req.user.id, total, startDate, endDate);

  const insertItem = db.prepare(`
    INSERT INTO order_items (orderId, productId, quantity, rentalDays, price)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const item of items) {
    insertItem.run(
      order.lastInsertRowid,
      item.id,
      item.quantity,
      item.rentalDays,
      item.price
    );
  }

  res.status(201).json({ id: order.lastInsertRowid });
});

app.get("/api/orders", authenticateToken, (req, res) => {
  const orders = db
    .prepare(
      `
    SELECT o.*, json_group_array(
      json_object(
        'id', oi.productId,
        'quantity', oi.quantity,
        'rentalDays', oi.rentalDays,
        'price', oi.price,
        'name', p.name,
        'image', p.image
      )
    ) as items
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.orderId
    LEFT JOIN products p ON oi.productId = p.id
    WHERE o.userId = ?
    GROUP BY o.id
    ORDER BY o.createdAt DESC
  `
    )
    .all(req.user.id);

  res.json(orders);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
