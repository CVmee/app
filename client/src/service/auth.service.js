import axios from 'axios'

export default class AuthService {
    constructor() {
        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    signup = ({ email, password }) => this.service.post('/signup', { email, password })
    login = ({ email, password }) => this.service.post('/login', { email, password })
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')
}