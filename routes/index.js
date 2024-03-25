const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send('../views/index')
  });

module.exports = router;
