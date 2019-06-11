var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = 'mongodb+srv://admin:password321@finalprojectllp-z4sgf.mongodb.net/test?retryWrites=true&w=majority';
var db = null;

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db('posts');
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json({strict: false}));
app.use(express.static('public'));

app.get('/', function (req, res) {
	var collection = db.collection('posts');
	collection.find({}).toArray(function (err, posts) {
		if (err) {
			res.status(500).send({
				error: "Error fetching people from DB"
			});
		} else {
			console.log("== posts:", posts);
			res.status(200).render('indexPage', {
				posts: posts
			});
		}
	});
  });

app.get('/posts/:postID', function (req, res, next) {
	var posts = [];
	var postID = req.params.postID;
	var collection = db.collection('posts');
	collection.find({ postID: postID }).toArray(function (err, post) {
		if (err) {
		  res.status(500).send({
			error: "Error fetching posts from DB"
		  });
		} else if(post.length > 0){
		  posts.push(post[0]);
		}
	});
	collection.find({ postReply: postID }).toArray(function (err, post2) {
		if(post2.length > 0){
			for(var i = 0; i < post2.length; i++)
			posts.push(post2[i]);
		}
		if (err) {
		  res.status(500).send({
			error: "Error fetching posts from DB"
		  });
		} else{
			console.log("== Posts:", posts);
			res.status(200).render('indexPage', {
				posts: posts
			}); 
		}
	});
});

app.post('/post/:postId/:postReply/:postURL/:postText/:postAuthor', function (req, res) {
  if (req.params.postText) {
    var collection = db.collection('posts');
	console.log("==Body:", req.body);
	console.log(req.body.url);
	var post = {
	  postReply: req.params.postReply,
	  postURL: req.params.postURL,
	  postText: req.params.postText,
	  postAuthor: req.params.postAuthor,
	  postID: req.params.postId
	};
	console.log('== newPost:', post);
    collection.insertOne(post,
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Error inserting photo into DB"
          });
        } else {
          if (result.matchedCount > 0) {
            res.status(200).send("Success");
          } 
        }
      }
    );
  } else {
    res.status(400).send("Request needs text");
  }
});

app.get('*', function (req, res, next) {
  res.status(404).render('404Page');
});
