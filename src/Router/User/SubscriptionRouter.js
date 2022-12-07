import { Router, application } from 'express'
import SubscriptionController from '../../Controller/SubscriptionController.js'
import { AuthMiddleware } from '../Middleware/Auth.js'

export let SubscriptionRouter = Router()

application.prefix = Router.prefix = function (path, middleware, configure) {
    configure(SubscriptionRouter)
    this.use(path, middleware, SubscriptionRouter)
    return SubscriptionRouter
}

SubscriptionRouter.prefix('/subscription', AuthMiddleware, async function () {
    SubscriptionRouter.get('/types', SubscriptionController.getAllSubscriptionsType)
    SubscriptionRouter.post('/buy', SubscriptionController.buySubscription)
    SubscriptionRouter.get('/current', SubscriptionController.getCurrentUserSubscription)
})
