import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    // Use existing connection
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      // options here if needed
      // e.g. useNewUrlParser: true, useUnifiedTopology: true
    }).then(mongoose => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    console.error(`Error in db connection: ${error.message}`);
    // Do NOT exit process in serverless env
    throw error; // Throw error so function fails gracefully
  }
};

export default connectDB;
