const Joi = require('@hapi/joi');

// REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(5).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        city: Joi.string().required(),
        state: Joi.string().required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;