import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        video_url: {
            type: String,
            required: true,
        },
        thumbnail_url: {
            type: String,
            required: true,
        },
        // Reference to the Grade Model
        grade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade',
        },
        // Reference to the VideoCategory Model
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoCategory',
        },
    },
    {
        timestamps: true,
    },
)

const VideoModel = mongoose.model('video', videoSchema)

export default VideoModel
