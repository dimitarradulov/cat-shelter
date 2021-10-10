const express = require('express');
const router = express.Router();

const catServices = require('../services/catServices');

const home = (req, res) => {
  catServices
    .getAll()
    .then((cats) => {
      console.log(cats);
      res.render('home', { cats });
    })
    .catch((err) => {
      console.log(err);
    });
};

const search = async (req, res) => {
  const { search } = req.query;

  const cats = await catServices.search(search);

  res.render('home', { cats });
};

router.get('/', home);
router.get('/search', search);

module.exports = router;
