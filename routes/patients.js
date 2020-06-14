var express = require('express');
var router = express.Router();
var JWT = require('../utils/jwt');
var db = require('../models');
var { QueryTypes } = require('sequelize');
var { Op } = require('sequelize')
var User = require('../models').User;
var PatientData = require('../models').PatientData;
var Location = require('../models').Location;
var Specialization = require('../models').Specialization;
var Schedule = require('../models').Schedule;
var Clinic = require('../models').Clinic;
var Dates = require('../utils/date');
var ClinicGrade = require('../models').ClinicGrade;
var DoctorGrade = require('../models').DoctorGrade;
var ScheduleType = require('../models').ScheduleType;
var DoctorData = require('../models').DoctorData;
var Email = require('../utils/email');

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
        console.error(error);
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
        const results = await db.sequelize.query("SELECT Clinics.id,Clinics.name,(SELECT  CONCAT_WS(', ',Locations.address,Locations.city,Locations.state)  from Locations WHERE Locations.id = Clinics.location) as address from Clinics WHERE Clinics.id IN (SELECT DoctorData.clinic_id from DoctorData INNER JOIN DoctorSpecializations on DoctorData.user_id = DoctorSpecializations.doctor_id INNER JOIN Vacations ON Vacations.doctor_id = DoctorData.user_id WHERE DoctorSpecializations.id = :appointmentType AND Vacations.vacation_date != :searchDate) AND Clinics.name LIKE :clinicName;"
            , {
                replacements: { searchDate: date, appointmentType: appointment, clinicName: name + '%' },
                type: QueryTypes.SELECT
            });

        res.json({ success: true, clinics: results });
    }
    catch (error) {
        console.error(error);
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

router.get('/clinicData/:clinicId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const clinicId = req.params.clinicId;
        const results = await Clinic.findOne({where:{id:clinicId}});
        res.json({ success: true, clinic: results });
   }
    catch (error) {
        next(error);
    }
});

router.get('/pre-scheduled-examination/:clinicId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const clinicId = req.params.clinicId;
        const results = await db.sequelize.query("SELECT Schedules.id, Schedules.price,Schedules.discount, Schedules.scheduleType, DATE_FORMAT(Schedules.start_timestamp,'%H:%i:%s') as start_time, DATE_FORMAT(Schedules.end_timestamp,'%H:%i:%s') as end_time,CONCAT(Rooms.floor,Rooms.label) as room, Users.id as doctorId,CONCAT(Users.fName,Users.lName) as doctor_name FROM Schedules INNER JOIN DoctorData ON Schedules.doctorId = DoctorData.user_id INNER JOIN Users ON Users.id = DoctorData.user_id INNER JOIN Rooms ON Rooms.id = Schedules.roomId WHERE Schedules.reserved = 0 AND DoctorData.clinic_id = :clinicId AND Schedules.patienId IS NULL;",{
                replacements: { clinicId: clinicId},
                type: QueryTypes.SELECT
            });
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
        const schedules = await db.sequelize.query("SELECT Schedules.id as scheduleId,Schedules.start_timestamp as scheduleDate, d.id as doctorId,CONCAT(d.fName,d.lName) as doctor, Clinics.name as clinic, Schedules.scheduleType FROM `Schedules` INNER JOIN Users d ON d.id = Schedules.doctorId INNER JOIN DoctorData ON DoctorData.user_id = Schedules.doctorId INNER JOIN Clinics ON Clinics.id = DoctorData.clinic_id WHERE Schedules.reserved = 1 AND Schedules.patienId = :patientId;",{
                replacements: { patientId: req.user.userId},
                type: QueryTypes.SELECT
            });
        res.json({ success: true, appointments: schedules });
     }
    catch (error) {
        console.error(error);
        next(error);
    }
});

//for canceling appointments 24 hours before date
router.put('/cancel-examination/:examId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const examId = req.params.examId;
        const userId = req.user.userId;
        var deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() - 1);

        const schedule = await Schedule.findOne({ where: { reserved: true, id: examId, patienId:userId, start_timestamp:{[Op.gte]:deadlineDate } } });

        if (schedule == null) return res.json({ success: false, message: 'No such examination' });
        await Schedule.update({ patienId: null, reserved: false }, { where: { id: examId } });
        res.json({ success: true, message: 'Successfully canceled.' });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});


