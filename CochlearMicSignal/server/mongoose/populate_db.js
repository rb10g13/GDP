var mongoose = require('mongoose');

// connect to db
require(__dirname + '/index');

//Import Models
var User = mongoose.model('User');
var Fish = mongoose.model('Fish');
var Article = mongoose.model('Article');
var Guide = mongoose.model('Guide');
var News = mongoose.model('News');
var Comment = mongoose.model('Comment');

/* beautify preserve:start */
var user1 = new User({ username: 'ricsi.bata', email: 'Ricsibata@mail.com', password: 'ricsipass.bata_pass', name: { first: 'Richard', last: 'Bata' }, profile_picture: '', date_of_birth: new Date("January 6, 1995"), date_joined: new Date("July 30, 2016 21:54:00"), gender: 'male', });
var user2 = new User({ username: 'bence.font', email: 'Ricsibata@mail.com', password: 'ricsipass.bata_pass', name: { first: 'Richard', last: 'Bata' }, profile_picture: '', date_of_birth: new Date("January 6, 1995"), date_joined: new Date("July 30, 2016 21:54:00"), gender: 'male', });

var fish1 = new Fish({ _owner: user1._id, images: [], species: 'Csuka', date_of_catch: new Date("July 30, 2016 21:54:00"), weight: 2.3, length: 45.0, technique: 'Spinning', bait: 'Wobbler', weather: 'Sunny, warm', description: 'This is the description', location: { lat: 46.8303, long: 17.7340, }, social: { likes: [user1.username] } });
var fish2 = new Fish({ _owner: user2._id, images: [], species: 'Sullo', date_of_catch: new Date("July 30, 2016 21:54:00"), weight: 2.3, length: 45.0, technique: 'Spinning', bait: 'Wobbler', weather: 'Sunny, warm', description: 'This is the description', location: { lat: 46.8303, long: 17.7340, }, social: { likes: [user1.username] } });
var fish3 = new Fish({ _owner: user1._id, images: [], species: 'Harcs', date_of_catch: new Date("July 30, 2016 21:54:00"), weight: 2.3, length: 45.0, technique: 'Spinning', bait: 'Wobbler', weather: 'Sunny, warm', description: 'This is the description', location: { lat: 46.8303, long: 17.7340, }, social: { likes: [user1.username] } });

var article1 = new Article({ _owner: user1._id, title: 'Some article title 1', start_date: new Date("July 30, 2016 21:54:00"), location: { lat: 46.8303, long: 17.7340, }, abstract: 'This is the abstract', content: 'Some content', images: [], social: { likes: [user1.username] } });
var article2 = new Article({ _owner: user2._id, title: 'Some article title 2', start_date: new Date("July 30, 2016 21:54:00"), location: { lat: 46.8303, long: 17.7340, }, abstract: 'This is the abstract', content: 'Some content', images: [], social: { likes: [user1.username] } });

var guide1 = new Guide({ _owner: user1._id, title: 'Some guide title 1', category: 'Hook knots', abstract: 'This is the abstract', content: 'Some content', images: [], social: { likes: [user1.username] } });
var guide2 = new Guide({ _owner: user2._id, title: 'Some guide title 2', category: 'Hook knots', abstract: 'This is the abstract', content: 'Some content', images: [], social: { likes: [user1.username] } });

var news1 = new News({ title: 'Some news title 1', abstract: 'This is the abstract', content: 'Some content', images: [], source: { name: 'Fishing Time', URL: 'somesite.com' }, social: { likes: [user1.username] } });
var news2 = new News({ title: 'Some news title 2', abstract: 'This is the abstract', content: 'Some content', images: [], source: { name: 'Fishing Time', URL: 'somesite.com' }, social: { likes: [user1.username] } });

var comment1 = new Comment({ _owner: { kind: 'Fish', item: fish1._id }, user_id: user1.username, content: 'Comment content' });
var comment2 = new Comment({ _owner: { kind: 'Fish', item: fish2._id }, user_id: user2.username, content: 'Comment content' });
var comment3 = new Comment({ _owner: { kind: 'Article', item: article1._id }, user_id: user1.username, content: 'Comment content' });
var comment4 = new Comment({ _owner: { kind: 'Guide', item: guide1._id }, user_id: user1.username, content: 'Comment content' });
var comment5 = new Comment({ _owner: { kind: 'News', item: news1._id }, user_id: user1.username, content: 'Comment content' });

// Replace existing content
User.remove(function (err) {
  user1.save(function (err, user) { if (err) console.log(err); console.log('User saved\t(' + user._id + ')'); });
  user2.save(function (err, user) { if (err) console.log(err); console.log('User saved\t(' + user._id + ')'); });
});

setTimeout(function() {
Fish.remove(function (err) {
  fish1.save(function (err, fish) { if (err) console.log(err); console.log('Fish saved\t(' + fish._id + ')'); });
  // fish2.save(function (err, fish) { if (err) console.log(err); console.log('Fish saved\t(' + fish._id + ')'); });
  // fish3.save(function (err, fish) { if (err) console.log(err); console.log('Fish saved\t(' + fish._id + ')'); });
});
}, 1000);
// Article.remove(function (err) {
//   article1.save(function (err, article) { if (err) console.log(err); console.log('Article saved\t(' + article._id + ')'); });
//   article2.save(function (err, article) { if (err) console.log(err); console.log('Article saved\t(' + article._id + ')'); });
// });

// Guide.remove(function (err) {
//   guide1.save(function (err, guide) { if (err) console.log(err); console.log('Guide saved\t(' + guide._id + ')'); });
//   guide2.save(function (err, guide) { if (err) console.log(err); console.log('Guide saved\t(' + guide._id + ')'); });
// });

// News.remove(function (err) {
//   news1.save(function (err, news) { if (err) console.log(err); console.log('News saved\t(' + news._id + ')'); });
//   news2.save(function (err, news) { if (err) console.log(err); console.log('News saved\t(' + news._id + ')'); });
// });

// Comment.remove(function (err) {
//   comment1.save(function (err, comment) {
//     if (err) console.log(err);
//     console.log('Comment saved\t(' + comment._id + ')');
//     // Comment.find({ _id: comment._id })
//     //   .populate('_owner.item')
//     //   .exec(function (err, owner) {
//     //     console.log(owner[0]._owner.item._id);
//     //   });

//   });
//   comment2.save(function (err, comment) { if (err) console.log(err); console.log('Comment saved\t(' + comment._id + ')'); });
//   comment3.save(function (err, comment) { if (err) console.log(err); console.log('Comment saved\t(' + comment._id + ')'); });
//   comment4.save(function (err, comment) { if (err) console.log(err); console.log('Comment saved\t(' + comment._id + ')'); });
//   comment5.save(function (err, comment) { if (err) console.log(err); console.log('Comment saved\t(' + comment._id + ')'); });
// });
/* beautify preserve:end */
