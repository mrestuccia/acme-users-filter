const faker = require('faker/locale/en_US');

const _conn = require('./_conn');
const User = require('./User');

const seed = () => {
  let promise = [];
  for (var i = 0; i < 100; i++) {
    // Set the variables
    let first = faker.name.firstName();
    let last = faker.name.lastName();
    let email = faker.internet.email();
    let location = faker.helpers.userCard().address.geo;

    // Push the creation of the data
    promise.push(User.create({ first: first, last: last, email: email, location: [location.lat, location.lng] }));
  }
  return Promise.all(promise)
}

const sync = () => {
  return _conn.sync({ force: true });
}

module.exports = {
  sync,
  seed,
  Models: { User }
}