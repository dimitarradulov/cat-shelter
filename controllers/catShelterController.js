const express = require('express');
const router = express.Router();

const Cat = require('../models/Cat');

const catServices = require('../services/catServices');

const renderCatShelter = async (req, res) => {
  const cat = await catServices.getOne(req.params.catId);

  res.render('catShelter', { cat });
};

const shelterCat = (req, res) => {
  Cat.findByIdAndRemove(req.params.catId)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

router.get('/cats/shelter/:catId', renderCatShelter);
router.post('/cats/shelter/:catId', shelterCat);

module.exports = router;
