const router = require("express").Router();
const BlogPost = require("../models/BlogPost");

router.get("/", async (req, res) => {
  const postData = await BlogPost.findAll();
  const posts = postData.map((data) => data.get({ plain: true }));
  res.render("home", { posts });
});

router.get("/post/:id"),
  async (req, res) => {
    res.render("post");
  };

router.get("/dashboard", async (req, res) => {
  res.render("dashboard");
});

module.exports = router;
