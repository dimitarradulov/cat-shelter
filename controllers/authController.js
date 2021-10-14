const express = require('express');
const router = express.Router();

const authService = require('../services/authService');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/register', async (req, res) => {
  const { username, password, repeatPassword } = req.body;

  await authService.register(username, password, repeatPassword);

  res.redirect('/login');
});

module.exports = router;
