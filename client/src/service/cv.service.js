import axios from 'axios'

export default class CVService {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getCVInfo = (cvID) => this.service.get(`/cvs/info/${cvID}`)
    updateCVInfo = (cvID, cvInfo) => this.service.post(`/cvs/update/${cvID}`, cvInfo)
    updateProfilePicture = (cvID, picture) => this.service.post(`/cvs/uploadProfilePic/${cvID}`, picture)

    // createEducation = (cvInfo) => this.service.post(`/cvs/createEducation/${cvInfo._id}`, cvInfo)
    // deleteEducation = (cvID, itemID) => this.service.post(`/cvs/deleteEducation/${cvID}`, itemID)

    // createEmployment = (cvInfo) => {this.service.post(`/cvs/createEmployment/${cvInfo._id}`)}
    // deleteEmployment = (cvID, itemID) => this.service.post(`/cvs/deleteEmployment/${cvID}`, itemID)
    // createLinks = (cvID) => this.service.post(`/cvs/createLinks/${cvID}`)
    // deleteLinks = (cvID, itemID) => this.service.post(`/cvs/deleteLinks/${cvID}`, itemID)
    // createSkills = (cvID) => this.service.post(`/cvs/createSkills/${cvID}`)
    // deleteSkills = (cvID, itemID) => this.service.post(`/cvs/deleteSkills/${cvID}`, itemID)
    

    // getCVs = (userID) => this.service.get(`/cvs/user/${userID}`)
    // getTemplates = () => this.service.get('/cvs/templates')
    // createCV = (templateName, userID) => this.service.post('/cvs/newcv', {name: templateName, user: userID}) 
    // getCoaster = coasterId => this.service.get(`/getOneCoaster/${coasterId}`)
    // saveCoaster = theCoaster => this.service.post(`/postCoaster`, theCoaster)
}