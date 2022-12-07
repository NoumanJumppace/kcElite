// Add Subscription Type by Default

import SubscriptionTypesModel from '../Models/SubscriptionTypesModel.js'

// Create Subscription Type Seeder
export const SubscriptionTypeSeeder = async () => {
    try {
        const subscriptionTypes = await SubscriptionTypesModel.find()
        // Create Subscription Type Array
        const subscriptionTypeArray = [
            {
                name: 'Basic',
                description: 'Basic Subscription',
                price: 10,
                duration: [
                    {
                        month: '1',
                    },
                    {
                        month: '6',
                    },
                    {
                        month: '12',
                    },
                ],
            },
        ]
        // Create Subscription Type
        if (subscriptionTypes.length === 0) {
            await SubscriptionTypesModel.insertMany(subscriptionTypeArray)
        }
    } catch (error) {
        console.error(error)
    }
}
