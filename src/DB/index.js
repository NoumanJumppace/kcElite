import { connect } from 'mongoose'
import dbConfig from '../Config/dbConfig.js'
import { GradeSeeder } from './Seeder/GradeSeeder.js'
import { SubscriptionTypeSeeder } from './Seeder/SubscriptionTypeSeeder.js'
export const connectDB = () => {
    try {
        connect(dbConfig.db, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('MongoDB Connected...')
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export const RunSeeder = async () => {
    try {
        // Run Subscription Type Seeder
        await SubscriptionTypeSeeder()
        await GradeSeeder()
        console.log('Seeder Run Successfully')
    } catch (error) {
        console.error(error)
    }
}