//search doctors in given clinic
router.get('/doctors/:clinicId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sut'];
        const clinicId = req.params.clinicId;
        const dateOfExamination = req.query.date == undefined ? new Date() : new Date(req.query.date);
        const specialisationType = req.query.specialisationType;
        if(specialisationType == undefined) return res.json({ success: false, message:'No specialisation defined' });
        //find clinic
        const clinic = await Clinic.findOne({where:{id:clinicId}});
        if(clinic === null) return res.json({ success: false, message:'No such clinic' });
        //find doctors
        const results = await db.sequelize.query("SELECT Users.id, Users.fName, Users.lName, IFNULL((SELECT AVG(DoctorGrades.grade) FROM DoctorGrades WHERE DoctorGrades.doctor_id = Users.id),0) as grade FROM Users INNER JOIN DoctorData ON Users.id = DoctorData.user_id INNER JOIN DoctorAviabilities On Users.id = DoctorAviabilities.doctor_id INNER JOIN DoctorSpecializations ON Users.id = DoctorSpecializations.doctor_id WHERE DoctorData.clinic_id = :clinicId AND DoctorSpecializations.id = :specialisationType AND Users.id NOT IN (SELECT Vacations.doctor_id FROM Vacations WHERE Vacations.vacation_date = :dateOfExamination) AND DoctorAviabilities.day_of_the_week = :day;"
            , {
                replacements: { day: days[dateOfExamination.getDay()], dateOfExamination: dateOfExamination, specialisationType: specialisationType, clinicId: clinicId },
                type: QueryTypes.SELECT
            });
        res.json({ success: true, doctors:results });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

//find timetables for doctor
router.get('/doctorTimeTable/:doctorId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sut'];
        const doctorId = req.params.doctorId;
        const dateOfExamination = req.query.date == undefined ? new Date() : new Date(req.query.date);
        var aviability;
        var aviabilityResults = await db.sequelize.query("SELECT DoctorAviabilities.start_time as start_time, DoctorAviabilities.end_time as end_time, DoctorData.timeslot_per_client FROM DoctorAviabilities INNER JOIN DoctorData ON DoctorAviabilities.doctor_id = DoctorData.user_id  WHERE DoctorAviabilities.doctor_id = :doctorId AND DoctorAviabilities.day_of_the_week = :day AND DoctorAviabilities.doctor_id NOT IN (SELECT Vacations.doctor_id FROM Vacations WHERE Vacations.vacation_date = :dateOfExamination) LIMIT 1;"
            , {
                replacements: { day: days[dateOfExamination.getDay()], dateOfExamination: dateOfExamination, doctorId:doctorId },
                type: QueryTypes.SELECT
            });
        const scheduleResults = await db.sequelize.query("SELECT Schedules.start_timestamp as start_timestamp, Schedules.end_timestamp as end_timestamp FROM Schedules WHERE Schedules.doctorId = :doctorId AND Date(Schedules.start_timestamp) = Date(:dateOfExamination);"
            , {
                replacements: {dateOfExamination: dateOfExamination, doctorId:doctorId },
                type: QueryTypes.SELECT
            });
        if(aviabilityResults.length == 0) return res.send({success:false,message:'No abavility definied for this day'});
        
        aviability = aviabilityResults[0];
        //generate slots for given working time
        aviability =  Dates.generateTimeSlots(aviability.start_time, aviability.end_time, aviability.timeslot_per_client,scheduleResults);
        //remove slots which are scheduled
        res.json({ success: true, aviability:aviability });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

//check if clinic is rated
router.get('/isclinicrated/:clinicId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const clinicId = req.params.clinicId;
        const userId = req.user.userId;
        
        let result = await db.sequelize.query("SELECT COUNT(*) as scheduled FROM Schedules INNER JOIN DoctorData ON Schedules.doctorId = DoctorData.user_id WHERE Schedules.patienId =:userId AND DoctorData.clinic_id = :clinicId AND Schedules.end_timestamp < CURRENT_TIMESTAMP();"
            , {replacements: {userId: userId, clinicId:clinicId },type: QueryTypes.SELECT});;
        if(result[0].scheduled == 0) return res.json({success:false,message:'Dont have schduled in this clinic'});
        result = await ClinicGrade.findOne({where:{clinic_id:clinicId,user_id:userId}});
        console.log(result);
        return res.json({success:true,isRated:result == null ? true : false});
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});


