const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

// set up the express app
const app = express();
const PORT = process.env.PORT || 3001;

// set handlebars as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// middleware to look for static files in the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
