import mongoose ,{ Schema,Types,model} from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
},
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor","student"],
        
    },
    enrolled:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",

    }
],
    photoUrl:{
        type:String,
        default:"",

    },
    
    

},{timestamps:true}) 

export const User =  model("User",UserSchema)