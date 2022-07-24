const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({

    id:{
        type:Number
    },
    firstName:{
        type:String,
        default:""
    },
    lastName:{
        type:String,
        default:""
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    dateOfBirth: {
        type:Date,
        default:""
    },
    mobile: {
        type:Number,
        default:0
    },
    status: {
        type:Boolean,
        default: true
    },
    password: {
        type:String
    },
    accountType: {
        type:String,
        default:"student"
    }
})

const users = mongoose.model("User", UserSchema);

module.exports = users;