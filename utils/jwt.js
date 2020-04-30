var jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        if (!token) {
            throw new Error("No jwt token");
        }
        else {
            const decoded = jwt.verify(token, 'mysuper-secret');
            req.user = decoded.data;
            next();
        }
    }
    catch (err) {
        next(err);
    }
};

module.exports = {
    authMiddleware: authMiddleware,
    signJWT: function (userId) { return jwt.sign({ userId: userId }, 'mysuper-secret'); },
};