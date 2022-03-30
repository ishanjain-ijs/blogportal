const Sequelize = require('sequelize')
const sequelize = require("../db/conn");

const Admin = sequelize.define("Admin", {
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//   },
//   fullName: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
  username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique:true
      
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Admin;