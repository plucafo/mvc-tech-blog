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

// DELETE route to delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID
    const post = await BlogPost.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.user_id !== req.session.user_id) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    // Delete the post
    await post.destroy();

    // Send a success response
    res.status(200).json({ message: 'Post deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT route to update a post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Find the post by ID
    const post = await BlogPost.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the logged-in user is the author of the post
    if (post.user_id !== req.session.user_id) {
      return res.status(403).json({ message: 'You are not authorized to edit this post' });
    }

    // Update the post with new title and content
    await post.update({ title, content });

    // Send a success response
    res.status(200).json({ message: 'Post updated successfully', post });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;