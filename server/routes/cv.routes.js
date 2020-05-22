const express = require("express")
const router = express.Router()
const passport = require("passport")
const multer = require('multer')
const uploader = require('../configs/cloudinary.config')


const User = require('../models/user.model')
const CV = require('../models/cv.model')
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
    const { firstName, lastName, title, email, phone, profilePicture } = req.user
    const userInfo = { firstName, lastName, title, email, phone, profilePicture, profileDescription: [{ "type": "paragraph", "children": [{ "text": "" }] }] }
    const color = '#000000'
    CV.create({ name, color, user, employment, education, links, userInfo })
        .then(createdCV => res.json(createdCV))
        .catch(error => res.json(error))
})

router.post('/cvs/update/:id', (req, res, next) => {
    CV.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/uploadProfilePic/:id', uploader.single('profilePicture'), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'))
        return
    }
    console.log('CREATED FILE', req.file)
    return res.json(req.file.secure_url)
})

// CV Items Routes

router.post('/cvs/createEducation/:id', (req, res, next) => {
    const newEducation = { degree: 'New Education', school: 'School', start: '', end: '', city: '', description: [{ "type": "paragraph", "children": [{ "text": "" }] }] }
    CV.findByIdAndUpdate(req.params.id, { $push: { education: newEducation } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/createEmployment/:id', (req, res, next) => {
    const newEmployment = { title: 'New Employment', employer: 'Company', start: '', end: '', city: '', description: [{ "type": "paragraph", "children": [{ "text": "" }] }] }
    CV.findByIdAndUpdate(req.params.id, { $push: { employment: newEmployment } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/createSkill/:id', (req, res, next) => {
    const newSkill = { skill: 'New Skill', level: '' }
    CV.findByIdAndUpdate(req.params.id, { $push: { skills: newSkill } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/createLink/:id', (req, res, next) => {
    const newLink = { label: 'New Link', link: '' }
    CV.findByIdAndUpdate(req.params.id, { $push: { links: newLink } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/deleteEducation/:id', (req, res, next) => {
    CV.findByIdAndUpdate(req.params.id, { $pull: { education: { _id: req.body.id } } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/deleteEmployment/:id', (req, res, next) => {
    CV.findByIdAndUpdate(req.params.id, { $pull: { employment: { _id: req.body.id } } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/deleteLink/:id', (req, res, next) => {
    CV.findByIdAndUpdate(req.params.id, { $pull: { links: { _id: req.body.id } } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/deleteSkill/:id', (req, res, next) => {
    CV.findByIdAndUpdate(req.params.id, { $pull: { skills: { _id: req.body.id } } }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => next(error))
})

router.post('/cvs/changeTemplate/:id', (req, res, next) => {
    CV.findByIdAndUpdate(req.params.id, { name: `${req.body.name}` }, { new: true })
        .then(updatedCV => res.json(updatedCV))
        .catch(error => res.json(error))
})


module.exports = router


