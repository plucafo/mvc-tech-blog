const router = require("express").Router();
const BlogPost = require("../models/BlogPost");
const Comment = require("../models/Comment");
const User = require("../models/User");
const withAuth = require("../utils/auth");

// home '/' route to show all blog posts
router.get("/", async (req, res) => {
  const postData = await BlogPost.findAll();
  const posts = postData.map((data) => data.get({ plain: true }));
  res.render("home", {
    posts,
    logoText: "The Tech Blog",
    logged_in: req.session.logged_in || false,
  });
});

// route to show a single post
router.get("/posts/:id", withAuth, async (req, res) => {
  const postData = await BlogPost.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
      },
      {
        model: User,
      },
    ],
  });

  const post = postData.get({ plain: true });
  res.render("post", {
    post,
    logoText: `Post #${req.params.id}`,
    logged_in: req.session.logged_in || false,
  });
});

// Dashboard route to show blog posts related to the logged-in user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the user by ID using req.session.user_id
    const user = await User.findByPk(req.session.user_id, {
      include: BlogPost, // Include BlogPost model to fetch associated blog posts
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the blog posts associated with the user
    const userPosts = user.BlogPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      userPosts,
      logoText: "Dashboard",
      logged_in: true, // Assuming the user is logged in since it's a dashboard
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// route to create a new comment on a specific post
router.post("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;

    // Find the user by ID using req.session.user_id
    const user = await User.findByPk(req.session.user_id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the post by ID
    const post = await BlogPost.findByPk(postId);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    // Create a new Comment instance and associate it with the post and user
    const newComment = await Comment.create({
      comment,
      user_id: req.session.user_id,
      blogPostId: postId,
    });

    // Redirect the user back to the post page after submitting the comment
    res.redirect(`/posts/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: req.session.logged_in || false,
      logoText: "My Dashboard",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login", { logoText: "Login" });
});

// signup route
router.get("/signup", async (req, res) => {
  res.render("signup", { logoText: "Sign Up" });
});

module.exports = router;
