// backend/models/Banner.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // your DB connection

const Banner = sequelize.define("Banner", {
  title: DataTypes.STRING,
  paragraph: DataTypes.TEXT,
  button_text: DataTypes.STRING,
  image: DataTypes.STRING,
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Banner;
