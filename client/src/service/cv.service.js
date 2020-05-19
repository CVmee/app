import axios from 'axios'

export default class CVService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    // Pure CV Service
    getCVInfo = (cvID) => this.service.get(`/cvs/info/${cvID}`)
    updateCVInfo = (cvID, cvInfo) => this.service.post(`/cvs/update/${cvID}`, cvInfo)
    updateProfilePicture = (cvID, picture) => this.service.post(`/cvs/uploadProfilePic/${cvID}`, picture)

    //Items Service
    createEducation = (cvID) => this.service.post(`/cvs/createEducation/${cvID}`)
    deleteEducation = (cvID, itemID) => this.service.post(`/cvs/deleteEducation/${cvID}`, { id: itemID })
    createEmployment = (cvID) => this.service.post(`/cvs/createEmployment/${cvID}`)
    deleteEmployment = (cvID, itemID) => this.service.post(`/cvs/deleteEmployment/${cvID}`, { id: itemID })
    createSkill = (cvID) => this.service.post(`/cvs/createSkill/${cvID}`)
    deleteSkill = (cvID, itemID) => this.service.post(`/cvs/deleteSkill/${cvID}`, { id: itemID })
    createLink = (cvID) => this.service.post(`/cvs/createLink/${cvID}`)
    deleteLink = (cvID, itemID) => this.service.post(`/cvs/deleteLink/${cvID}`, { id: itemID })

    
    // Template Service
    changeTemplate = (cvID, name) => this.service.post(`/cvs/changeTemplate/${cvID}`, {name})

    // getCVs = (userID) => this.service.get(`/cvs/user/${userID}`)
    // getTemplates = () => this.service.get('/cvs/templates')
    // createCV = (templateName, userID) => this.service.post('/cvs/newcv', {name: templateName, user: userID}) 
}