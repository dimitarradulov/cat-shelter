const express = require('express');
const router = express.Router();

const authService = require('../services/authService');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  await authService.register(username, password, repeatPassword);

  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const auth = await authService.login(username, password);

  if (auth) {
    res.redirect('/');
  } else {
    res.redirect('/404');
  }
});

module.exports = router;
