require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import routes
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const bannerRoutes = require("./routes/banners.routes");

// Import database pool
const pool = require("./config/db"); // make sure the path is correct

const app = express();

// -------------------- CORS --------------------
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/banners", bannerRoutes);


app.get("/api/orders/test", async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.json(orders.rows);
  } catch (err) {
    console.error("Test route error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- ROOT --------------------
app.get("/", (req, res) => {
  res.send("Backend server running 🚀");
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
