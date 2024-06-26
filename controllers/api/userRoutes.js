const router = require('express').Router();
const { User } = require('../../models');

// route to /api/users for testing
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create a new user account
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // res.status(200).json(userData);
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to login to an existing account
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    console.log("###############req email:", req.body.email);
    console.log("###############req password:", req.body.password);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// route to logout of an account
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
