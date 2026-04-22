import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name :{ type :String, default:""},
    email :{ type :String, default:""},
    password :{ type :String, default:""},
    phone :{ type :Number, default:0},


      // --- forgot password fields ---
  resetPasswordToken:   { type: String },
  resetPasswordExpires: { type: Date },




})

const userDataSchema = mongoose.model("user",userschema)

export default userDataSchema