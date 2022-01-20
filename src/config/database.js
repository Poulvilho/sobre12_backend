module.exports = {
    dialect: 'postgres',
    host: 'db',
    username: 'sobre12_user',
    password: 'sobre12_password',
    database: 'sobre12_database',
    // extra db config
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
