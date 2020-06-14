var express = require('express');
var router = express.Router();
var PatientStatus = require('../models').PatientStatus;
var User = require('../models').User;
var JWT = require('../utils/jwt');
var Email = require('../utils/email');
var TokenHelper = require('../utils/token');
var Token = require('../models').Token;
var Schedule = require('../models').Schedule;

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
        const token = await Token.create({ code: TokenHelper.tokenGenerate(20), user_id: userId });
        //send email to user
        Email.sendVerification(user.dataValues, token.dataValues.code);
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

router.put('/accept-appointment/:appointmentId', JWT.authMiddleware, JWT.centerAdminMiddleware, async function (req, res, next) {
    try {
        const appointmentId = req.params.appointmentId;
        const roomId = req.body.roomId;
        let result = await Schedule.update({roomId:roomId},{where:{id:appointmentId}});
        res.json({ success: true,result:result });
        
        result = await Schedule.findOne({where:{id:appointmentId}});
        let patient = await  User.findOne({where:{id:result.dataValues.patienId}});
        let doctor =  await User.findOne({where:{id:result.dataValues.doctorId}});
        //send email to patient and doctor
        Email.approveSchedule(result,patient.dataValues.email);
        Email.notifyDoctor(result,doctor.dataValues.email);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
