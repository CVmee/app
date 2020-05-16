import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


import UserService from '../../../../../service/user.service'
import CVService from '../../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import Apollo from '../../Models/Apollo/Apollo'

class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo,
        }
        this.userService = new UserService()
        this.cvService = new CVService()
    }

    render() {
        switch (this.state.cvInfo.name) {
            case 'Apollo':
                return <Apollo cvInfo={this.state.cvInfo} />
            default:
                return <></>
        }
    }
}

export default Visualizer