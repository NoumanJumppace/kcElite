import { Router } from 'express'
import { resendOtp, verifyOtp } from '../../Controller/OtpController.js'

export let OtpRouters = Router()

// Opt Routes
OtpRouters.route('/verify-otp').post(verifyOtp)
OtpRouters.route('/resend-otp/parent=:parent_id').get(resendOtp)
