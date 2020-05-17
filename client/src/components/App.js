import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Navigation from './ui/navbar/Navbar'
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import CV from './pages/cv/CV'

import Gallery from './pages/gallery/Gallery'

import AuthService from './../service/auth.service'

class App extends Component {

    constructor() {
        super()
        this.state = {
            loggedInUser: null,
            // createdCV: null,
        }
        this.authService = new AuthService()
    }

    setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => console.log('El estado de App ha cambiado:', this.state))

    fetchUser = () => {
        if (this.state.loggedInUser === null) {
            this.authService.isLoggedIn()
                .then(response => this.setTheUser(response.data))
                .catch(() => this.setTheUser(false))
        }
    }

    render() {

        this.fetchUser()

        return (
            <main>

                <Switch>
                    <Route path="/" exact render={props => <Home {...props} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />} />
                    <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} />} />
                    <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} />} />
                    <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
                    <Route path="/cv/:id/edit" exact render={(props) => this.state.loggedInUser ? <CV {...props} loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
                    <Route path="/gallery" render={props => <Gallery {...props} setTheUser={this.setTheUser} />} />

                </Switch>

            </main>
        )
    }
}

export default App
