var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var documents = require('./routes/documents');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', documents);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var elastic = require('./elasticsearch');
elastic.indexExists().then(function (exists) {
  if (exists) {
    return elastic.deleteIndex();
  }
}).then(function () {
  return elastic.startIndex().then(elastic.startMapping).then(function () {
    //Add a few book titles for the autocomplete
    //elasticsearch offers a bulk functionality as well, but this is for a different time
    var promises = [
      'Hello CloudBoost',
      'Hello Abhishek',
      'Hi Mom'
    ].map(function (content) {
      return elastic.addMessage({
        title: content
      });
    });
    return Promise.all(promises);
  });
});

module.exports = app;
