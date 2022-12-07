import joi from 'joi'

export const GradeValidator = joi.object({
    name: joi.number().required(),
    // description: joi.string().required(),
})
