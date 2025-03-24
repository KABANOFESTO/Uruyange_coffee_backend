"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
//# sourceMappingURL=roleMiddleware.js.map