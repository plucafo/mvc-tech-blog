const router = require("express").Router();
const BlogPost = require("../models/BlogPost");
const Comment = require("../models/Comment");
const User = require('../models/User');
const withAuth = require('../utils/auth');

// home '/' route to show all blog posts
router.get("/", async (req, res) => {
  const logoText = "The Tech Blog";
  const postData = await BlogPost.findAll();
  const posts = postData.map((data) => data.get({ plain: true }));
  res.render("home", { posts, logoText });
});

// route to show a single post
router.get("/post/:id", async (req, res) => {
  const logoText = `Post #${req.params.id}`;
  const postData = await BlogPost.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
      },
    ],
  });

  const post = postData.get({ plain: true });
  res.render("post", { post, logoText });
});

// route to create a new comment on a specific post
router.post("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment, author } = req.body;

    // Find the post by ID
    const post = await BlogPost.findByPk(postId);

    // Create a new Comment instance
    const newComment = await Comment.create({
      comment,
      author,
      blogPostId: postId,
    });

    // Associate the new comment with the post using addComment on the post instance
    await post.addComment(newComment);

    // Redirect the user back to the post page after submitting the comment
    res.redirect(`/post/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const logoText = "My Dashboard";
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
      logoText
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get("/login", async (req, res) => {
  const logoText = "Login";
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login', { logoText });
});

// signup route
router.get("/signup", async (req, res) => {
  const logoText = "Sign Up";
  res.render("signup", { logoText });
});

module.exports = router;
