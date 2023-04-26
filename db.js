const mongoose = require('mongoose'); // import mongoose

mongoose.connect('mongodb://127.0.0.1:27017/cats', {}) // connect to mongo - mongo default port 27017
  .then(() => console.log('yay'))
  .catch(() => console.log('boo'));

const catSchema = new mongoose.Schema({ // create the schema (the structure)
  name: { type: String, required: true }, // string, not null
  colour: String,
  evil: Boolean,
});

const catModel = mongoose.model('cat', catSchema); // create a model - allows you to interact with the collection - like DAO

module.exports = { catModel }; // export the model
