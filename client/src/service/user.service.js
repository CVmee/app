import axios from 'axios'

export default class UserService {
    constructor() {
        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`,
            withCredentials: true
        })
    }

    getCVs = (userID) => this.service.get(`/cvs/user/${userID}`)
    getTemplates = () => this.service.get('/cvs/templates')
    createCV = (templateName, userID) => this.service.post('/cvs/newcv', {name: templateName, user: userID}) 
    // getCoaster = coasterId => this.service.get(`/getOneCoaster/${coasterId}`)
    // saveCoaster = theCoaster => this.service.post(`/postCoaster`, theCoaster)
}