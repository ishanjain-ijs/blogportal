const sequelize = require('../db/conn')
const Sequelize = require("sequelize");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force:false,match:/research-blog$/})
.then(()=>{
  console.log('yes re-sync')
})
db.admins = require("./admin")
db.posts = require("./post")
db.admins.hasMany(db.posts, {foreignKey: 'user_id'});
db.posts.belongsTo(db.admins, {foreignKey: 'user_id'})
module.exports = db;