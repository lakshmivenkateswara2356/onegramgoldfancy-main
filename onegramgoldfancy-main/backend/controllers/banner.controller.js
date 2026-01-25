const Banner = require("../models/banner.model");
const cloudinary = require("../config/cloudinary");

exports.addBanner = async (req, res) => {
  try {
    const { title, paragraph, button_text } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "banners" },
        (err, result) => (err ? reject(err) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const banner = await Banner.create({
      title,
      paragraph,
      button_text,
      image: result.secure_url,
      active: true,
    });

    res.status(201).json(banner);
  } catch (err) {
    console.error("Add banner error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.getAllBanners();
    res.json(banners);
  } catch (err) {
    console.error("Fetch banners error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { title, paragraph, button_text, active } = req.body;
    const updateData = { title, paragraph, button_text, active };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "banners" },
          (err, result) => (err ? reject(err) : resolve(result))
        );
        stream.end(req.file.buffer);
      });
      updateData.image = result.secure_url;
    }

    const banner = await Banner.update(req.params.id, updateData);
    res.json(banner);
  } catch (err) {
    console.error("Update banner error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    await Banner.delete(req.params.id);
    res.json({ message: "Banner deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
