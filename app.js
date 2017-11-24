var express = require('express');
var path = require('path');
var pkg = require('./package.json');

var app = express();

app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', ['sub-domain', pkg.version, 'html'].join('.')));
});

module.exports = app;
