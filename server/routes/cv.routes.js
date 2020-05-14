const express = require("express")
const router = express.Router()
const passport = require("passport")


const User = require('../models/user.model')
const CV = require('../models/cv.model')
const Employment = require('../models/employment.model')
const Education = require('../models/education.model')
const Link = require('../models/link.model')
const Template = require('../models/template.model')



router.get('/cvs/templates', (req, res, next) => {

    Template.find()
        .then(allTemplates => res.json(allTemplates))
        .catch(error => res.json(error))
})

router.get('/cvs/user/:id', (req, res, next) => {
    // let cvs, employment, education, links // This will be used later on for CV previews

    CV.find({ user: req.params.id })
        .then(allCVs => res.json(allCVs))
        .catch(error => res.json(error))
})

router.get('/cvs/info/:id', (req, res, next) => {
    CV.findById(req.params.id)
        .then(foundCV => res.json(foundCV))
        .catch(error => res.json(error))
})

router.post('/cvs/newcv', (req, res, next) => {

    const { name, user } = req.body
    let employment, education, links = []
    const { firstName, lastName, title, email, phone, profilePicture, profileDescription } = req.user
    const userInfo = { firstName, lastName, title, email, phone, profilePicture, profileDescription }

    CV.create({ name, user, employment, education, links, userInfo })
        .then(createdCV => res.json(createdCV))
        .catch(error => res.json(error))
})

router.post('/cvs/update/:id', (req, res, next) => {
    console.log('ESTO ES LO QUE EL SERVER RECIBE')
    console.log(req.body);
    CV.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})



module.exports = router