import mongoose from 'mongoose'

const SubscriptionTypesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name field is required'],
        },
        description: {
            type: String,
            required: [true, 'description field is required'],
        },
        price: {
            type: Number,
            required: [true, 'price field is required'],
        },
        duration: [
            {
                month: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,
    },
)

const SubscriptionTypesModel = mongoose.model('subscriptionTypes', SubscriptionTypesSchema)

export default SubscriptionTypesModel
