var express = require('express');
var path = require('path');

var app = express();

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', ['index.html'].join('.')));
});

module.exports = app;
