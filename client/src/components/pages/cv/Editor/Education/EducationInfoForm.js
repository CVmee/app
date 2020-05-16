import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'


class EducationInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoSaveInterval: undefined, // Unnecessary
            user: this.props.loggedInUser,
            cvID: this.props.match.params.id,
            cvInfo: this.props.cvInfo, 
            _id: this.props.education._id,
            degree: this.props.education.degree,
            school: this.props.education.school,
            start: this.props.education.start,
            end: this.props.education.end,
            city: this.props.education.city,
            description: this.props.education.description,

            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.state[name] = value
        const { _id, degree, school, start, end, city, description } = this.state
        this.props.updateEducationInfo(this.props.index, { _id, degree, school, start, end, city, description })
    }



    render() {
        
        return (
            <>

                <Form>
                    <Row>
                        <h3 className="degree-title">{this.state.degree} at {this.state.school}</h3>
                    </Row>
                    <Row>
                        <Col lg="6">
                            <Form.Group controlId="degree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control name="degree" type="text" value={this.state.degree} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col lg="6">
                            <Form.Group controlId="school">
                                <Form.Label>School</Form.Label>
                                <Form.Control name="school" type="text" value={this.state.school} onChange={this.handleInputChange} />
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
                    </Row>
                </Form>
                <Button variant="danger" onClick={() => this.props.deleteEducationItem(this.state._id)}>Delete Education</Button>
            </>
        )
    }
}

export default EducationInfoForm