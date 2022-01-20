const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
});

module.exports = User;
