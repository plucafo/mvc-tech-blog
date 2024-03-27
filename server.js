// dependencies
const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const hbs = handlebars.create({});

// set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// set handlebars as the templating engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// middleware to parse json post/put requests so they are available in the req.body
app.use(express.json());

// middleware to parse incoming request bodies in url encoded format commonly sent by HTML forms when data is submitted
app.use(express.urlencoded({ extended: false }));

// middleware to look for static files in the views folder
app.use(express.static(path.join(__dirname, "public")));

// route to landing page
app.get("/", (req, res) => {
  res.send(path.join(__dirname, "index"));
});

// starts the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
