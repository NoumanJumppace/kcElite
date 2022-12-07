import path from 'path'
import fs from 'fs'
import moment from 'moment'
// Models
import ParentsModel from '../DB/Models/ParentsModel.js'
import OtpModel from '../DB/Models/OtpModel.js'
import ChildModel from '../DB/Models/ChildModel.js'
import SubscriptionModel from '../DB/Models/SubscriptionModel.js'
import ForgetPasswordModel from '../DB/Models/ForgetPasswordModel.js'
import GradeModel from '../DB/Models/GradesModel.js'
// Utils (Response, Error, Logger)
import CustomError from '../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../Utils/ResponseHandler/CustomSuccess.js'
import UserResource from '../Utils/Resource/UserResource.js'
import {
    AfterSignupValidator,
    ForgotPasswordValidator,
    LoginValidator,
    RegisterValidator,
    ResetPasswordOTPValidator,
    ResetPasswordValidator,
} from '../Utils/Validator/UserValidator.js'
import { hashPassword, comparePassword } from '../Utils/SecuringPassword.js'
import { sendEmails, getFileContent } from '../Utils/SendEmail.js'
import { generateToken } from '../Utils/jwt.js'
import { handleMultipartData } from '../Utils/MultipartData.js'

const registerParents = async (req, res, next) => {
    try {
        // Validate the request body
        const { error } = RegisterValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        // Check if the user already exists
        const { phone, email, deviceToken, password, confirmPassword } = req.body
        // Get Device Address
        // const deviceAddress = req.connection.remoteAddress
        // console.log(deviceAddress, "deviceAddress");
        // Make sure the password and confirm password are the same
        if (password !== confirmPassword) {
            throw next(
                CustomError.createError('Password and confirm password must be the same', 200),
            )
        }
        // Check if the user already exists in the database with the same email or phone
        const isParentExist = await ParentsModel.findOne({
            $or: [{ email: email }, { phone: phone }],
        })
        // console.log(isParentExist);

        if (isParentExist) {
            return next(CustomError.createError('Parent already exist', 200))
        }
        // Create a new Parent
        const NewParent = await ParentsModel.create({
            phone: phone,
            email: email,
            deviceToken: deviceToken,
            password: hashPassword(password),
        })
        // Create 6 digit OTP
        const ParentOtp = Math.floor(100000 + Math.random() * 900000)
        // Check if Parent Already has OTP
        const NewOtp = await OtpModel.create({
            parent_id: NewParent._id,
            otp: ParentOtp,
            is_verified: false,
            verfiy_at: null,
        })
        // Send OTP to the Parenet
        let subject = 'OTP for Registration'
        let template = await getFileContent(path.join('src', 'Static', 'create-user.html'))
        // template = template.replace('{{email}}', NewParent.email);
        // template = template.replace('{{phoneNumber}}', NewParent.phone);
        template = template.replace('{{verifcation}}', NewOtp.otp)
        // template = template.replace("{{link}}", `https://${req.headers.host}/verfiy-email?token=${NewParent.token}`);
        sendEmails(NewParent.email, subject, template, (err, data) => {
            if (err) {
                console.error(err)
            } else {
                console.log(data, 'sendEmails in AuthController')
            }
        })

        // Generate Random Account Name  with Parent Email And Add Random Account Name with 6 Alphabets and 6 Numbers
        const accountName =
            NewParent.email.split('@')[0] + Math.floor(100000 + Math.random() * 900000)
        // Generte Random Account Password with 10 Alphabets or 10 Numbers
        const accountPassword = Math.random().toString(36).slice(-10)

        // Create new Child Account
        const NewChild = await ChildModel.create({
            parent: NewParent._id,
            email: accountName,
            password: hashPassword(accountPassword),
        })
        // Update Parent Account with Child Account
        await ParentsModel.findByIdAndUpdate(
            NewParent._id,
            { $push: { child: NewChild._id } },
            { new: true },
        )
        // Send Account Name and Password to the Parent
        let childSubject = 'Child Account'
        let Childtemplate = await getFileContent(path.join('src', 'Static', 'ChildAccount.html'))
        Childtemplate = Childtemplate.replace('{{accname}}', accountName)
        Childtemplate = Childtemplate.replace('{{accpass}}', accountPassword)
        sendEmails(NewParent.email, childSubject, Childtemplate, (err, data) => {
            if (err) {
                console.error(err)
            } else {
                console.log(data, 'Send Email AuthController')
            }
        })

        const userResource = UserResource.UserAndOtp(NewParent, NewOtp)
        // Send Response
        return next(CustomSuccess.createSuccess(userResource, 'Successfull Sign Up', 201))
    } catch (error) {
        console.error(error)
        // next(CustomError.createError(error.message, 200));
    }
}

