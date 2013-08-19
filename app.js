// npm install express rem
var rem = require('rem')
  , express = require('express')
  , path = require('path');

/**
 * Express.
 */

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('secret', process.env.SESSION_SECRET || 'terrible, terrible secret')
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.set('host', 'localhost:' + app.get('port'));
  app.use(express.errorHandler());
});

app.configure('production', function () {
  app.set('host', process.env.HOST);
});

/**
 * Setup Twitter.
 */

var twitter = rem.connect('twitter.com').configure({
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET
});


var oauth = rem.oauth(twitter, 'http://' + app.get('host') + '/oauth/callback');

app.get('/login/', oauth.login());

app.use(oauth.middleware(function (req, res, next) {
  console.log("The user is now authenticated.");
  res.redirect('/stream');
}));

app.get('/logout/', oauth.logout(function (req, res) {
  res.redirect('/');
}));

// Save the user session as req.user.
app.all('/*', function (req, res, next) {
  req.api = oauth.session(req);
  next();
});

/**
 * Routes
 */

function loginRequired (req, res, next) {
  if (!req.api) {
    res.redirect('/login/');
  } else {
    next();
  }
}

function uniqueSubSet(elements,set){
  var subSet = [];
  for (var i = 0; i < elements; i++){
    var element = randomChoice(set);
    while (subSet.indexOf(element) > -1){
      element = randomChoice(set);
    }
    subSet.push(element)
  }
  return subSet;
}

function randomChoice(list){
  var index = randInt(0,list.length-1);
  return list[index];
}

function randInt(min,max){
  return Math.floor(Math.random()*(max - min + 1))+min;
}

app.get('/', loginRequired, function (req, res) {
  req.api('account/verify_credentials').get(function (err, profile) {
    res.send("good")
  });
});


app.listen(app.get('port'), function () {
  console.log('Listening on http://' + app.get('host'))
});

/**
 * Streaming example
 */
var carrier = require('carrier');

app.get('/stream', loginRequired, function (req, res) {
  tweets = [];
  num = 0;
  done= false

  req.api.stream('statuses/filter').post({
    track: ['love'], locations: [-180,-90,180,90]
  }, function (err, stream) {
    console.log("a");
    carrier.carry(stream, function (line) {
      if (!done){


        var line = JSON.parse(line);
        // console.log(line)
        if (line.coordinates != null ){
          console.log(line.coordinates);
          console.log("Yes")
          // res.write(line.coordinates.coordinates + '\n');
          tweet = [line.text, line.coordinates.coordinates[0], line.coordinates.coordinates[1]];
          tweets.push(tweet);
        }
        if (tweets.length == 20){
          done = true;
          console.log("done")
          console.log(tweets)
          console.log(tweets[0])

          // res.write(tweets);
        }
      }
      res.send("hi")
    });
  });
})

//, locations: [-180,-90,180,90]
