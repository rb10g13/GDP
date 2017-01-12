var mongoose = require('mongoose');

var ReadingSchema = new mongoose.Schema({
  // Core content data
  control: Boolean,
  implant_id: {
    number: Number,
    ear: String
  },
  frc: [Number],
  date: Date,
  faulty: Boolean
});

mongoose.model('Reading', ReadingSchema);
