import mongoose from "mongoose";

// always use try and catch 
// async await 

export const connectDB = async () => {
    try {
        const connectionSchema = await mongoose.connect('mongodb://127.0.0.1:27017/restaurant');
        console.log('====================================');
        console.log(`DB Connected Successfully on Host ${connectionSchema.connection.host}`);
        console.log('====================================');
    } catch (error) {
        console.log(`DB Connection Error!! ${error}`);
    }
}