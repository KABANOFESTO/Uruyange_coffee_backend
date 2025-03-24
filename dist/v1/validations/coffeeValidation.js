"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const joi_1 = __importDefault(require("joi"));
module.exports = {
    createCoffeeSchema: joi_1.default.object({
        image: joi_1.default.string().required(),
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        userId: joi_1.default.string().required(),
    }),
};
//# sourceMappingURL=coffeeValidation.js.map