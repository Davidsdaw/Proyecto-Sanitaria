require('dotenv').config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("sanitaria", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;