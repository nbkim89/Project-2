// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // app.get("/", (req, res) => {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/main");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/main");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // If no matching route is found default to home.
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // Route for displaying all the topic cards ("index.handlebars")
  app.get("/", (req, res) => {
    db.Topic.findAll({ raw: true }).then(function(data) {
      var topicsObject = {
        topic: data
      };
      res.render("index", topicsObject);
    });

  });

  // Route for displaying the page to create a new topic ("topic.handlebars")
  app.get("/topic", (req, res) => {
    res.render("topic");
  });

  // Route for displaying the page  to create a new card("create.handlebars")
  app.get("/create", (req, res) => {
    db.Topic.findAll({
      raw: true,
      limit: 1,
      order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(data){
      var topicObject = {
        topic: data
      };//only difference is that you get users list limited to 1
      //entries[0]
      res.render("create", topicObject);
    }); 
  });

  app.get("/view/:id/:card", (req, res) => {
    db.Card.findAll({
      raw: true,
      where: {
        topicId: req.params.id
      },
      include: [db.Topic] 
    }).then(dbCard => {
      // dbCard gets an array of all the cards for this subject
      // res.json(dbCard);
      var card = dbCard[req.params.card]
        // This gets one card in the array referencing the :card param
      var card2 = {...card, 
        subject: card["Topic.subject"],
        position: req.params.card
      }

      // res.json(card2);
      res.render("view", card2);
    });
  });
};
