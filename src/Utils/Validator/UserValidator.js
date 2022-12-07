import joi from 'joi'

export const LoginValidator = joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required(),
})

export const RegisterValidator = joi.object({
    phone: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
    // deviceToken: joi.string().required(),
})

export const AfterSignupValidator = joi.object({
    id: joi.string().required(),
    fullName: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    childname: joi.string().required(),
    childgrade: joi.string().required(),
    childbirthdate: joi.string().required(),
    // profilePicture: joi.required(),
})

export const ForgotPasswordValidator = joi.object({
    email: joi.string().required(),
})

export const ResetPasswordOTPValidator = joi.object({
    user_id: joi.string().required(),
    otp: joi.string().required(),
})

export const ResetPasswordValidator = joi.object({
    user_id: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required(),
})
