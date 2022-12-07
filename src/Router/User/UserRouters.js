import { Router, application } from 'express'
import GradeController from '../../Controller/Admin/GradeController.js'
import AuthController from '../../Controller/AuthController.js'
import { AuthMiddleware } from '../Middleware/Auth.js'

export let UserRouters = Router()

UserRouters.route('/grade/get').get(GradeController.getGrades)

application.prefix = Router.prefix = function (path, middleware, configure) {
    configure(UserRouters)
    this.use(path, middleware, UserRouters)
    return UserRouters
}

UserRouters.prefix('/parents', AuthMiddleware, async function () {
    UserRouters.route('/update/profile').post(AuthController.ParentsProfile)
})
