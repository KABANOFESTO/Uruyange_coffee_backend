"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const paymentService_1 = require("../services/paymentService");
const apiResponse_1 = require("../utils/apiResponse");
exports.paymentController = {
    createPayment: async (req, res) => {
        const paymentData = req.body;
        try {
            const payment = await (0, paymentService_1.createPayment)(paymentData);
            apiResponse_1.apiResponse.success(res, payment, 201);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 500);
        }
    },
    getPayments: async (req, res) => {
        try {
            const payments = await (0, paymentService_1.getPayments)();
            apiResponse_1.apiResponse.success(res, payments);
        }
        catch (error) {
            apiResponse_1.apiResponse.error(res, error.message, 500);
        }
    },
};
//# sourceMappingURL=paymentController.js.map