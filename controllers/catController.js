const express = require('express');
const router = express.Router();

const catServices = require('../services/catServices');
const breedsServices = require('../services/breedsServices');

const renderAddCat = (req, res) => {
  breedsServices
    .getAll()
    .then((breeds) => {
      res.render('addCat', { breeds });
    })
    .catch((err) => {
      console.log('There is a problem:');
      console.log(err);
    });
};

const createCat = (req, res) => {
  const { name, description, image, breed } = req.body;

  catServices
    .create(name, description, image, breed)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('There is a problem:');
      console.log(err);
    });
};

router.get('/cats/add-cat', renderAddCat);
router.post('/cats/add-cat', createCat);

module.exports = router;
