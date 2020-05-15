import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import UserService from '../../../../../service/user.service'
import CVService from '../../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import './UserInfoForm.css'

class UserInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoSaveInterval: undefined, // Unnecessary
            user: this.props.loggedInUser,
            cvID: this.props.match.params.id,
            cvInfo: this.props.cvInfo, // Probably Unnecessary
            // firstName: this.props.cvInfo.userInfo.firstName,
            // lastName: this.props.cvInfo.userInfo.lastName,
            // title: this.props.cvInfo.userInfo.title,
            // email: this.props.cvInfo.userInfo.email,
            // phone: this.props.cvInfo.userInfo.phone,
            // profilePicture: this.props.cvInfo.userInfo.profilePicture,
            //profileDescription: this.props.cvInfo.userInfo.profileDescription, // Probably Unnecessary

            // userAction: 'edition'

        }
        this.userService = new UserService() // Probably Unnecessary
        this.cvService = new CVService()
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.state.cvInfo.userInfo[name] = value
        // const {firstName, lastName, title, email,phone, profilePicture, profileDescription} = this.state
        // this.props.updateCVInfo({ firstName, lastName, title, email, phone, profilePicture, profileDescription})
        this.props.updateCVInfo(this.state.cvInfo)
    }

    handleFileUpload = event => {
        const uploadData = new FormData()
        uploadData.append('profilePicture', event.target.files[0])
        this.cvService.updateProfilePicture(this.props.match.params.id, uploadData)
            .then(response => {
                this.state.cvInfo.userInfo.profilePicture = response.data
                this.props.updateCVInfo(this.state.cvInfo)
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col lg="6">
                        <Form.Group controlId="title">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control name="title" type="text" value={this.state.cvInfo.userInfo.title} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg="6">
                        <Row>
                            <Col lg="5">
                                <figure id="profile-picture-img">
                                    <img src={this.state.cvInfo.userInfo.profilePicture} alt="profile" />
                                </figure>
                            </Col>
                            <Col lg="6">
                                <Form.Group controlId="profilePicture">
                                    <Form.Control name="profilePicture" type="file" onChange={this.handleFileUpload} />
                                </Form.Group>
                                <Form.Group controlId="profilePictureDelete">
                                    <Form.Label>Delete</Form.Label>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="firstName" type="text" value={this.state.cvInfo.userInfo.firstName} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" value={this.state.cvInfo.userInfo.lastName} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" value={this.state.cvInfo.userInfo.email} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name="phone" type="text" value={this.state.cvInfo.userInfo.phone} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    {/* <Button variant="dark" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }}>Cerrar</Button>
                    <Button variant="dark" type="submit">Crear montaña rusa</Button> */}
                </Row>
            </Form>
        )
    }
}

export default UserInfoForm