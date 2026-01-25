const cloudinary = require("../config/cloudinary");
const pool = require("../config/db");

// ---------------- ADD BANNER ----------------
exports.addBanner = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const { title, paragraph, buttonText } = req.body;

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "banners" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const dbResult = await pool.query(
      `INSERT INTO banners (title, paragraph, button_text, image)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, paragraph, buttonText, imageUrl]
    );

    res.status(201).json(dbResult.rows[0]);
  } catch (err) {
    console.error("ADD BANNER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ---------------- GET BANNERS ----------------
exports.getBanners = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM banners ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET BANNER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ---------------- UPDATE BANNER ----------------
exports.updateBanner = async (req, res) => {
  try {
    const { title, paragraph, buttonText } = req.body;
    let imageUrl;

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "banners" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const query = imageUrl
      ? `UPDATE banners
         SET title=$1, paragraph=$2, button_text=$3, image=$4
         WHERE id=$5 RETURNING *`
      : `UPDATE banners
         SET title=$1, paragraph=$2, button_text=$3
         WHERE id=$4 RETURNING *`;

    const values = imageUrl
      ? [title, paragraph, buttonText, imageUrl, req.params.id]
      : [title, paragraph, buttonText, req.params.id];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("UPDATE BANNER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// ---------------- DELETE BANNER ----------------
exports.deleteBanner = async (req, res) => {
  try {
    await pool.query("DELETE FROM banners WHERE id=$1", [
      req.params.id,
    ]);
    res.json({ message: "Banner deleted" });
  } catch (err) {
    console.error("DELETE BANNER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
