const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")

const JWT_SECRET = process.env.JWT_SECRET || "SKSKHJHJDFGHUFIDBUDDNIFDMFDOPMOUIODHJDKHJDKHDKFH";
const EXPIRE = process.env.EXPIRE || "5d";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name:"],
        maxlength: [30, "Name can not axceed 30 characters"],
        minlength: [4, "Name should have more than 4 characters "]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email "],
        unique: true,
       
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password Should Have 8 Character"],
        select: false
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//jwt Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: EXPIRE,
    })
}


// compare password 

userSchema.methods.comparePassword = async function(enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password)
}

module.exports = mongoose.model("User", userSchema);