const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    profilePicture: String,
    profileDescription: String,
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User