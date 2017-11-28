var express = require('express');
var path = require('path');

var app = express();

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', ['sub-domain.html'].join('.')));
});

module.exports = app;
