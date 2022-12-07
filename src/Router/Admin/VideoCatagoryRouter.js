import { Router, application } from 'express'
// import GradeController from '../../Controller/Admin/GradeController.js'
import VideoCatagoryController from '../../Controller/Admin/VideoCatagoryController.js'
// import { AuthMiddleware } from '../Middleware/Auth.js'

export let VideoCatagoryRouter = Router()

// application.prefix = Router.prefix = function (path, middleware, configure) {
//     configure(VideoCatagoryRouter);
//     this.use(path, middleware, VideoCatagoryRouter);
//     return VideoCatagoryRouter;
// }
application.prefix = Router.prefix = function (path, configure) {
    configure(VideoCatagoryRouter)
    this.use(path, VideoCatagoryRouter)
    return VideoCatagoryRouter
}

VideoCatagoryRouter.prefix('/videocatagory', async function () {
    VideoCatagoryRouter.route('/get').get(VideoCatagoryController.getVideoCatagory)
    VideoCatagoryRouter.route('/create').post(VideoCatagoryController.addVideoCatagory)
    VideoCatagoryRouter.route('/update/:id').put(VideoCatagoryController.updateVideoCatagory)
})
