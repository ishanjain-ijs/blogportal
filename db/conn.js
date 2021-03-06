const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "ctresearch-blogs.database.windows.net",
    dialect: "mssql",
  },  
);
sequelize.sync();
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
module.exports = sequelize;
