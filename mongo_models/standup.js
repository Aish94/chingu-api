const { Schema, model } = require('mongoose');

const standupSchema = new Schema({
  completed: String,
  upcoming: String,
  sentiment: String,
  url: String,
  notes: String,
});

const Standup = model('Standup', standupSchema);

module.exports = Standup;

