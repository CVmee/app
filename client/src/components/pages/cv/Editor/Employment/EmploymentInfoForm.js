import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'


class EmploymentInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoSaveInterval: undefined, // Unnecessary
            user: this.props.loggedInUser,
            cvID: this.props.match.params.id,
            cvInfo: this.props.employment, // Probably Unnecessary
            title: this.props.employment.title,
            employer: this.props.employment.employer,
            start: this.props.employment.start,
            end: this.props.employment.end,
            city: this.props.employment.city,
            description: this.props.employment.description,

            // userAction: 'edition'

        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.state[name] = value
        const { title, employer, start, end, city, description } = this.state
        this.props.updateEmploymentInfo(this.props.index, { title, employer, start, end, city, description })
    }

    render() {
        return (
            <Form>
                <Row>
                    <h3 className="job-title">{this.state.title} at {this.state.employer}</h3>
                </Row>
                <Row>
                    <Col lg="6">
                        <Form.Group controlId="title">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg="6">
                        <Form.Group controlId="employer">
                            <Form.Label>Employer</Form.Label>
                            <Form.Control name="employer" type="text" value={this.state.employer} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg="6">
                        <Form.Label>Start & End Date</Form.Label>
                        <Row>
                            <Col lg="6">
                                <Form.Group controlId="start">
                                    <Form.Control name="start" type="text" value={this.state.start} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group controlId="end">
                                    <Form.Control name="end" type="text" value={this.state.end} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg="6">
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control name="city" type="text" value={this.state.city} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col >
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" type="text" value={this.state.description} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                    {/* <Col lg="6">
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="firstName" type="text" value={this.state.firstName} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="title">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="title" type="text" value={this.state.employment.title} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                    <Col lg="6">
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col> */}

                    {/* <Button variant="dark" onClick={() => this.props.closeModal()} style={{ marginRight: '10px' }}>Cerrar</Button>
                    <Button variant="dark" type="submit">Crear montaña rusa</Button> */}
                </Row>
            </Form>
        )
    }
}

export default EmploymentInfoForm