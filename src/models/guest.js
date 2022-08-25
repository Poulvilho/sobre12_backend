const { Sequelize } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Trip = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Guest = sequelize.define('guests', {
    user: Sequelize.STRING,
    trip: Sequelize.STRING,
    role: Sequelize.INTEGER,
});

Guest.removeAttribute('id');

Guest.belongsTo(User, { foreignKey: 'user' });
Guest.belongsTo(Trip, { foreignKey: 'trip'});

Trip.belongsToMany(User, { 
    through: 'guests', foreignKey: 'trip', as: 'guest',
});
User.belongsToMany(Trip, {
    through: 'guests', foreignKey: 'user', as: 'sharedTrip',
});

module.exports = Guest;
