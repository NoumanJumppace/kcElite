import mongoose from 'mongoose'

const videoCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

const VideoCategoryModel = mongoose.model('videoCategory', videoCategorySchema)

export default VideoCategoryModel
