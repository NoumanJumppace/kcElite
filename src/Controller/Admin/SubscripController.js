// DB / Models
import SubscriptionTypesModel from '../../DB/Models/SubscriptionTypesModel.js'
// Utils (Response, Error, Logger)
import SubscriptionTypeResource from '../../Utils/Resource/SubscriptionTypeResource.js'
import CustomError from '../../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../../Utils/ResponseHandler/CustomSuccess.js'
import { addSubscriptionValidator } from '../../Utils/Validator/SubscriptionValidator.js'

const getSubscriptions = async (req, res, next) => {
    try {
        // Descending Order by Name
        const subscriptions = await SubscriptionTypesModel.find().sort({ name: 1 })
        // Create Subscription Type Resource
        const newSubscriptionsResource = subscriptions.map((subscription) => {
            return SubscriptionTypeResource.SingleSubscription(subscription)
        })
        return next(CustomSuccess.createSuccess(newSubscriptionsResource, 'All Subscriptions', 200))
    } catch (error) {
        console.error(error)
    }
}

const addSubscription = async (req, res, next) => {
    try {
        const { error } = addSubscriptionValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { name, description, price, duration } = req.body
        await SubscriptionTypesModel.create({ name, description, price, duration })
        return next(CustomSuccess.createSuccess({}, 'Subscription Added Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const updateSubscription = async (req, res, next) => {
    try {
        const { error } = addSubscriptionValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { name, description, price, duration } = req.body
        const { id } = req.params
        await SubscriptionTypesModel.findByIdAndUpdate(id, { name, description, price, duration })
        return next(CustomSuccess.createSuccess({}, 'Subscription Updated Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const DeleteSubscription = async (req, res, next) => {
    try {
        const { id } = req.params
        await SubscriptionTypesModel.findByIdAndDelete(id)
        return next(CustomSuccess.createSuccess({}, 'Subscription Deleted Successfully', 200))
    } catch (error) {
        console.error(error)
    }
}

const SubscripController = {
    getSubscriptions,
    addSubscription,
    updateSubscription,
    DeleteSubscription,
}

export default SubscripController
