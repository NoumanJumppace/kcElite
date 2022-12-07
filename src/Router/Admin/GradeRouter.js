import { Router, application } from 'express'
import GradeController from '../../Controller/Admin/GradeController.js'
// import { AuthMiddleware } from '../Middleware/Auth.js'

export let GradeRouter = Router()

// application.prefix = Router.prefix = function (path, middleware, configure) {
//     configure(GradeRouter);
//     this.use(path, middleware, GradeRouter);
//     return GradeRouter;
// }

application.prefix = Router.prefix = function (path, configure) {
    configure(GradeRouter)
    this.use(path, GradeRouter)
    return GradeRouter
}

GradeRouter.prefix('/grade', async function () {
    GradeRouter.route('/get').get(GradeController.getGrades)
    GradeRouter.route('/create').post(GradeController.addGrade)
    GradeRouter.route('/update/:id').put(GradeController.updateGrade)
})
