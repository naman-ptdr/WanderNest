import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};



// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
//     } catch (error) {
//         console.log(error);
//         process.exit(1)
//     }
// }

// export default connectDB