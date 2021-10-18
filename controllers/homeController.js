const express = require('express');
const router = express.Router();

const catServices = require('../services/catServices');

const home = (req, res) => {
  catServices
    .getAll()
    .then((cats) => {
      res.render('home', { cats });
    })
    .catch(() => {
      res.redirect(400, '/404');
    });
};

const search = async (req, res) => {
  const { search } = req.query;

  try {
    const cats = await catServices.search(search);
    res.render('home', { cats });
  } catch (error) {
    res.redirect(400, '/404');
  }
};

router.get('/', home);
router.get('/search', search);

module.exports = router;
