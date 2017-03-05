const router = require('express').Router();
const db = require('./db');


router.get('/', (req, res, next) => {
  let users;
  db.Models.User.findAll()
    .then(_users => {
      users = _users;
      console.log('users====>',_users);
      return users.reduce((hash, user) => {
        let key = user.last.slice(0, 1);
        hash[key] = (typeof hash[key] !== 'undefined') ? hash[key] : 0;
        hash[key]++;
        return hash;
      }, {})
    }).then((map) => {
      res.render('index', { map, users });
    })
})

router.get('/users/filter/:letter', (req, res, next) => {
  let letter = request.params.letter;
  let users;
  console.log('filtering letter', letter);
  db.Models.User.findAll({ where: { last: { $like: letter + '%' } } })
    .then((_users) => {
      users = _users;
      return users.reduce((hash, user) => {
        let key = user.last.slice(0, 1);
        hash[key] = (typeof hash[key] !== 'undefined') ? hash[key] : 0;
        hash[key]++;
        return hash;
      }, {})
    }).then((map) => {
      res.render('index', { map, users });
    })
})

router.post('/regenerate', (req, res, next) => {
  db.seed()
    .then(() => {
      res.redirect('/');
    });
})



module.exports = router;