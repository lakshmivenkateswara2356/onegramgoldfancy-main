const pool = require("../config/db");

module.exports = {
  getAllBanners: async () => {
    const { rows } = await pool.query(
      "SELECT * FROM banners ORDER BY id DESC"
    );
    return rows;
  },

  create: async ({ title, paragraph, button_text, image, active }) => {
    const { rows } = await pool.query(
      `INSERT INTO banners (title, paragraph, button_text, image, active)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, paragraph, button_text, image, active]
    );
    return rows[0];
  },

  update: async (id, data) => {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in data) {
      if (data[key] !== undefined) {
        fields.push(`${key}=$${index}`);
        values.push(data[key]);
        index++;
      }
    }

    values.push(id);

    const { rows } = await pool.query(
      `UPDATE banners SET ${fields.join(", ")} WHERE id=$${index} RETURNING *`,
      values
    );

    return rows[0];
  },

  delete: async (id) => {
    await pool.query("DELETE FROM banners WHERE id=$1", [id]);
  },
};
