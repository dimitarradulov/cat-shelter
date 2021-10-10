const express = require('express');
const router = express.Router();

const breedsServices = require('../services/breedsServices');

const renderBreedsPage = (req, res) => {
  res.render('addBreed');
};

const createBreed = (req, res) => {
  const { breed } = req.body;

  breedsServices.create(breed);

  res.redirect('/cats/add-breed');
};

router.get('/cats/add-breed', renderBreedsPage);
router.post('/cats/add-breed', createBreed);

module.exports = router;
