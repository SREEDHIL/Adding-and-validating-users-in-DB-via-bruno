const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        min:8,
        max:16,
        required:true
    }
});

const User = mongoose.model("signup",SignupSchema);
module.exports = {User}