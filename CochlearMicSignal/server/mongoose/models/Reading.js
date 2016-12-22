var mongoose = require('mongoose');

console.log('Here');

var ReadingSchema = new mongoose.Schema({
  // Core content data
  title: String,
  // location: {
  //   // North-South
  //   lat: { type: Number, min: -90, max: 90 },
  //   // East-West
  //   long: { type: Number, min: -180, max: 180 }
  // },
  // abstract: String,
  // content: String, //TODO
  // images: [String],

  // // Social
  // social: {
  //   likes: [String], // Usernames
  //   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
  // }
});

mongoose.model('Reading', ReadingSchema);
