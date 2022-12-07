import joi from 'joi'

export const SubscriptionPurchaseValidator = joi.object({
    subscriptionId: joi.string().required(),
    duration_id: joi.string().required(),
})

export const addSubscriptionValidator = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    duration: joi
        .array()
        .items(
            joi.object({
                month: joi.string().required(),
            }),
        )
        .required(),
})
