const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    validated: DataTypes.BOOLEAN,
}, {
    defaultScope: { attributes: { exclude: [ 'password' ] } },      
});

module.exports = User;
