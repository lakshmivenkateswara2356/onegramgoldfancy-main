const pool = require("../config/db"); // pg pool

const User = {
  findByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0];
  },

  createUser: async ({ name, email, password, phone }) => {
    const result = await pool.query(
      `INSERT INTO users (name, email, password, phone)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, phone`,
      [name, email, password, phone]
    );
    return result.rows[0];
  },
};

module.exports = User;
