/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Alexander Smith, Matthew Kerr
 * Email: smitale2@oregonstate.edu, 
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
//var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).render('indexPage');
});

app.get('/index.html', function (req, res) {
  res.status(200).render('indexPage');
});

app.get('*', function (req, res) {
  res.status(404).render('404Page');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
