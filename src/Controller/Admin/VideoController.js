// DB / Model
import VideoModel from '../../DB/Models/VideoModel.js'

// Utils (Response, Error, Logger)
import CustomError from '../../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../../Utils/ResponseHandler/CustomSuccess.js'
import { CreateVideoValidator } from '../../Utils/Validator/VideoValidator.js'
import { handleMultipartDataVideo } from '../../Utils/MultipartData.js'
import VideoResource from '../../Utils/Resource/VideoResource.js'

const AddVideo = async (req, res, next) => {
    try {
        const { error } = CreateVideoValidator.validate(req.body)
        if (error) {
            return next(CustomError.createError(error.message, 200))
        }
        const { title, description, grade, category } = req.body
        const { video, thumbnail } = req.files
        const video_url = video[0].path
        const thumbnail_url = thumbnail[0].path
        const VideoCreate = await VideoModel.create({
            title,
            description,
            grade,
            category,
            video_url,
            thumbnail_url,
        })
        console.log(VideoCreate)
        const VideoRes = new VideoResource(VideoCreate)
        return next(CustomSuccess.createSuccess(VideoRes, 'Video Added Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const VideoController = {
    AddVideo: [
        handleMultipartDataVideo.fields([
            { name: 'video', maxCount: 1 },
            { name: 'thumbnail', maxCount: 1 },
        ]),
        AddVideo,
    ],
}

export default VideoController
