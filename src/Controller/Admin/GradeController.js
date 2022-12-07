// DB / Models
import GradeModel from '../../DB/Models/GradesModel.js'
// Utils (Response, Error, Logger)
import GradeResource from '../../Utils/Resource/GradeResource.js'
import CustomError from '../../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../../Utils/ResponseHandler/CustomSuccess.js'
import { GradeValidator } from '../../Utils/Validator/GradeValidator.js'

const addGrade = async (req, res, next) => {
    try {
        // Validate the request body
        const { error } = GradeValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { name } = req.body
        await GradeModel.create({ name })
        return next(CustomSuccess.createSuccess({}, 'Grade Added Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const getGrades = async (req, res, next) => {
    try {
        // Descending Order by Name
        const grades = await GradeModel.find().sort({ name: 1 })

        const newGradesResource = grades.map((grade) => {
            return new GradeResource(grade)
        })
        return next(CustomSuccess.createSuccess(newGradesResource, 'All Grades', 200))
    } catch (error) {
        console.error(error)
    }
}

const updateGrade = async (req, res, next) => {
    try {
        const { error } = GradeValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { name } = req.body
        const { id } = req.params
        await GradeModel.findByIdAndUpdate(id, { name })
        return next(CustomSuccess.createSuccess({}, 'Grade Updated Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const DeleteGrade = async (req, res, next) => {
    try {
        const { id } = req.params
        await GradeModel.findByIdAndDelete(id)
        return next(CustomSuccess.createSuccess({}, 'Grade Deleted Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const GradeController = {
    addGrade,
    getGrades,
    updateGrade,
    DeleteGrade,
}

export default GradeController
