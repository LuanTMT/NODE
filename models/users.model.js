const { urlencoded } = require('express');
const { Sequelize, DataTypes} = require('sequelize');
const config = require('../config/bd');
const { use } = require('../router/users.router');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
const modelName = "luan";
const User = sequelize.define(modelName, {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  age: {
    type: DataTypes.TINYINT,
  }
}, {
  // Other model options go here
});
// User.sync ({ force:true});
module.exports = {User, sequelize}