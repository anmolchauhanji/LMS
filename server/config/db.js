import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();
const connectdb =async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI)
       console.log(process.env.MONGO_URI);
        console.log("db conected");
        
    } catch (error) {

        console.log("error hau ",error);
        
    }
}
  export default connectdb