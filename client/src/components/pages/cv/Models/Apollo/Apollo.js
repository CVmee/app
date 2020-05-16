import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import UserService from '../../../../../service/user.service'
import CVService from '../../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import '../CV.css'
import './Apollo.css'

import PersonIcon from '@material-ui/icons/Person'
import SchoolIcon from '@material-ui/icons/School'
import WorkIcon from '@material-ui/icons/Work'


class Apollo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cvInfo: this.props.cvInfo,
        }
        this.userService = new UserService()
        this.cvService = new CVService()
    }

    render() {
        console.log(this.state)
        return (
            <Container id='apollo-cv-container' className='cv-container'>

                <Row id='title-row'>
                    <Col lg="2">
                        <figure>
                            <img src={this.state.cvInfo.userInfo.profilePicture} alt="profile" />
                        </figure>
                    </Col>
                    <Col lg="10">
                        <h3>{this.state.cvInfo.userInfo.firstName} {this.state.cvInfo.userInfo.lastName}</h3>
                        <p>{this.state.cvInfo.userInfo.title}</p>
                    </Col>
                </Row>

                <Row>

                    <Col lg="9">

                        <Row id='profile-row'>
                            <PersonIcon /> <h3>Profile</h3>
                            {this.state.cvInfo.userInfo.profileDescription}
                        </Row>


                        <Row id='education-row'>
                            {this.state.cvInfo.education.length > 0 && <><SchoolIcon /> <h3>Education</h3></>}
                            {this.state.cvInfo.education.map(education => {
                                return (
                                    <>
                                        <h4>{education.degree}, {education.school}, {education.city}</h4>
                                        <h5>{education.start} - {education.end}</h5>
                                        <p>{education.description}</p>
                                    </>
                                )
                            })}
                        </Row>

                        <Row id='employment-row'>
                            {this.state.cvInfo.employment.length > 0 && <><WorkIcon /> <h3>Work Experience</h3></>}
                            {this.state.cvInfo.employment.map(employment => {
                                return (
                                    <>
                                        <h4>{employment.title} at {employment.employer}, {employment.city}</h4>
                                        <h5>{employment.start} - {employment.end}</h5>
                                        <p>{employment.description}</p>
                                    </>
                                )
                            })}
                        </Row>
                    </Col>

                    <Col lg="3">
                        <Row>
                            <h4>Details</h4>
                            <p>{this.state.cvInfo.userInfo.phone}</p>
                            <p>{this.state.cvInfo.userInfo.email}</p>
                        </Row>
                        <Row>
                            {this.state.cvInfo.skills.length > 0 && <h4>Skills</h4>}
                            {this.state.cvInfo.skills.map(skill => {
                                return (
                                    <p>{skill.skill}</p>
                                )
                            })}
                        </Row>
                        <Row>
                            {this.state.cvInfo.links.length > 0 && <h4>Links</h4>}
                            {this.state.cvInfo.links.map(link => {
                                return (
                                    <a href={link.link}>{link.label}</a>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Apollo