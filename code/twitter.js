var Maki = require('maki');
var twitter = new Maki({
  service: {
    name: 'Twitter'
  }
});

var Passport = require('maki-passport-local');
var passport = new Passport({
  resource: 'User'
});

twitter.use( passport );

var User = twitter.define('User', {
  attributes: {
    username: { type: String , max: 35 , slug: true },
    password: { type: String , max: 200 , masked: true }
  }
});

var Tweet = twitter.define('Tweet', {
  attributes: {
    content: { type: String, max: 140 },
    _user: { type: twitter.mongoose.SchemaTypes.ObjectId, ref: 'User' }
  }
});

User.on('create', function(user) {
  Tweet.create({
    content: 'My first tweet!',
    _user: user._id
  }, function(err, tweet) { console.log( err || tweet ); });
});

twitter.start();
