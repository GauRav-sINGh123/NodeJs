import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

mongoose.set('strictQuery', false);

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
        console.log(`\n MongoDB Connected || DB Host: ${connectionInstance.connection.host}`);
       
    } catch (error) {
        console.error("MonogDB Connection Failed",error.message);
        process.exit(1);
    }
};

 