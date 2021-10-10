const express = require('express');

const home = require('./controllers/homeController');
const breeds = require('./controllers/breedsController');
const cats = require('./controllers/catController');
const editCat = require('./controllers/editCatController');
const shelterCat = require('./controllers/catShelterController');

const router = express.Router();

router.use(home);
router.use(breeds);
router.use(cats);
router.use(editCat);
router.use(shelterCat);

module.exports = router;
