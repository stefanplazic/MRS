
var express = require('express');
var router = express.Router();
var JWT = require('../utils/jwt');

var User = require('../models').User;
var PatientData = require('../models').PatientData;
var Location = require('../models').Location;

/*GET USER PROFILE DATA INFO*/
router.get('/profileDate', JWT.authMiddleware, async function (req, res, next) {
    try {
        //load data from database
        let user = await User.findOne({ where: { id: req.user.userId } });
        let location = await Location.findOne({ where: { id: req.user.userId } });
        let patientdata = await PatientData.findOne({ where: { user_id: req.user.userId } });

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
        userData.user = { email: user.email, fName: user.fName, lName: user.lName };
        userData.location = { address: location.address, city: location.city, state: location.state, lat: location.lat, lng: location.lng };
        userData.patientdata = { phone: patientdata.phone, identification_number: patientdata.identification_number };
     
        res.json({ success: true, userData: userData });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;