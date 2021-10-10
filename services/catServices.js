const Cat = require('../models/Cat');

const create = (name, description, image, breed) => {
  return Cat.create({
    name,
    description,
    image,
    breed,
  });
};

const getAll = () => Cat.find({}).lean();

const getOne = (id) => Cat.findById(id).lean();

const search = async (text) => {
  let result = await getAll();

  if (text) {
    result = result.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  return result;
};

const catServices = {
  create,
  getAll,
  getOne,
  search,
};

module.exports = catServices;
