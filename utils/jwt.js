import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
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