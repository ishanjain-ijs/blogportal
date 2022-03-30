const Sequelize = require('sequelize')
const sequelize = require("../db/conn");

const Post = sequelize.define("Post", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  desc: {
      type: Sequelize.STRING,
      allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Author: {
    type: Sequelize.STRING,
    // allowNull: false
  },
//   category: {
//       type: Sequelize.STRING,
//   },
  // user_id: {
  //     type: Sequelize.INTEGER
  // }
});

module.exports = Post;