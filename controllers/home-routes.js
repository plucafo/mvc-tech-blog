const router = require("express").Router();
const BlogPost = require("../models/BlogPost");

router.get("/", async (req, res) => {
    res.render("all");
  });

router.get("/post/:id"), async (req, res) => {
    res.render("post");
}

module.exports = router;

