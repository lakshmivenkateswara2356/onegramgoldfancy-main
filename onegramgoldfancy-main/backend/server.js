require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// ✅ Import DB connection
const pool = require("./config/db");

// Routes
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const bannerRoutes = require("./routes/banners.routes");

const app = express();

// -------------------- CORS --------------------
app.use(
  cors({
    origin: [
    "https://onegramgoldfancy-main.vercel.app",
    "https://onegramgoldfancy-main-6x68.vercel.app",
   
  ], // replace with frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/banners", bannerRoutes);

// -------------------- ROOT --------------------
app.get("/", (req, res) => {
  res.send("Backend server running 🚀");
});

// -------------------- TEST DB --------------------
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ success: true, time: result.rows[0] });
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection failed:", err.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
