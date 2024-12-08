const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense','root','Manju1352@Microsoft',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;