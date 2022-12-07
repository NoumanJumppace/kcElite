import moment from 'moment'
// Create SubscriptionTypeResource class For Response
class SubscriptionResource {
    constructor(Subscriptions) {
        this.id = Subscriptions._id
    }
    static SingleSubscription(subscription) {
        return {
            id: subscription._id,
            subscriptionType: {
                id: subscription.subscriptionType._id,
                name: subscription.subscriptionType.name,
                description: subscription.subscriptionType.description,
                price: subscription.subscriptionType.price,
                duration: subscription.subscriptionType.duration,
                createdAt: moment(subscription.subscriptionType.createdAt).format(
                    'YYYY-MM-DD HH:mm:ss',
                ),
            },
            child: subscription.child.map((child) => {
                return {
                    id: child._id,
                    fullName: child.fullName,
                    profilePicture: child.profilePicture,
                    phone: child.phone,
                    email: child.email,
                    address: child.address,
                    city: child.city,
                    state: child.state,
                    grade: child.grade,
                    birthdate: child.birthdate,
                    tier: child.tier,
                    parent_id: child.parent,
                    subscription: child.subscription,
                    createdAt: moment(child.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                }
            }),
            duration: subscription.duration,
            totalAmount: subscription.totalAmount,
            status: subscription.status,
            expiryDate: moment(subscription.expiryDate).format('YYYY-MM-DD HH:mm:ss'),
            purchaseDate: moment(subscription.purchaseDate).format('YYYY-MM-DD HH:mm:ss'),
            createdAt: moment(subscription.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
    }
}

export default SubscriptionResource
