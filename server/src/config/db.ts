import mongoose, { mongo } from "mongoose";

async function connectDB(db_url: string): Promise<void> {
    try {
        await mongoose.connect(db_url)
    } catch (err) {
        if (err instanceof Error) console.log(err.message)
        process.exit(1)
    }
}
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB")
})

export default connectDB