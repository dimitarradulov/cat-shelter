const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');

const catServices = require('../services/catServices');
const breedsServices = require('../services/breedsServices');

const renderEditCat = async (req, res) => {
  if (!req.user) {
    return res.status(401).redirect('/404');
  }

  const cat = await catServices.getOne(req.params.catId);
  const breeds = await breedsServices.getAll();

  res.render('editCat', { cat, breeds });
};

const updateEditCat = (req, res) => {
  Cat.findByIdAndUpdate(req.params.catId, req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log('error');
      console.log(error);
    });
};

router.get('/cats/edit/:catId', renderEditCat);
router.post('/cats/edit/:catId', updateEditCat);

module.exports = router;
