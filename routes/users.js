var express = require('express');
var User = require('../models').User;
var Role = require('../models').Role;
var JWT = require('../utils/jwt');
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
router.post('/register', async function (req, res, next) {
  try {
    //check if all fields are valida
    //check if user with given email allready exists
    //save to database
    res.json(user);
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});
/* Login user */
router.post('/login', async function (req, res, next) {
  try {
    //check if user with given email exists in database and compare passwords
    const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (user == null) return res.json({ success: false, message: 'No such user' });
    if (user.verified == 0) return res.json({ success: false, message: 'Verify your email account' });
    const role = await Role.findOne({ where: { id: user.dataValues.role_id } });
    const token = JWT.signJWT(user.id, role.dataValues.name);
    return res.json({ success: true, jwt: token, role: role.dataValues.name });
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
