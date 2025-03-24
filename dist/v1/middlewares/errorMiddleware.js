"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
};
//# sourceMappingURL=errorMiddleware.js.map