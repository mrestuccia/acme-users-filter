const db = require('./_conn');

const User = db.define('user',
  {
    first: db.Sequelize.STRING,
    last: db.Sequelize.STRING,
    email: db.Sequelize.STRING,
    location: db.Sequelize.ARRAY(db.Sequelize.FLOAT)
  }, {
    classMethods: {
      getUsers: (letter) => {
        let filter = {};
        if (letter) {
          filter = { last: { $ilike: letter + '%' } };
        }
        return User.findAll({
          where: filter,
          order: 'last ASC'
        })
      },
      getMap: () => {
        return User.findAll({ order: 'last ASC' })
          .then((_users) => {
            users = _users;
            return users.reduce((hash, user) => {
              user = user.get();
              let key = user.last.slice(0, 1);
              hash[key] = (typeof hash[key] !== 'undefined') ? hash[key] : 0;
              hash[key]++;
              return hash;
            }, {})
          })
      }
    }
  });
module.exports = User;