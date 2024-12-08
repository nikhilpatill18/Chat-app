import mongoose from 'mongoose';
const db = "chatapp"

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${db}`)
        console.log("mongo db conn nection sucessfully", conn.connection.host)

    }
    catch (err) {
        console.log('mongodb connection error', err)
    }
}