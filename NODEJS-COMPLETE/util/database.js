const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodejs", "postgres", "12345", {
  dialect: "postgres",
  host: "localhost",
});

module.exports = sequelize;
