var express = require('express');
var User = require('../models').User;
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    let user = await User.create({ email: 'stefan.plazic@gmail.com', password: 'stefan', salt: 'me', verified: true })
    res.json(user);
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});
/* Register user */
/* Login user */
module.exports = router;
