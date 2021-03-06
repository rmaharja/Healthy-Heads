var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Passport middlewares:
app.use(session({ secret: " pineapple-express",
resave:true, saveUnitialized: true}));

app.use(passport.initialize());

app.use(passport.session());

// require ("./controllers/ptController.js")(app);
require("./controllers/profController.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});