const router = require('express').Router();
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

// route to create a new blog post
router.post('/', async (req, res) => {
    try {
      const { title, content } = req.body;
      
      // Find the user by ID using req.session.user_id
      const user = await User.findByPk(req.session.user_id);
      
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Create a new post using the user's name as the author
      const newPost = await BlogPost.create({
        title,
        content,
        author: user.name, // Use user's name as the author
        user_id: user.id,
      });
  
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create post' });
    }
  });

module.exports = router;