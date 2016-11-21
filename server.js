//Lets require/import the HTTP module
var express = require('express');
var app = express();

//Middleware for static file service
app.use(express.static("./public"));

//Require all resources in app
app.use(require("./resources"));

//Create a server
app.listen(8080, function(){
  console.log('running on port 8080')
});

module.exports = app;
