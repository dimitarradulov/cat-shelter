const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/register', (req, res) => {
  console.log(req.body);

  res.redirect('/login');
});

module.exports = router;
