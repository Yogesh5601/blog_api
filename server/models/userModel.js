import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type:String,
    min:6,
  }
},
{timestamps:true}
);

const User = new mongoose.model("User", userSchema)
export default User;