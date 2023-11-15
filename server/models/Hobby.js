const { Schema, model } = require('mongoose');

const hobbySchema = new Schema({
  name: String
});

const Hobby = model('Hobby', hobbySchema);

module.exports = Hobby;