import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'


class ProfileDescriptionForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoSaveInterval: undefined, // Unnecessary
            user: this.props.loggedInUser,
            cvID: this.props.match.params.id,
            cvInfo: this.props.cvInfo, // Probably Unnecessary,
            // firstName: this.props.cvInfo.userInfo.firstName,
            // lastName: this.props.cvInfo.userInfo.lastName,
            // title: this.props.cvInfo.userInfo.title,
            // email: this.props.cvInfo.userInfo.email,
            // phone: this.props.cvInfo.userInfo.phone,
            // profilePicture: this.props.cvInfo.userInfo.profilePicture,
            // profileDescription: this.props.cvInfo.userInfo.profileDescription, // Probably Unnecessary

            // userAction: 'edition'

        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.state.cvInfo.userInfo[name] = value
        // const {firstName, lastName, title, email,phone, profilePicture, profileDescription} = this.state
        // this.props.updateCVInfo({ firstName, lastName, title, email, phone, profilePicture, profileDescription})
        this.props.updateCVInfo(this.state.cvInfo)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="profileDescription">
                            <Form.Label>Describe yourself in 3 sentences</Form.Label>
                            <Form.Control name="profileDescription" type="text" value={this.state.cvInfo.userInfo.profileDescription} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                </Row>
            </Form>
        )
    }
}

export default ProfileDescriptionForm