const Login = async (req, res, next) => {
    try {
        // Validate the request body
        const { error } = LoginValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        // const deviceAddress = req.connection.remoteAddress
        // console.log(deviceAddress, "deviceAddress");
        const { email } = req.body
        const RequestBody = req.body
        const isParent = await ParentsModel.findOne({ email: email })
        const isChild = await ChildModel.findOne({ email: email }).populate(['parent', 'grade'])
        if (!isParent && !isChild) {
            throw next(CustomError.createError('Invalid Email or Password', 200))
        }
        var UserDetail
        if (isParent) {
            UserDetail = await ParentLogin({ RequestBody, isParent }, res, next)
        }
        if (isChild) {
            UserDetail = await ChildLogin({ RequestBody, isChild }, res, next)
        }
        // Generate Token
        const token = generateToken(UserDetail)
        // Generate User Resource
        const userResource = UserResource.UserAndToken(UserDetail, token)
        // Send Response
        return next(CustomSuccess.createSuccess(userResource, 'Successfull Login', 200))
    } catch (error) {
        console.error(error)
        // next(CustomError.createError(error.message, 200));
    }
}

const ParentsProfile = async (req, res, next) => {
    try {
        const { error } = AfterSignupValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { id, fullName, address, city, state, childname, childgrade, childbirthdate } =
            req.body
        const profilePicture = req.file
        const isParent = await ParentsModel.findOne({ _id: id })
        if (!isParent) {
            return next(CustomError.createError('Parent not found', 404))
        }
        // const userImage = profilePicture.filename
        // const ImgUrl = `http://${req.headers.host}/uploads/${userImage}`
        const profilePictureS = profilePicture.path
        // Delete the old image if exist
        if (isParent.profilePicture) {
            const oldImage = isParent.profilePicture.split('/').pop()
            // console.log(oldImage, "oldImage");
            // Delete the old image
            fs.unlink(path.join('uploads', oldImage), (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
        // Update the Parent Profile
        const updateParent = await ParentsModel.findByIdAndUpdate(
            isParent._id,
            {
                fullName: fullName,
                address: address,
                city: city,
                state: state,
                profilePicture: profilePictureS,
            },
            { new: true },
        )
        // Update the Child Profile
        // Change Child Birthdate to Date
        const childBirthdate = new Date(childbirthdate)
        // Check if Grade Exist
        // console.log(childgrade, "isGrade");
        const isGrade = await GradeModel.findOne({ _id: childgrade })
        console.log(isGrade, 'isGrade')
        if (!isGrade) {
            return next(CustomError.createError('Grade not found', 404))
        }
        await ChildModel.findOneAndUpdate(
            { parent: isParent._id },
            {
                fullName: childname,
                grade: isGrade,
                birthdate: moment(childBirthdate).format('YYYY-MM-DD'),
            },
            { new: true },
        )
        // Generate User Resource
        const userResource = UserResource.User(updateParent)
        // Send Response
        return next(CustomSuccess.createSuccess(userResource, 'Successfull Profile Update', 200))
    } catch (error) {
        // next(CustomError.createError(error.message, 200));
    }
}

const ForgotPasswordOPT = async (req, res, next) => {
    try {
        // VAlidate the request body
        const { error } = ForgotPasswordValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { email } = req.body
        var UserDetail
        // Find the Parent With the Email or Phone Number
        const isParent = await ParentsModel.findOne({ $or: [{ email: email }, { phone: email }] })
        const isChild = await ChildModel.findOne({ email: email })
        if (!isParent && !isChild) {
            throw next(CustomError.createError('Invalid Email', 200))
        }
        // Generate 6 Digit OTP
        const OTP = Math.floor(100000 + Math.random() * 900000)

        if (isParent) {
            UserDetail = isParent
        }
        if (isChild) {
            // Get Parent Detail
            const ParentDetail = await ParentsModel.findOne({ _id: isChild.parent })
            UserDetail = ParentDetail
        }
        // Check if Parent/Child Already has OTP
        const isOtp = await ForgetPasswordModel.findOne({ user_id: UserDetail._id })
        var OPTs
        if (isOtp) {
            // Update the OTP with Model Name
            OPTs = await ForgetPasswordModel.findOneAndUpdate(
                { user_id: UserDetail._id },
                {
                    forgetOtp: OTP,
                    type: isParent ? 'parent' : 'child',
                },
                { new: true },
            )
        } else {
            // Create New OTP
            OPTs = await ForgetPasswordModel.create({
                user_id: UserDetail._id,
                forgetOtp: OTP,
                type: isParent ? 'parent' : 'child',
            })
        }
        // Send OTP to the Parent/Child
        let subject = 'OTP for Reset Password'
        let template = await getFileContent(path.join('src', 'Static', 'ForgetPassword.html'))
        template = template.replace('{{Opts}}', OPTs.forgetOtp)
        // template = template.replace("{{link}}", `https://${req.headers.host}/verfiy-email?token=${NewParent.token}`);
        sendEmails(UserDetail.email, subject, template, (err, data) => {
            if (err) {
                console.error(err)
            } else {
                console.log(data, 'Email AuthController')
            }
        })
        // Send Response
        return next(CustomSuccess.createSuccess(UserDetail, 'OTP sent successfully', 200))
    } catch (error) {
        // next(CustomError.createError(error.message, 200));
    }
}

const VerifyPasswordOtp = async (req, res, next) => {
    try {
        try {
            // VAlidate the request body
            const { error } = ResetPasswordOTPValidator.validate(req.body)
            if (error) {
                throw next(CustomError.createError(error.message, 200))
            }
            const { user_id, otp } = req.body
            // Check if the parent exist
            const isParentExist = await ParentsModel.findOne({ _id: user_id })
            const isChildExist = await ChildModel.findOne({ _id: user_id })
            if (!isParentExist && !isChildExist) {
                throw next(CustomError.createError('Invalid User', 200))
            }
            var UserDetail
            if (isParentExist) {
                UserDetail = isParentExist
            }
            if (isChildExist) {
                UserDetail = isChildExist
            }

            // Check if the OTP exist
            const isOtpExist = await ForgetPasswordModel.findOne({ user_id: UserDetail._id })
            if (!isOtpExist) {
                return next(CustomError.createError('OTP does not exist', 200))
            }
            // Check if the OTP is used
            if (isOtpExist.is_used) {
                return next(CustomError.createError('OTP already Used', 200))
            }
            // Check if the OTP is correct
            if (isOtpExist.forgetOtp !== otp) {
                return next(CustomError.createError('OTP is incorrect', 200))
            }
            // Update the OTP
            await ForgetPasswordModel.findByIdAndUpdate(isOtpExist._id, {
                forgetOtp: null,
                is_used: true,
                used_at: Date.now(),
            })
            // Login the Parent
            // Generate Token
            // const token = generateToken(UserDetail);
            // Generate User Resource
            const userResource = UserResource.User(UserDetail)
            // Send Response
            return next(CustomSuccess.createSuccess(userResource, 'OTP verified successfully', 200))
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        // next(CustomError.createError(error.message, 200));
    }
}

const ResetPassword = async (req, res, next) => {
    try {
        // VAlidate the request body
        const { error } = ResetPasswordValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { user_id, password, confirmPassword } = req.body
        // Check if the ForgetPassword OTP Used
        const CheckOtpUsed = await ForgetPasswordModel.findOne({ user_id: user_id, is_used: true })
        if (!CheckOtpUsed) {
            return next(CustomError.createError('OTP is not verified', 200))
        }

        // Match the Password
        if (password !== confirmPassword) {
            return next(CustomError.createError('Password do not match', 200))
        }
        var UserDetail
        // Check if the parent exist
        const isParentExist = await ParentsModel.findOne({ _id: user_id })
        const isChildExist = await ChildModel.findOne({ _id: user_id })
        if (!isParentExist && !isChildExist) {
            throw next(CustomError.createError('Invalid User', 200))
        }
        // Hash the Password
        const hashedPassword = hashPassword(password)
        if (isParentExist) {
            UserDetail = isParentExist
            await ParentsModel.findByIdAndUpdate(UserDetail._id, {
                password: hashedPassword,
            })
        }
        if (isChildExist) {
            UserDetail = isChildExist
            await ChildModel.findByIdAndUpdate(UserDetail._id, {
                password: hashedPassword,
            })
        }
        // Send Response
        return next(CustomSuccess.createSuccess(null, 'Password reset successfully', 200))
    } catch (error) {
        console.error(error)
        // next(CustomError.createError(error.message, 200));
    }
}

// Sub Functions for Login
const ParentLogin = async (req, res, next) => {
    try {
        const { RequestBody, isParent } = req
        // Match the password
        const isPasswordCorrect = comparePassword(RequestBody.password, isParent.password)
        if (!isPasswordCorrect) {
            return next(CustomError.createError('Invalid Password', 200))
        }
        // Check if the Parent has verified the OTP
        const isOtpVerified = await OtpModel.findOne({ parent_id: isParent._id, is_verified: true })
        if (!isOtpVerified) {
            const userOpt = UserResource.User(isParent)
            return res.status(200).json({
                status: 'error',
                message: 'Please verify your OTP',
                user: userOpt,
            })
        }
        return isParent
    } catch (error) {
        // next(CustomError.createError(error.message, 200));
    }
}
const ChildLogin = async (req, res, next) => {
    try {
        const { RequestBody, isChild } = req
        // Match the password
        const isPasswordCorrect = comparePassword(RequestBody.password, isChild.password)
        if (!isPasswordCorrect) {
            return next(CustomError.createError('Invalid Password', 200))
        }
        // Get the Parent Detail of the Child
        const isParent = await ParentsModel.findOne({ _id: isChild.parent }).populate(
            'subscription',
        )
        // Check if the Parent has verified the OTP
        const isOtpVerified = await OtpModel.findOne({ parent_id: isParent._id, is_verified: true })
        if (!isOtpVerified) {
            const userOpt = UserResource.User(isParent)
            return next(CustomSuccess.createSuccess(userOpt, 'Please verify your OTP', 200))
        }
        // console.log(isParent);
        // Check Subscription if null then return the parent
        if (!isParent.subscription) {
            return next(CustomError.createError('Please subscribe to the plan', 200))
        }
        // Get First Subscription From Parent Subscription Array
        const sub = isParent.subscription[0]
        // Chcek if the Subscription is expired
        const isSubscriptionExpired = await SubscriptionModel.findOne({ _id: sub, status: true })
        // Check Expired Date
        const CurrentDate = new Date()
        if (isSubscriptionExpired.expiryDate < CurrentDate) {
            return next(CustomError.createError('Your Subscription is expired', 200))
        }
        return isChild
    } catch (error) {
        console.error(error)
        // next(CustomError.createError(error.message, 200));
    }
}
// Sub Functions for Forgot Password

// Export the module es6
const AuthController = {
    registerParents,
    Login,
    ParentsProfile: [handleMultipartData.single('profilePicture'), ParentsProfile],
    ForgotPasswordOPT,
    VerifyPasswordOtp,
    ResetPassword,
}
export default AuthController
