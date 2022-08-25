const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    validated: Sequelize.BOOLEAN,
}, {
    defaultScope: { attributes: { exclude: [ 'password' ] } },      
});

module.exports = User;
