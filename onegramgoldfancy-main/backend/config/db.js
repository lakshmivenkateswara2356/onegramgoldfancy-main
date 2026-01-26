// Import pg
const { Pool } = require("pg");

// Create a new PostgreSQL Pool
// Works both locally (with DATABASE_URL in .env) and on Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Single env variable from Render
  ssl: {
    rejectUnauthorized: false, // Required on Render
  },
});

// Test the connection immediately
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection failed:", err.message));

// Export pool to use in your routes/controllers
module.exports = pool;
