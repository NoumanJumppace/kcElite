import { config } from 'dotenv'
config()

const dbConfig = {
    // MongoDB connection string
    db: process.env.MONGO_URI,
}

export default dbConfig
