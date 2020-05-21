const express = require("express")
const router = express.Router()
const passport = require("passport")
const multer = require('multer')
const uploader = require('../configs/cloudinary.config')

const User = require('../models/user.model')



// User Routes

router.post('/user/updateInfo/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedUser => res.json(updatedUser))
        .catch(error => next(error))
})

router.post('/user/uploadProfilePic/:id', uploader.single('profilePicture'), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'))
        return
    }
    return res.json(req.file.secure_url)
})


module.exports = router


