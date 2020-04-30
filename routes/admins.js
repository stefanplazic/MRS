var express = require('express');
var router = express.Router();
var PatientStatus = require('../models').PatientStatus;
var User = require('../models').User;
router.get('/pendusers', async function (req, res, next) {
    try {
        //select all users with pening state in database 
        let patients = await PatientStatus.findAll({ attributes: ['user_id'], where: { refused_msg: 'p' } });
        let patientIds = patients.map(patient => { return patient.user_id });
        patients = await User.findAll({ attributes: ['id','email','fName','lName'], where: { id: patientIds } });
        res.json(patients);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
