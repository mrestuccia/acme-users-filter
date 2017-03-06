const router = require('express').Router();
const db = require('./db');


router.get('/', (req, res, next) => {
  Promise.all([db.Models.User.getMap(), db.Models.User.getUsers()])
    .then(([map, users]) => {
      res.render('index', { map, users });
    })
})

router.get('/users/filter/:letter', (req, res, next) => {
  let letter = req.params.letter;

  Promise.all([db.Models.User.getMap(), db.Models.User.getUsers(letter)])
    .then(([map, users]) => {
      res.render('index', { map, users });
    })
})

router.post('/regenerate', (req, res, next) => {
  db.seed()
    .then(() => {
      return res.redirect('/');
    });
})



module.exports = router;