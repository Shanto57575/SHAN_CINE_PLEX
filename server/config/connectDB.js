import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionToDB = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfully connected To Mongodb! ✅ Host ::: ${connectionToDB.connection.host}`)
    } catch (error) {
        console.error(`❌ Mongodb connection Failed! ❌ `, error.message)
        process.exit(1)
    }
}

export default connectDB