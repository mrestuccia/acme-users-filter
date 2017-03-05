const faker = require('faker/locale/en_US');


const _conn = require('./_conn');
const User = require('./User');

const seed = () => {

  for (var i = 0; i < 100; i++) {
    let first = faker.name.firstName();
    let last = faker.name.lastName();
    let email = faker.internet.email();

    User.create({ first: first, last: last, email: email, location: [1, 2] });
  }
}

const sync = () => {
  return _conn.sync({ force: true });
}

module.exports = {
  sync,
  seed,
  Models: { User }
}