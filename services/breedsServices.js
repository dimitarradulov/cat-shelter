const Breed = require('../models/Breed');

const create = (name) => {
  Breed.create({
    name,
  })
    .then((breed) => {
      console.log(breed);
    })
    .catch((err) => {
      console.log('There is a problem:');
      console.log(err);
    });
};

const getAll = () => Breed.find({}).lean();

const breedsServices = {
  create,
  getAll,
};

module.exports = breedsServices;
