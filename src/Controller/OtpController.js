import path from 'path'
// Models
import Parent from '../DB/Models/ParentsModel.js'
import OtpModel from '../DB/Models/OtpModel.js'
// Utils (Response, Error, Logger)
import CustomError from '../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../Utils/ResponseHandler/CustomSuccess.js'
import { sendEmails, getFileContent } from '../Utils/SendEmail.js'
import UserResource from '../Utils/Resource/UserResource.js'
import { generateToken } from '../Utils/jwt.js'

export const resendOtp = async (req, res, next) => {
    try {
        const { parent_id } = req.params
        // Check if the parent exist
        const isParentExist = await Parent.findOne({ _id: parent_id })
        if (!isParentExist) {
            return next(CustomError.createError('Parent does not exist', 200))
        }
        // Create 6 digit OTP
        const ParentOtp = Math.floor(100000 + Math.random() * 900000)
        // Check if Parent Already has OTP
        const isOtpExist = await OtpModel.findOne({ parent_id: parent_id })
        if (isOtpExist) {
            // Update the OTP
            await OtpModel.findByIdAndUpdate(isOtpExist._id, {
                otp: ParentOtp,
                is_verified: false,
                verfiy_at: null,
            })
        } else {
            // Create new OTP
            await OtpModel.create({
                parent_id: parent_id,
                otp: ParentOtp,
                is_verified: false,
                verfiy_at: null,
            })
        }
        // Send OTP to the Parenet
        let subject = 'OTP for registration'
        let template = await getFileContent(path.join('src', 'Static', 'create-user.html'))
        template = template.replace('{{email}}', isParentExist.email)
        template = template.replace('{{phoneNumber}}', isParentExist.phone)
        template = template.replace('{{verifcation}}', ParentOtp)
        // template = template.replace("{{link}}", `https://${req.headers.host}/verfiy-email?token=${NewParent.token}`);
        sendEmails(isParentExist.email, subject, template, (err, data) => {
            if (err) {
                console.error(err)
            } else {
                console.log(data, 'Email sent in OTP Controller')
            }
        })
        // Send Response
        return next(CustomSuccess.createSuccess(null, 'OTP sent successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

export const verifyOtp = async (req, res, next) => {
    try {
        const { parent_id, otp } = req.body
        // Check if the parent exist
        const isParentExist = await Parent.findOne({ _id: parent_id })
        if (!isParentExist) {
            return next(CustomError.createError('Parent does not exist', 200))
        }
        // Check if the OTP exist
        const isOtpExist = await OtpModel.findOne({ parent_id: parent_id })
        if (!isOtpExist) {
            return next(CustomError.createError('OTP does not exist', 200))
        }
        // Check if the OTP is verified
        if (isOtpExist.is_verified) {
            return next(CustomError.createError('OTP already verified', 200))
        }
        // Check if the OTP is correct
        if (isOtpExist.otp !== otp) {
            return next(CustomError.createError('OTP is incorrect', 200))
        }
        // Update the OTP
        await OtpModel.findByIdAndUpdate(isOtpExist._id, {
            otp: null,
            is_verified: true,
            verfiy_at: Date.now(),
        })
        // Login the Parent
        // console.log(isParentExist);
        var UserDetail = isParentExist
        // Generate Token
        const token = generateToken(UserDetail)
        // Generate User Resource
        const userResource = UserResource.UserAndToken(UserDetail, token)
        // Send Response
        return next(CustomSuccess.createSuccess(userResource, 'OTP verified successfully', 200))
    } catch (error) {
        console.error(error)
    }
}
