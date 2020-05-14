const mongoose = require("mongoose")
const Schema = mongoose.Schema

const cvSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userInfo: {
        firstName: String,
        lastName: String,
        title: String,
        email: String,
        password: String,
        phone: String,
        profilePicture: String,
        profileDescription: String,
    },
    employment: [{
        title: String,
        employer: String,
        start: String,
        end: String,
        city: String,
        description: String,
    }],
    education: [{
        degree: String,
        school: String,
        start: String,
        end: String,
        city: String,
        description: String,
    }],
    links: [{
        label: String,
        link: String,
    }]
}, {
    timestamps: true
})

const CV = mongoose.model("CV", cvSchema)

module.exports = CV