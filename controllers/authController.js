const express = require('express');
const router = express.Router();

const authService = require('../services/authService');
const constants = require('../constants');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      throw { message: 'Password mismatch!' };
    }

    await authService.register(username, password, repeatPassword);

    res.redirect('/login');
  } catch (error) {
    res.render('auth/register', { error });
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const auth = await authService.login(username, password);

    if (!auth) {
      throw { message: 'Username or password does not match!' };
    }

    const token = await authService.createToken(auth);

    res.cookie(constants.APP_TOKEN, token, {
      httpOnly: true,
    });

    res.redirect('/');
  } catch (error) {
    res.render('auth/login', { error });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie(constants.APP_TOKEN);
  res.redirect('/');
});

module.exports = router;
