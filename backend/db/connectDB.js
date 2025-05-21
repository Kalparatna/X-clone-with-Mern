import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(`Error in db connection: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;