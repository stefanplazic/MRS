var express = require('express');
var router = express.Router();
var JWT = require('../utils/jwt');
var db = require('../models');
var { QueryTypes } = require('sequelize');

var User = require('../models').User;
var PatientData = require('../models').PatientData;
var Location = require('../models').Location;
var Specialization = require('../models').Specialization;
var Schedule = require('../models').Schedule;

/*GET USER PROFILE DATA INFO*/
router.get('/profileData', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const userId = req.user.userId;
        //load data from database
        let user = await User.findOne({ where: { id: userId } });
        let location = await Location.findOne({ where: { id: user.dataValues.location } });
        let patientdata = await PatientData.findOne({ where: { user_id: userId } });

        //check if some data is null
        if (user == null) return res.json({ status: false, message: 'Internal error' });
        if (location == null) return res.json({ status: false, message: 'Internal error' });
        if (location == null) return res.json({ status: false, message: 'Internal error' });

        //set to dataValues
        user = user.dataValues;
        location = location.dataValues;
        patientdata = patientdata.dataValues;

        //pack the data for return
        let userData = {};
        userData.user = { email: user.email, fName: user.fName, lName: user.lName, password: user.password };
        userData.location = { address: location.address, city: location.city, state: location.state, lat: location.lat, lng: location.lng };
        userData.patientdata = { phone: patientdata.phone, identification_number: patientdata.identification_number };

        res.json({ success: true, userData: userData });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

/*UPDATE USER PROFILE DATA*/
router.put('/updateProfile', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const userId = req.user.userId;
        //load data from database
        let user = await User.findOne({ where: { id: userId } });
        let location = await Location.findOne({ where: { id: user.dataValues.location } });
        let patientdata = await PatientData.findOne({ where: { user_id: userId } });

        //check if some data is null
        if (user == null) return res.json({ status: false, message: 'Internal error' });
        if (location == null) return res.json({ status: false, message: 'Internal error' });
        if (location == null) return res.json({ status: false, message: 'Internal error' });

        //update
        await User.update({ password: req.body.user.password, fName: req.body.user.fName, lName: req.body.user.lName }, { where: { id: userId } });
        await Location.update(req.body.location, { where: { id: user.dataValues.location } });
        await PatientData.update({ phone: req.body.patientdata.phone }, { where: { user_id: userId } });

        res.json({ success: true, message: 'Updated profile successfully' });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

/*GET CLINIC LIST*/
router.get('/clinics', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const [results] = await db.sequelize.query("SELECT Clinics.id,Clinics.name,(SELECT  CONCAT_WS(', ',Locations.address,Locations.city,Locations.state) from Locations WHERE Locations.id = Clinics.location) as address from Clinics;");
        res.json({ success: true, clinics: results });
    }
    catch (error) {
        next(error);
    }
});

/*GET FILTERED CLINIC LIST*/
router.get('/filterClinics', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const name = req.query.name;
        const appointment = req.query.appointment;
        const date = req.query.date;

        if (date == undefined || appointment == undefined || date == undefined) return res.json({ success: false, message: 'Enter all params' });
        const results = await db.sequelize.query("SELECT Clinics.id,Clinics.name,(SELECT  CONCAT_WS(', ',Locations.address,Locations.city,Locations.state) from Locations WHERE Locations.id = Clinics.location) as address from Clinics WHERE Clinics.id IN (SELECT DoctorData.clinic_id from DoctorData INNER JOIN DoctorSpecializations on DoctorData.user_id = DoctorSpecializations.doctor_id INNER JOIN Vacations ON Vacations.doctor_id = DoctorData.user_id WHERE DoctorSpecializations.id = :appointmentType AND Vacations.vacation_date != :searchDate) AND Clinics.name LIKE :clinicName;"
            , {
                replacements: { searchDate: date, appointmentType: appointment, clinicName: name + '%' },
                type: QueryTypes.SELECT
            });

        res.json({ success: true, clinics: results });
    }
    catch (error) {
        next(error);
    }
});

/*GET SPECIALISATION LIST*/
router.get('/specialisation', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const results = await Specialization.findAll();
        res.json({ success: true, specialisations: results });
    }
    catch (error) {
        next(error);
    }
});

router.get('/pre-scheduled-examination', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const results = await Schedule.findAll({ where: { reserved: false } });
        res.json({ success: true, examinations: results });
    }
    catch (error) {
        next(error);
    }
});

//for reserving pre scheduled examination
router.post('/pre-scheduled-examination', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const schedule = await Schedule.findOne({ where: { reserved: false, id: req.body.scheduleId } });
        if (schedule == null) res.json({ success: false, message: 'No such examination' });
        //schedule examination
        await Schedule.update({ patienId: req.user.userId, reserved: true }, { where: { id: req.body.scheduleId } });
        res.json({ success: true, message: 'Successfully scheduled' });
    }
    catch (error) {
        next(error);
    }
});

//get all user schedued operations and appointments
router.get('/patient-appointments', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const schedules = await Schedule.findAll({ where: { reserved: true, patienId: req.user.userId } });
        res.json({ success: true, appointments: schedules });
        //SELECT Schedules.id as scheduleId,Schedules.start_timestamp as scheduleDate, d.id as doctorId,CONCAT(d.fName,d.lName) as doctor, Clinics.name as clinic FROM `Schedules` INNER JOIN Users d ON d.id = Schedules.doctorId INNER JOIN DoctorData ON DoctorData.user_id = Schedules.doctorIdINNER JOIN Clinics ON Clinics.id = DoctorData.clinic_idWHERE Schedules.patienId = 1;
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

//SELECT Clinics.id,Clinics.name,(SELECT  CONCAT(Locations.address,Locations.city,Locations.state) from Locations WHERE Locations.id = Clinics.location) as address from Clinics WHERE Clinics.id IN (SELECT DoctorData.clinic_id from DoctorData INNER JOIN DoctorSpecializations on DoctorData.user_id = DoctorSpecializations.doctor_id INNER JOIN Vacations ON Vacations.doctor_id = DoctorData.user_id WHERE DoctorSpecializations.id = 1 AND Vacations.vacation_date != '0000-00-00');
module.exports = router;