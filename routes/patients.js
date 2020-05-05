var express = require('express');
var router = express.Router();
var JWT = require('../utils/jwt');

var User = require('../models').User;
var PatientData = require('../models').PatientData;
var Location = require('../models').Location;

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

module.exports = router;