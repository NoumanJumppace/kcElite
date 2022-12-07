import { Router, application } from 'express'
// import GradeController from '../../Controller/Admin/GradeController.js'
// import VideoCatagoryController from '../../Controller/Admin/VideoCatagoryController.js'
import VideoController from '../../Controller/Admin/VideoController.js'
// import { AuthMiddleware } from '../Middleware/Auth.js'

export let VideoRouter = Router()

// application.prefix = Router.prefix = function (path, middleware, configure) {
//     configure(VideoRouter);
//     this.use(path, middleware, VideoRouter);
//     return VideoRouter;
// }
application.prefix = Router.prefix = function (path, configure) {
    configure(VideoRouter)
    this.use(path, VideoRouter)
    return VideoRouter
}

VideoRouter.prefix('/video', async function () {
    // VideoRouter.route("/get").get(VideoCatagoryController.getVideoCatagory);
    VideoRouter.route('/create').post(VideoController.AddVideo)
    // VideoRouter.route("/update/:id").put(VideoCatagoryController.updateVideoCatagory);
})
