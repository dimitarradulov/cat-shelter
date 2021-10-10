const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');

const catServices = require('../services/catServices');
const breedsServices = require('../services/breedsServices');

const renderEditCat = async (req, res) => {
  const cat = await catServices.getOne(req.params.catId);
  const breeds = await breedsServices.getAll();

  res.render('editCat', { cat, breeds });
};

const uptadeEditCat = (req, res) => {
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
router.post('/cats/edit/:catId', uptadeEditCat);

module.exports = router;
