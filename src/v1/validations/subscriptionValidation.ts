import Joi from 'joi';

export = {
    createSubscriptionSchema: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        userId: Joi.string().optional(),
    }),
};