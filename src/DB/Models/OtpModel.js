import mongoose from 'mongoose'
// Create Otp Schema and Model

const OtpSchema = new mongoose.Schema(
    {
        parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'parent',
            required: [true, 'Parent Id field is required'],
        },
        otp: {
            type: String,
            required: [true, 'Otp field is required'],
        },
        is_verified: {
            type: Boolean,
            default: false,
        },
        verfiy_at: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    },
)

const OtpModel = mongoose.model('otp', OtpSchema)

export default OtpModel
