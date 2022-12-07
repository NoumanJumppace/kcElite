import { Router, application } from 'express'
import AuthController from '../../Controller/AuthController.js'
import { AuthMiddleware } from '../Middleware/Auth.js'

export let AuthRouters = Router()

AuthRouters.route('/register').post(AuthController.registerParents)
AuthRouters.route('/login').post(AuthController.Login)

// Forget Password APIs
AuthRouters.route('/forgetpassword').post(AuthController.ForgotPasswordOPT)
AuthRouters.route('/forgetpassword/verify').post(AuthController.VerifyPasswordOtp)
AuthRouters.route('/resetpassword').post(AuthController.ResetPassword)

application.prefix = Router.prefix = function (path, middleware, configure) {
    configure(AuthRouters)
    this.use(path, middleware, AuthRouters)
    return AuthRouters
}

AuthRouters.prefix('/parents', AuthMiddleware, async function () {
    AuthRouters.route('/update/profile').post(AuthController.ParentsProfile)
})