//rate clinic
router.post('/clinicrate/:clinicId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const clinicId = req.params.clinicId;
        const rate = req.body.rate;
        const userId = req.user.userId;

        if(rate == undefined) return res.json({success:false,message:'No rate mark'});
        if(!Number.isInteger(rate) && rate < 1 && rate > 5) return res.json({success:false,message:'Rate must be an number between 1 and 5'});
        //check if clinic exists
        let result = await Clinic.findOne({where:{id:clinicId}});
        if(result === null) return res.json({ success: false, message:'No such clinic' });
        //check if user had scheduled in given clinic
        result = await db.sequelize.query("SELECT COUNT(*) as sheduleCount FROM Clinics INNER JOIN DoctorData ON Clinics.id = DoctorData.clinic_id INNER JOIN Schedules ON Schedules.doctorId = DoctorData.user_id WHERE Schedules.end_timestamp < CURRENT_TIMESTAMP() AND Schedules.patienId = :userId;"
            , {replacements: {userId: userId },type: QueryTypes.SELECT});
        if(result[0].sheduleCount == 0) return res.json({ success: false, message:'Patient didnt have a scheudle in this clinic' });
        //check if user allready rated the clinic
        result = await db.sequelize.query("SELECT COUNT(*) as rateCount FROM ClinicGrades WHERE ClinicGrades.clinic_id  = :clinicId AND ClinicGrades.user_id = :userId;"
            , {replacements: {userId: userId, clinicId:clinicId },type: QueryTypes.SELECT});
        //rate clinic
        if(result[0].rateCount > 0) return res.json({ success: false, message:'Patient allready rated' });
        result = await ClinicGrade.create({clinic_id:clinicId,user_id:userId,grade:rate});
        res.json({ success: true, aviability:result });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/doctorlist', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const userId = req.user.userId;
        var results = await db.sequelize.query("SELECT DISTINCT Users.id,Users.fName, Users.lName FROM Users INNER JOIN Schedules ON Users.id = Schedules.doctorId WHERE Schedules.end_timestamp < CURRENT_TIMESTAMP() AND Schedules.patienId = :userId AND Users.id NOT IN (SELECT DoctorGrades.doctor_id FROM DoctorGrades WHERE DoctorGrades.user_id = :userId);"
            , {replacements: { userId:userId },type: QueryTypes.SELECT}
            );
        res.json({ success: true, doctors:results });
        }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/rateDoctor/:doctorId', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const userId = req.user.userId;
        const doctorId = req.params.doctorId;
        const rate = parseInt(req.body.rate);
        let results;
        if(rate == undefined || !Number.isInteger(rate) || rate < 1 || rate > 6) return res.json({success:false,message:'Not valid rate'});
        //check if user had already voted
        results = await DoctorGrade.findOne({where:{doctor_id:doctorId,user_id:userId}});
        if(results != null) return res.json({success:false,message:'Allready voted!'});
        //rate
        results = await DoctorGrade.create({doctor_id:doctorId,user_id:userId,grade:rate});
        res.json({ success: true, result:results });
      }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/schedule-appointment/', JWT.authMiddleware, JWT.patientMiddleware, async function (req, res, next) {
    try {
        const body = req.body;
        const userId = req.user.userId;
        let start_timestamp = new Date(body.date);
        start_timestamp.setHours(new Date(body.start_timestamp).getHours()+2);
        start_timestamp.setMinutes(new Date(body.start_timestamp).getMinutes());
        start_timestamp.setSeconds(0);
        let end_timestamp;
        const doctorId  = body.doctorId;
        const scheduleType= body.scheduleType;
        if(scheduleType == undefined) return res.json({success:false,message:'No scheduleType'});
        end_timestamp = await DoctorData.findOne({where:{user_id:doctorId}});
        end_timestamp = end_timestamp.timeslot_per_client;
        end_timestamp = new Date(start_timestamp.getTime() + end_timestamp*60000);
        let result = await Specialization.findOne({where:{id:scheduleType}});
        if(result == null) return res.json({success:false,message:'No such scheduleType'});
        const check = await db.sequelize.query("SELECT COUNT(*) as vot FROM Schedules WHERE Schedules.start_timestamp = :start_timestamp AND Schedules.patienId = :userId AND Schedules.doctorId = :doctorId;"
            , {replacements: { userId:userId,doctorId:doctorId,start_timestamp:start_timestamp },type: QueryTypes.SELECT}
            );
        if(check[0].vot != 0) return res.json({success:false,message:'Taken appointment'});
        result = await Schedule.create({patienId:userId,doctorId:doctorId,start_timestamp:start_timestamp,end_timestamp:end_timestamp,price:1000,scheduleType:result.name,reserved:false});
        res.json({ success: true, result:result });
        result = await db.sequelize.query("SELECT Users.email FROM Users INNER JOIN Roles ON Users.role_id = Roles.id WHERE Roles.name = 'clinic_center_admin';"
            , {type: QueryTypes.SELECT}
            );
         
        //send email to admins
        Email.sendAdminMail('New appointment request',result);
         }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/approve-appointment/:scheduleId', async function (req, res, next) {
    try {
        const scheduleId = req.params.scheduleId;
        await Schedule.update({reserved:true},{where:{id:scheduleId}});
        res.json({ success: true, message:'Approved' });
      }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/decline-appointment/:scheduleId',  async function (req, res, next) {
    try {
        const scheduleId = req.params.scheduleId;
        const result = await Schedule.findOne({where:{id:scheduleId}});
        if(result.dataValues.reserved == true) return res.json({ success: false, message:'Allready accepted' });
        await Schedule.destroy({where:{id:scheduleId}});
        res.json({ success: true, message:'Declined' });
         }
    catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/medical-record', JWT.authMiddleware, JWT.patientMiddleware,  async function (req, res, next) {
    try {
        const userId = req.user.userId;
        const medicalRecord = await db.sequelize.query("SELECT * FROM MedicalRecords  WHERE MedicalRecords.patient_id = :userId;"
            , {replacements: { userId:userId},type: QueryTypes.SELECT});
        const schedules = await db.sequelize.query("SELECT * FROM Schedules INNER JOIN Users ON Users.id = Schedules.doctorId INNER JOIN Rooms ON Rooms.id = Schedules.roomId WHERE Schedules.patienId =:userId AND Schedules.reserved"
            , {replacements: { userId:userId},type: QueryTypes.SELECT});
        res.json({ success: true, medicalRecord:medicalRecord,schedules:schedules });
         }
    catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;