// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { DataTypes } = require("sequelize");

module.exports = function(app) {
  console.log(db.Topic);
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for displaying all the topics
  app.get("/api/topics", (req, res) => {
    db.Topic.findAll().then(dbTopic => {
      res.json(dbTopic);
    });
  });

  // Route for displaying all cards of all topics
  app.get("/api/cards", (req, res) => {
    db.Card.findAll().then(dbCard => {
      res.json(dbCard);
    });
  });

  // Route for displaying all cards of a single topic !!!!!!!!!
  app.get("/api/topics/:topic/cards", (req, res) => {
    db.Card.findAll({
      where: {
        topicId: req.params.topic
      }
    }).then(dbCard => {
      res.json(dbCard);
    });
  });

  // Route to create new topics
  app.post("/api/topics", (req, res) => {
    db.Topic.create({
      subject: req.body.subject
    }).then(dbCard => {
      res.json(dbCard);
    });
  });

  // Route for creating a new card
  app.post("/api/topics/:topic", (req, res) => {
    console.log(req.params.topic);
    db.Card.create({
      term: req.body.term,
      definition: req.body.definition,
      TopicId: req.params.topic
    }).then(dbCard => {
      res.json(dbCard);
    });
  });

  // Route for updating a card
  app.put("/api/cards/:card", (req, res) => {
    db.Card.update(
      {
        term: req.body.term,
        definition: req.body.definition
      },
      {
        where: {
          id: req.params.card
        }
      }
    ).then(dbCard => {
      res.json(dbCard);
    });
  });

  // Route for deleting a card
  app.delete("/api/cards/:card", (req, res) => {
    db.Card.destroy({
      where: {
        id: req.params.card
      }
    }).then(dbCard => {
      res.json(dbCard);
    });
  });
};
