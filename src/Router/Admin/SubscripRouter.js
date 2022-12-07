import { Router, application } from 'express'
import SubscripController from '../../Controller/Admin/SubscripController.js'
// import { AuthMiddleware } from '../Middleware/Auth.js'

export let SubscripRouter = Router()

// middleware,
// middleware,
application.prefix = Router.prefix = function (path, configure) {
    configure(SubscripRouter)
    this.use(path, SubscripRouter)
    return SubscripRouter
}

SubscripRouter.prefix('/subscrip', async function () {
    SubscripRouter.route('/get').get(SubscripController.getSubscriptions)
    SubscripRouter.route('/add').post(SubscripController.addSubscription)
    SubscripRouter.route('/update/:id').put(SubscripController.updateSubscription)
})
