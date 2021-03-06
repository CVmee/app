import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import UserInfoForm from './UserInfoForm'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class UserDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo, 
            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }
    render() {
        return (
            <Container>               
                {/* <h1 id="editor-user-title">{this.state.cvInfo.title}, {this.state.cvInfo.firstName} {this.state.cvInfo.lastName}</h1>            */}
                <h2 className="editor-section-title">Personal Details</h2>
                <UserInfoForm {...this.props} {...this.state.cvInfo} updateCVInfo={this.props.updateCVInfo}/>                
            </Container>
        )
    }
}

export default UserDetails