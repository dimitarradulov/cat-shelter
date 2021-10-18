const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');

const catServices = require('../services/catServices');
const breedsServices = require('../services/breedsServices');

const renderEditCat = async (req, res) => {
  if (!req.user) {
    return res.redirect('/404');
  }

  try {
    const cat = await catServices.getOne(req.params.catId);
    const breeds = await breedsServices.getAll();

    if (cat.creatorId.toString() !== req.user._id) {
      return res.redirect('404');
    }

    res.render('editCat', { cat, breeds });
  } catch (error) {
    res.redirect(400, '/404');
  }
};

const updateEditCat = (req, res) => {
  Cat.findByIdAndUpdate(req.params.catId, req.body)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      res.render('editCat', { error });
    });
};

router.get('/cats/edit/:catId', renderEditCat);
router.post('/cats/edit/:catId', updateEditCat);

module.exports = router;
