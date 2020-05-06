var express = require('express');
var User = require('../models').User;
var Role = require('../models').Role;
var JWT = require('../utils/jwt');
var Token = require('../models').Token;
var PatientData = require('../models').PatientData;
var PatientStatus = require('../models').PatientStatus;
var Location = require('../models').Location;

var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    res.json({ message: 'HI', success: true });
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});
/* Register user */
router.post('/register', async function (req, res, next) {
  try {
    let user = await User.findOne({ where: { email: req.body.user.email } });
    const patientData = await PatientData.findOne({ where: { identification_number: req.body.patientData.identification_number } });
    if (user != null) return res.json({ success: false, message: 'email is taken' });
    if (patientData != null) return res.json({ success: false, message: 'jmbg is taken' });
    //register user with patient data
    const location = await Location.create(req.body.location);
    const role = await Role.findOne({ where: { name: 'patient' } });
    req.body.user.location = location.dataValues.id;
    req.body.user.role_id = role.dataValues.id;
    req.body.user.verified = false;
    user = await User.create(req.body.user);
    req.body.patientData.user_id = user.dataValues.id;
    await PatientData.create(req.body.patientData);
    await PatientStatus.create({ refused_msg: 'p', user_id: user.dataValues.id });
    res.json({ success: true, message: 'Waiting for admin approval. Please check your mail' });
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

/* Verify new user*/
router.get('/verify/:token', async function (req, res, next) {
  try {
    const token = req.params.token;
    const myToken = await Token.findOne({ where: { code: token } });
    if (myToken == null) return res.json({ success: false, message: 'No such token' });
    await User.update({ verified: true }, { where: { id: myToken.dataValues.user_id } });
    Token.destroy({ where: { id: myToken.dataValues.id } });
    return res.json({ success: true, message: 'You are verified now' });
  }
  catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
