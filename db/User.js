const db = require('./_conn');

const User = db.define('user',{
  first: db.Sequelize.STRING,
  last: db.Sequelize.STRING,
  email: db.Sequelize.STRING,
  location:  db.Sequelize.ARRAY(db.Sequelize.FLOAT)
});

module.exports = User;

