// packages
var experss = require("express");
var bodyParser = require("body-parser");
// var path = require("path");

// express app setup
var app = experss();
var PORT = process.env.PORT || 3000;

// body parsing in express app
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// Routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// start server listening
app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
})