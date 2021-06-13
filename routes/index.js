const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.session.user;
  if (user) {
    res.render('index', {user});
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
