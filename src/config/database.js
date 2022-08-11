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
  host: 'ec2-35-168-122-84.compute-1.amazonaws.com',
  username: 'sovyfnywjvqpkv',
  password: '209f1913c46a374136734e4d729452493b38ea02400b1040e1622939b08f097f',
  database: 'd3bv6n743do4h8',
  // extra db config
define: {
  timestamps: true,
  underscored: true,
  underscoredAll: true,
},
};
