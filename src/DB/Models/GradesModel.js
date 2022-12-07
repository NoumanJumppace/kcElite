import mongoose from 'mongoose'

const gradeSchema = new mongoose.Schema(
    {
        name: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
)

const GradeModel = mongoose.model('grade', gradeSchema)

export default GradeModel
