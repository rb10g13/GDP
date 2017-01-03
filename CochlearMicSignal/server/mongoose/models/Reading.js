var mongoose = require('mongoose');

console.log('Here');

var ReadingSchema = new mongoose.Schema({
  // Core content data
  implant_id: {
    number: Number,
    ear: String
  },
  readings: [
    [Number][Number]
  ]
});

mongoose.model('Reading', ReadingSchema);
