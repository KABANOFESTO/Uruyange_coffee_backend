"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
module.exports = {
    createSubscriptionSchema: joi_1.default.object({
        name: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        userId: joi_1.default.string().optional(),
    }),
};
//# sourceMappingURL=subscriptionValidation.js.map