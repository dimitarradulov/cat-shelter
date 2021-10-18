const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
  },
  image: {
    type: String,
    required: true,
    validate: [/^https?:\/\//, 'Not a valid image URL'],
  },
  breed: {
    type: String,
    required: true,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
