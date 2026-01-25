const adminAuth = (req, res, next) => {
  // req.user comes from auth.middleware.js
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access denied"
    });
  }

  next();
};

module.exports = adminAuth;
