"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
exports.apiResponse = {
    success: (res, data, status = 200) => res.status(status).json({ success: true, data }),
    error: (res, message, status = 400) => res.status(status).json({ success: false, message }),
};
//# sourceMappingURL=apiResponse.js.map