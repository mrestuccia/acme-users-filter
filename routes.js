const router = require('express').Router();
const db = require('./db');

// All
router.get('/', (req, res, next) => {
  let letter = ''
  Promise.all([db.Models.User.getMap(), db.Models.User.getUsers()])
    .then(([map, users]) => {
      res.render('index', { map, users, letter });
    })
})

// Filter
router.get('/users/filter/:letter', (req, res, next) => {
  let letter = req.params.letter;

  Promise.all([db.Models.User.getMap(), db.Models.User.getUsers(letter)])
    .then(([map, users]) => {
      res.render('index', { map, users, letter });
    })
})

// Re-seeding
router.post('/regenerate', (req, res, next) => {
  db.seed()
    .then(() => {
      return res.redirect('/');
    });
})



module.exports = router;