var jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        if (!token) {
            throw new Error("No jwt token");
        }
        else {
            const decoded = jwt.verify(token, 'mysuper-secret');
            req.user = decoded;
            next();
        }
    }
    catch (err) {
        next(err);
    }
};

function centerAdminMiddleware(req, res, next) {
    try {
        const role = req.user.role;
        if (role != 'clinic_center_admin')
            throw new Error("Not an clinic center admin");
        return next();

    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    authMiddleware: authMiddleware,
    centerAdminMiddleware: centerAdminMiddleware,
    signJWT: function (userId, roleName) { return jwt.sign({ userId: userId, role: roleName }, 'mysuper-secret'); },
};