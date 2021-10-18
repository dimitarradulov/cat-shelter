const Breed = require('../models/Breed');

const create = (name) => {
  return Breed.create({
    name,
  });
};

const getAll = () => Breed.find({}).lean();

const breedsServices = {
  create,
  getAll,
};

module.exports = breedsServices;
