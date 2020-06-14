var nodemailer = require('nodemailer');
const linkConst='http://localhost:3000/';
// Create a SMTP transport object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nekiludtim@gmail.com', // generated ethereal user
        pass: 'NekiTim!12' // generated ethereal password

    },
    tls: {
        rejectUnauthorized: false
    }
});

/*function for sending verification emails*/
exports.sendVerification = function (user, token) {
    var link = linkConst+'users/verify/' + token;

    let mailOptions = {
        from: '"MRS Hospital 👻" nekiludtim@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Verification link ✔', // Subject line
        html: "Helloo new user! If you just registered to ShorTeller you - feel free to click on verification <a href=" + link + ">link</a>" // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
};

exports.sendDeclineMessage = function (userEmail, resonText) {
    let mailOptions = {
        from: '"MRS Hospital 👻" nekiludtim@gmail.com', // sender address
        to: userEmail, // list of receivers
        subject: 'Registration declined', // Subject line
        html: "We are sorry that you had been declined , here is the reason for that: <p><b>" + resonText + "</b></p>" // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
};


exports.sendAdminMail = function (message,admins){
    let email = admins[0].email;
    let mailOptions = {
        from: '"MRS Hospital 👻" nekiludtim@gmail.com', // sender address
        to: email,
        subject: 'Appointment request', // Subject line
        html: "You have appointment request" // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
}

exports.approveSchedule = function (schedule,patientEmail){
    var acceptlink = linkConst+'patients/approve-appointment/' + schedule.dataValues.id;
    var declinelink = linkConst+'patients/decline-appointment/' + schedule.dataValues.id;
    let mailOptions = {
        from: '"MRS Hospital 👻" nekiludtim@gmail.com', // sender address
        to: patientEmail,
        subject: 'Accept or decline schedule', // Subject line
        html: "Admin approved your appointment.  You can <a href=" + acceptlink + ">accept</a> or <a href=" + declinelink + ">decline</a>"
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
}

exports.notifyDoctor = function (schedule,doctorEmail){
    let mailOptions = {
        from: '"MRS Hospital 👻" nekiludtim@gmail.com', // sender address
        to: doctorEmail,
        subject: 'Appointment info', // Subject line
        html: "you have appointment come soon " + schedule.dataValues.start_timestamp
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
}
