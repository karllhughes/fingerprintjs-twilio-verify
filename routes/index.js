const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const user = req.session.user;
  const verified = req.session.verified;
  if (user && verified) {
    res.render('index', {user});
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
