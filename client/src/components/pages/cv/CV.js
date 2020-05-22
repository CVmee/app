import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Editor from '../cv/Editor/Editor'
import Template from '../cv/Template/Template'

import UserService from '../../../service/user.service'
import CVService from '../../../service/cv.service'

import { Switch, Route, Link, Redirect } from 'react-router-dom'

class CV extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            userAction: 'edition', // Esto se puede hacer también con un botón que tire de redirect
            cvID: this.props.match.params.id,
        }
        this.userService = new UserService()
    }


    render() {
        return <Editor {...this.props} cvID={this.state.cvID} cvInfo={this.state.cvInfo} />
    }
}

export default CV