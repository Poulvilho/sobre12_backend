// module.exports = {
//     dialect: 'postgres',
//     host: 'db',
//     username: 'sobre12_user',
//     password: 'sobre12_password',
//     database: 'sobre12_database',
//     // extra db config
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  host: 'ec2-44-208-88-195.compute-1.amazonaws.com',
  username: 'ldbetebjpibjaf',
  password: 'c2e866ff31a0c353a39f23def05a24f912fff535e8ac9457b70c59a39aafb9cf',
  database: 'db2sjok8onc9ug',
  // extra db config
define: {
  timestamps: true,
  underscored: true,
  underscoredAll: true,
},
};
