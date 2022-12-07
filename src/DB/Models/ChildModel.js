import mongoose from 'mongoose'

const ChildSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            default: null,
        },
        profilePicture: {
            type: String,
            default: null,
        },
        grade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'grade',
            default: null,
        },
        birthdate: {
            type: String,
            default: null,
        },
        tier: {
            type: String,
            default: null,
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'parent',
        },
        deviceToken: {
            type: String,
            default: null,
        },
        macAddress: {
            type: String,
            default: null,
        },
        type: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

const ChildModel = mongoose.model('child', ChildSchema)

export default ChildModel
