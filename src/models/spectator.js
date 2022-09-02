const { Sequelize } = require('sequelize');
const config = require('../config/database');

const User = require('./user');
const Trip = require('./trip');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config
);

const Spectator = sequelize.define('spectators', {
    user: Sequelize.STRING,
    trip: Sequelize.STRING,
    spectated: Sequelize.STRING,
});

Spectator.removeAttribute('id');

Spectator.belongsTo(User, { foreignKey: 'user', as: 'spectator' });
Spectator.belongsTo(User, { foreignKey: 'spectated' });
Spectator.belongsTo(Trip, { foreignKey: 'trip' });
Trip.hasMany(Spectator, { foreignKey: 'trip' });

module.exports = Spectator;
