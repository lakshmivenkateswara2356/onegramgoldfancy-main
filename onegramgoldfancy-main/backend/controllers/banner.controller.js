const Banner = require("../models/Banner");
const cloudinary = require("../config/cloudinary");

// GET all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD banner (CLOUDINARY)
exports.addBanner = async (req, res) => {
  try {
    const { title, paragraph, button_text } = req.body;

    if (!title || !paragraph || !button_text || !req.files?.image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        folder: "banners",
      }
    );

    const banner = await Banner.create({
      title,
      paragraph,
      button_text,
      image: uploadResult.secure_url, // ✅ Cloudinary URL
      active: true,
    });

    res.status(201).json(banner);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE banner status
exports.updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Not found" });

    banner.active = !banner.active;
    await banner.save();

    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (!banner) return res.status(404).json({ message: "Not found" });

    await banner.destroy();
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
