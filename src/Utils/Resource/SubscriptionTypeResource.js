import moment from 'moment'
// Create SubscriptionTypeResource class For Response
class SubscriptionTypeResource {
    constructor(Subscriptions) {
        this.Subscriptions = Subscriptions.map((subscription) => {
            return {
                id: subscription._id,
                name: subscription.name,
                description: subscription.description,
                price: subscription.price,
                duration: subscription.duration.map((duration) => {
                    return {
                        id: duration._id,
                        month: duration.month,
                    }
                }),
                createdAt: moment(subscription.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            }
        })
    }
    static SingleSubscription(subscription) {
        return {
            id: subscription._id,
            name: subscription.name,
            description: subscription.description,
            price: subscription.price,
            duration: subscription.duration.map((duration) => {
                return {
                    month: duration.month,
                }
            }),
            createdAt: moment(subscription.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        }
    }
}

export default SubscriptionTypeResource
