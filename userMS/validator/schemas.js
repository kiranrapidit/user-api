// schemas.js 
const Joi = require('joi');
const schemas = {
    login: Joi.object().keys({
        // user_id:Joi.string().alphanum().min(4).max(30).required(),cd
        email: Joi.string().email().trim(true).required(),
        password: Joi.string().alphanum().min(8).trim(true).required(),
    }),
    register: Joi.object().keys({
        first_name:Joi.string().min(4).required(),
        last_name:Joi.string().min(4).required(),
        user_id:Joi.string().alphanum().min(4).max(30).required(),
        email: Joi.string().email().trim(true).required(),
        password: Joi.string().alphanum().min(8).trim(true).required(),
    }),
    getUserProfile:Joi.object().keys({
        id: Joi.string().required()
    }),
    updateUserProfile:Joi.object().keys({
        first_name:Joi.string().min(4).required(),
        last_name:Joi.string().min(4).required(),
        user_id:Joi.string().alphanum().min(4).max(30).required(),
        email: Joi.string().email().trim(true).required(),
        password: Joi.string().alphanum().min(8).trim(true).required(),
    })
}


module.exports = schemas;