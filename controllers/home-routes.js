const router = require("express").Router();
const BlogPost = require("../models/BlogPost");

// home '/' route to show all blog posts
router.get("/", async (req, res) => {
  const logoText = 'The Tech Blog';
  const postData = await BlogPost.findAll();
  const posts = postData.map((data) => data.get({ plain: true }));
  res.render("home", { posts, logoText });
});

// route to show a single post
router.get("/post/:id"),
  async (req, res) => {
    const logoText = `Post #${req.params.id}`;
    const postData = await BlogPost.findByPk(req.params.id);
    const posts = postData.get({ plain: true });
    res.render("post", { posts, logoText });
  };
  router.get("/post/:id", async (req, res) => {
    const logoText = `Post #${req.params.id}`;
    const postData = await BlogPost.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    res.render("post", { post, logoText });
  });

// dashboard route
router.get("/dashboard", async (req, res) => {
  const logoText = 'Dashboard';
  res.render("dashboard", { logoText });
});

// login route
router.get("/login", async (req, res) => {
  const logoText = 'Login';
  res.render("login", { logoText });
});

module.exports = router;
