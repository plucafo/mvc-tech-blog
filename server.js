const express = require("express");
const path = require("path");

const PORT = 3001;
const app = express();

// We can send a body parameter to the client using the res.send() method. This body parameter can be a string, buffer, or even an array.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
