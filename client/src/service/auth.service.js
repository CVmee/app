import axios from 'axios'

console.log(axios.defaults.baseURL)
console.log(axios.defaults.baseURL)

const joder = process.env.REACT_APP_URL
console.log('JODER', joder)
console.log('hola_')
export default class AuthService {
    constructor() {
        this.service = axios.create({
            baseURL: '/juju',
            withCredentials: true
        })
    }

    signup = ({ email, password }) => this.service.post('/signup', { email, password })
    login = ({ email, password }) => this.service.post('/login', { email, password })
    logout = () => this.service.post('/logout')
    isLoggedIn = () => this.service.get('/loggedin')
}