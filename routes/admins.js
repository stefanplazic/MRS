var express = require('express');
var router = express.Router();
var PatientStatus = require('../models').PatientStatus;
var User = require('../models').User;
var JWT = require('../utils/jwt');
var Email = require('../utils/email');

router.get('/pendusers', JWT.authMiddleware, JWT.centerAdminMiddleware, async function (req, res, next) {
    try {
        //select all users with pening state in database 
        let patients = await PatientStatus.findAll({ attributes: ['user_id'], where: { refused_msg: 'p' } });
        let patientIds = patients.map(patient => { return patient.user_id });
        patients = await User.findAll({ attributes: ['id', 'email', 'fName', 'lName'], where: { id: patientIds } });
        res.json(patients);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

//accept  user approval
router.put('/acceptuser', JWT.authMiddleware, JWT.centerAdminMiddleware, async function (req, res, next) {
    try {
        const userId = req.body.userId;
        const user = await User.findOne({ where: { id: userId } });
        const patientStatus = await PatientStatus.findOne({ where: { refused_msg: 'p', user_id: user.id } });

        if (user == null) return res.json({ success: false, message: 'No such user' });
        if (patientStatus == null) return res.json({ success: false, message: 'User is not a patient or is not in pending state' });

        await PatientStatus.update({ refused_msg: 'a' }, { where: { user_id: userId } });
        //send email to user
        Email.sendVerification(user.dataValues)
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.put('/declineuser', JWT.authMiddleware, JWT.centerAdminMiddleware, async function (req, res, next) {
    try {
        const userId = req.body.userId;
        const resonText = req.body.resonText;
        const user = await User.findOne({ where: { id: userId } });
        const patientStatus = await PatientStatus.findOne({ where: { refused_msg: 'p', user_id: user.id } });

        if (user == null) return res.json({ success: false, message: 'No such user' });
        if (patientStatus == null) return res.json({ success: false, message: 'User is not a patient or is not in pending state' });

        await PatientStatus.update({ refused_msg: 'd', status_type: resonText }, { where: { user_id: userId } });
        //send email to user
        Email.sendDeclineMessage(user.dataValues.email, resonText);;
        res.json({ success: true });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;