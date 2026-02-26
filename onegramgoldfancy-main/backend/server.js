require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// ✅ Import DB connection (update config/db.js to use DATABASE_URL)
const pool = require("./config/db");

const app = express();

// -------------------- CORS --------------------
app.use(
  cors({
    origin: [
      "https://amalapuramammayisri.com",
      "https://onegramgoldfancyadmin.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES --------------------
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/banners", require("./routes/banners.routes"));
app.use("/api/wishlist", require("./routes/wishlist.routes"));
app.use("/api/users", require("./routes/users.routes"));

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
  .then(() => {
    console.log("✅ PostgreSQL connected successfully");

    // ⚡ OPTIONAL: check if tables exist (example)
    pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public';
    `)
      .then(res => console.log("Tables in DB:", res.rows.map(r => r.table_name)))
      .catch(err => console.error("Error fetching tables:", err.message));
  })
  .catch((err) =>
    console.error("❌ PostgreSQL connection failed:", err.message)
  );

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));