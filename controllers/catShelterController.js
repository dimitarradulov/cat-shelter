const express = require('express');
const router = express.Router();

const Cat = require('../models/Cat');

const catServices = require('../services/catServices');

const renderCatShelter = async (req, res) => {
  try {
    const cat = await catServices.getOne(req.params.catId);

    res.render('catShelter', { cat });
  } catch (erorr) {
    res.redirect(400, '/404');
  }
};

const shelterCat = (req, res) => {
  Cat.findByIdAndRemove(req.params.catId)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      res.render('catShelter', { error });
    });
};

router.get('/cats/shelter/:catId', renderCatShelter);
router.post('/cats/shelter/:catId', shelterCat);

module.exports = router;
