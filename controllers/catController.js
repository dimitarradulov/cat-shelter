const express = require('express');
const router = express.Router();

const catServices = require('../services/catServices');
const breedsServices = require('../services/breedsServices');

const User = require('../models/User');

const renderAddCat = (req, res) => {
  breedsServices
    .getAll()
    .then((breeds) => {
      res.render('addCat', { breeds });
    })
    .catch(() => {
      res.redirect(400, '/404');
    });
};

const createCat = async (req, res) => {
  const { name, description, image, breed } = req.body;

  try {
    const user = await User.findById(req.user._id);

    const cat = await catServices.create(name, description, image, breed);

    cat.creatorId = user;

    await cat.save();

    res.redirect('/');
  } catch (error) {
    res.render('addCat', { error });
  }
};

router.get('/cats/add-cat', renderAddCat);
router.post('/cats/add-cat', createCat);

module.exports = router;
