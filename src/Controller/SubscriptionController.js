import Parent from '../DB/Models/ParentsModel.js'
import Subscription from '../DB/Models/SubscriptionModel.js'
import SubscriptionTypesModel from '../DB/Models/SubscriptionTypesModel.js'
import SubscriptionResource from '../Utils/Resource/SubscriptionResource.js'
import SubscriptionTypeResource from '../Utils/Resource/SubscriptionTypeResource.js'
import CustomError from '../Utils/ResponseHandler/CustomError.js'
import CustomSuccess from '../Utils/ResponseHandler/CustomSuccess.js'
import { SubscriptionPurchaseValidator } from '../Utils/Validator/SubscriptionValidator.js'

// Get All Subscriptions
const getAllSubscriptionsType = async (req, res, next) => {
    try {
        const subscriptions = await SubscriptionTypesModel.find()
        // Create SubscriptionResource
        const SubResource = new SubscriptionTypeResource(subscriptions)

        return next(CustomSuccess.createSuccess(SubResource, 'All Subscriptions', 201))
    } catch (error) {
        console.error(error)
    }
}
// Buy Subscription
const buySubscription = async (req, res, next) => {
    try {
        // Validate Request
        const { error } = SubscriptionPurchaseValidator.validate(req.body)
        if (error) {
            throw next(CustomError.createError(error.message, 200))
        }
        const { subscriptionId, duration_id } = req.body
        // Find Subscription By Id
        const Subscrip = await SubscriptionTypesModel.findById(subscriptionId)
        // console.log(subscription); // Check if Subscription Exist
        if (!Subscrip) {
            return next(CustomError.createError('Subscription Not Found', 404))
        }
        // Find Duration By ID
        const durationExist = Subscrip.duration.find((dur) => dur._id.toString() === duration_id)
        if (!durationExist) {
            return next(CustomError.createError('Duration Not Found', 404))
        }

        // Find Child
        const ChildAccount = await Parent.findById(req.user._id).populate('child')
        // Check If Parent Has Old Subscription
        const OldSubscription = await Subscription.updateMany(
            { parent: req.user._id },
            { status: false },
        )
        console.log(OldSubscription)
        // if (OldSubscription) {
        // Set Status To False
        // OldSubscription.status = false;
        // await OldSubscription.save();
        // }
        // Set Expiry Date
        const expiryDate = new Date()
        expiryDate.setMonth(expiryDate.getMonth() + durationExist.month)
        // Price of Subscription multiplied by Duration
        const totalAmounts = Subscrip.price * durationExist.month
        // Create Subscription
        const newSubscription = new Subscription({
            parent: ChildAccount._id,
            subscriptionType: subscriptionId,
            child: ChildAccount.child,
            totalAmount: totalAmounts,
            duration: durationExist.month,
            expiryDate: expiryDate,
            purchaseDate: new Date(),
            status: true,
        })
        // Save Subscription
        await newSubscription.save()
        // Add  Subscription To Parent
        ChildAccount.subscription = newSubscription._id
        // Save Parent
        await ChildAccount.save()

        // get SubscriptionType from Subscription
        const SubscriptionDet = await newSubscription.populate('subscriptionType')
        // Create SubscriptionResource
        console.log(SubscriptionDet)
        const SubResource = SubscriptionResource.SingleSubscription(SubscriptionDet)
        // Return Response
        return next(CustomSuccess.createSuccess(SubResource, 'Subscription Created', 201))
    } catch (error) {
        console.error(error)
    }
}
// Get Current User Subscription
const getCurrentUserSubscription = async (req, res, next) => {
    try {
        // Find Parent
        const ParentAccount = await Parent.findById(req.user._id).populate(['subscription'])
        // Check If Parent Has Subscription
        if (!ParentAccount.subscription) {
            return next(CustomError.createError('No Subscription Found', 404))
        }
        // First Subscription
        const SubscriptionDet = await ParentAccount.subscription[0].populate('subscriptionType')
        console.log(SubscriptionDet)
        // Create SubscriptionResource
        const SubResource = SubscriptionResource.SingleSubscription(SubscriptionDet)
        // Return Response
        return next(CustomSuccess.createSuccess(SubResource, 'Subscription Found', 201))
    } catch (error) {
        console.error(error)
    }
}

const SubscriptionController = {
    getAllSubscriptionsType,
    buySubscription,
    getCurrentUserSubscription,
}

export default SubscriptionController
