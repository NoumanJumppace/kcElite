import Joi from 'joi'

export const CreateVideoValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    grade: Joi.string().required(),
    category: Joi.string().required(),
})
