import mongoose from 'mongoose'

const SubscriptionSchema = new mongoose.Schema(
    {
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'parent',
        },
        subscriptionType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'subscriptionTypes',
        },
        child: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'child',
            },
        ],
        totalAmount: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number,
        },
        expiryDate: {
            type: Date,
            default: null,
        },
        purchaseDate: {
            type: Date,
            default: null,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
)

const SubscriptionModel = mongoose.model('subscription', SubscriptionSchema)

export default SubscriptionModel
