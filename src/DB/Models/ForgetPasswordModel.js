import mongoose from 'mongoose'
// Create Otp Schema and Model

const ForgetPasswordSchema = new mongoose.Schema(
    {
        // Child Or Parent
        type: {
            type: String,
            enum: ['parent', 'child'],
        },
        // User Id
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            default: null,
        },

        forgetOtp: {
            type: String,
            required: [true, 'forgetOtp field is required'],
        },
        is_used: {
            type: Boolean,
            default: false,
        },
        used_at: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
)

const ForgetPasswordModel = mongoose.model('forgetPassword', ForgetPasswordSchema)

export default ForgetPasswordModel
