// DB / Model
import VideoCategoryModel from '../../DB/Models/VideoCategoryModel.js'
// Utils (Response, Error, Logger)
import VideoCatagoryResource from '../../Utils/Resource/VideoCatagory.js'
import CustomError from '../../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../../Utils/ResponseHandler/CustomSuccess.js'
import { VideoCatagoryValidator } from '../../Utils/Validator/VideoCatagoryValidator.js'

const getVideoCatagory = async (req, res, next) => {
    try {
        const videoCatagory = await VideoCategoryModel.find()
        const newVideoCatagoryResource = videoCatagory.map((videoCatagory) => {
            return new VideoCatagoryResource(videoCatagory)
        })
        return next(
            CustomSuccess.createSuccess(newVideoCatagoryResource, 'All Video Catagory', 200),
        )
    } catch (error) {
        console.error(error)
    }
}

const addVideoCatagory = async (req, res, next) => {
    try {
        const { error } = VideoCatagoryValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { name, description } = req.body
        const videoCata = await VideoCategoryModel.create({ name, description })
        const newVideoCatagoryResource = new VideoCatagoryResource(videoCata)
        return next(
            CustomSuccess.createSuccess(
                newVideoCatagoryResource,
                'Video Catagory Added Successfully',
                200,
            ),
        )
    } catch (error) {
        console.error(error)
    }
}

const updateVideoCatagory = async (req, res, next) => {
    try {
        const { error } = VideoCatagoryValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { name, description } = req.body
        const { id } = req.params
        await VideoCategoryModel.findByIdAndUpdate(id, { name, description })
        return next(CustomSuccess.createSuccess({}, 'Video Catagory Updated Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const DeleteVideoCatagory = async (req, res, next) => {
    try {
        const { id } = req.params
        await VideoCategoryModel.findByIdAndDelete(id)
        return next(CustomSuccess.createSuccess({}, 'Video Catagory Deleted Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const VideoCatagoryController = {
    getVideoCatagory,
    addVideoCatagory,
    updateVideoCatagory,
    DeleteVideoCatagory,
}

export default VideoCatagoryController
