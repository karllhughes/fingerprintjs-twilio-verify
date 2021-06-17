const express = require('express');
const router = express.Router();
const users = [
  {
    id: 1,
    username: 'karl',
    password: 'abc123',
  },
];

const authenticate = (username, password) => {
  return username && password && users.find(user => user.username === username && user.password === password);
}

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', (req, res) => {
  const session = req.session;
  const user = authenticate(req.body.username, req.body.password);
  if (user) {
    session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
