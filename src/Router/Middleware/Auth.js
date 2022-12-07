import CustomError from '../../Utils/ResponseHandler/CustomError.js'
import jwt from 'jsonwebtoken'
import Parent from '../../DB/Models/ParentsModel.js'
import Child from '../../DB/Models/ChildModel.js'
export const AuthMiddleware = async (req, res, next) => {
    const AuthHeader =
        req.headers.authorization ||
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token']
    if (!AuthHeader) {
        return next(CustomError.unauthorized())
    }
    const parts = AuthHeader.split(' ')
    try {
        if (parts.length !== 2) {
            // console.log(parts);
            return next(CustomError.unauthorized())
        }

        const [scheme, token] = parts

        if (!/^Bearer$/i.test(scheme)) {
            return next(CustomError.unauthorized())
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return next(CustomError.createError('Token Expired', 401))
                } else {
                    return next(CustomError.createError('Inviald Token', 401))
                }
            }
            // // Find Parent
            const isParentExist = await Parent.findOne({ _id: decoded.payload._id })
            // Find Child
            const isChildExist = await Child.findOne({ _id: decoded.payload._id })
            if (!isParentExist && !isChildExist) {
                return next(CustomError.unauthorized())
            }
            if (isParentExist) {
                req.user = isParentExist
            }
            if (isChildExist) {
                req.user = isChildExist
            }
            req.token = token
            return next()
        })
    } catch (error) {
        return next(CustomError.unauthorized())
    }
}
