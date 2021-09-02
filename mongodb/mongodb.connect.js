const mongoose = require('mongoose');

const uri =
  'mongodb+srv://superuser:adminPass@todo-tdd.rssm9.mongodb.net/jestTests?retryWrites=true&w=majority';
const connect = async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.log('Error connecting to mongodb', err);
  }
};

module.exports = { connect };
