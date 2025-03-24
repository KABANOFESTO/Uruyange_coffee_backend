"use strict";
const Joi = require('joi');
module.exports = {
    createUserSchema: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),
};
//# sourceMappingURL=userValidation.js.map