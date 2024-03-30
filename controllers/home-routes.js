const router = require("express").Router();
const BlogPost = require("../models/BlogPost");

router.get("/", async (req, res) => {
  const logoText = 'The Tech Blog';
  const postData = await BlogPost.findAll();
  const posts = postData.map((data) => data.get({ plain: true }));
  res.render("home", { posts, logoText });
});

router.get("/post/:id"),
  async (req, res) => {
    res.render("post");
  };

router.get("/dashboard", async (req, res) => {
  const logoText = 'Dashboard';
  res.render("dashboard", { logoText });
});

router.get("/login", async (req, res) => {
  const logoText = 'Login';
  res.render("login", { logoText });
});

module.exports = router;
