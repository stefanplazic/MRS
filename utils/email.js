var nodemailer = require('nodemailer');

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
exports.sendVerification = function (user) {
    var link = 'http://localhost:3000/users/verify?username=' + user.email + '&token=';

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

/*function sending reset password mail*/
exports.resetPassword = function (user) {
    var link = hostInfo.host + 'html/resetPass.html?token=' + user.resetPasswordToken;

    let mailOptions = {
        from: '"MRS Hospital 👻" nekiludtim@gmail.com', // sender address
        to: user.email, // list of receivers
        subject: 'Password reset link ✔', // Subject line
        html: "<b>" + user.username + "</b>" + " if you had request password reset - feel free to click on the <a href=" + link + ">link</a> <p>Otherwise just ignore it  😋 </p>" // html body
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });
};
