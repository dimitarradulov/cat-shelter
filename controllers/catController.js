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
    .catch((err) => {
      console.log('There is a problem:');
      console.log(err);
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
    res.status(400).send('404');
  }
};

router.get('/cats/add-cat', renderAddCat);
router.post('/cats/add-cat', createCat);

module.exports = router;
