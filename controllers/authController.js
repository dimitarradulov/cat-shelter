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
      throw { message: 'Password mismatch!', isValidPassword: false };
    }

    await authService.register(username, password, repeatPassword);

    res.redirect('/login');
  } catch (e) {
    // TODO: Redirect to 404 page
    if (!e.isValidPassword) {
      res.status(400).send(e.message);
    }
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
      return res.redirect('/404');
    }

    const token = await authService.createToken(auth);

    res.cookie(constants.APP_TOKEN, token, {
      httpOnly: true,
    });

    res.redirect('/');
  } catch (e) {
    // TODO: Redirect to 404 page
    res.status(400).send('Error');
  }
});

module.exports = router;
