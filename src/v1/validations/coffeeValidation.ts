import Joi from 'joi';

export = {
    createCoffeeSchema: Joi.object({
        image: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        userId: Joi.string().required(),
    }),
};