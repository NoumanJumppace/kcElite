import mongoose from 'mongoose'

const ParentSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        city: {
            type: String,
            default: null,
        },
        state: {
            type: String,
            default: null,
        },
        profilePicture: {
            type: String,
            default: null,
        },
        phone: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        deviceToken: {
            type: String,
            default: null,
        },
        macAddress: {
            type: String,
            default: null,
        },
        subscription: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'subscription',
                default: null,
            },
        ],
        type: {
            type: Boolean,
            default: true,
        },
        child: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'child',
            },
        ],
    },
    {
        timestamps: true,
    },
)

const ParentsModel = mongoose.model('parent', ParentSchema)

export default ParentsModel
