import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import UserService from '../../../../../service/user.service'
import CVService from '../../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import escapeHtml from 'escape-html'
import { Node, Text } from 'slate'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


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
            profileDescriptionHTML: [],
            titleStyle: {
                fontSize: 0
            },
            subtitleStyle: {
                fontSize: 0
            },
            paragraphStyle: {
                fontSize: 0
            },
            sectionTitleStyle: {
                fontSize: 0
            }
        }
        this.userService = new UserService()
        this.cvService = new CVService()
    }

    setInitialInfo = () => {
        this.getCointainerWidth()
        this.state.cvInfo.userInfo.profileDescription.map(node => this.state.profileDescriptionHTML.push(this.serialize(node)))
    }


    getCointainerWidth = () => {
        const containerWidth = document.querySelector('#apollo-cv-container').offsetWidth
        const titleStyle = { fontSize: containerWidth / 30 }
        const subtitleStyle = { fontSize: containerWidth / 40 }
        const paragraphStyle = { fontSize: containerWidth / 50 }
        const sectionTitleStyle = { fontSize: containerWidth / 35 }
        this.setState({ titleStyle, subtitleStyle, paragraphStyle, sectionTitleStyle })
    }

    componentDidMount = () => this.setInitialInfo()
    // Need to add Eventlistener to Window.resize

    // componentDidUpdate = () => {
    //     this.state.profileDescriptionHTML = []
    //     this.state.cvInfo.userInfo.profileDescription.map(node => this.state.profileDescriptionHTML.push(this.serialize(node)))
    // }

    componentWillReceiveProps = (nextProps) => {
        const newDescription = []
        nextProps.cvInfo.userInfo.profileDescription.map(node => newDescription.push(this.serialize(node)))
        this.setState({ cvInfo: nextProps.cvInfo, profileDescriptionHTML: newDescription })

    }

    serialize = node => {
        if (Text.isText(node)) {
            return escapeHtml(node.text)
        }

        const children = node.children.map(n => this.serialize(n)).join('')


        switch (node.type) {
            case 'paragraph':
                return `<p>${children}</p>`
            case 'bold':
                return `<strong>${children}</strong>`
            case 'italic':
                return `<em>${children}</em>`
            case 'bulleted-list':
                return `<ul>${children}</ul>`
            case 'numbered-list':
                return `<ol>${children}</ol>`
            case 'list-item':
                return `<li>${children}</li>`
            case 'link':
                return `<a href="${escapeHtml(node.url)}">${children}</a>`
            default:
                return children
        }

    }


    render() {
        return (
            <Container id='apollo-cv-container' className='cv-container'>

                <section className='title-section'>

                    <Row id='title-row'>
                        <Col lg="2" className='profile-picture-col'>
                            <figure>
                                <img id='profile-picture' src={this.state.cvInfo.userInfo.profilePicture} alt="profile" />
                            </figure>
                        </Col>
                        <Col lg="7" className='profile-title-col'>
                            <h3 id='profile-user-name' style={this.state.titleStyle} >{this.state.cvInfo.userInfo.firstName} {this.state.cvInfo.userInfo.lastName}</h3>
                            <p id='profile-user-title' style={this.state.subtitleStyle}>{this.state.cvInfo.userInfo.title}</p>
                        </Col>
                    </Row>

                </section>

                <section className='cv-info-section'>

                    <Row>

                        <Col lg="9" className='left-side'>

                            <section className='profile-section'>

                                <Row className='section-title'>
                                    <Col lg="1"><PersonIcon id='profile-section-icon' style={this.state.sectionTitleStyle} /></Col>
                                    <Col lg="9"><h3 id='profile-section-title' style={this.state.sectionTitleStyle}>Profile</h3></Col>
                                </Row>

                                <Row className='section-info'>
                                    <Col lg={{ offset: 1 }}>
                                        <div id='profile-description' style={this.state.paragraphStyle}> {this.state.profileDescriptionHTML.map((node, index) => <> {ReactHtmlParser(node)}</>)} </div>
                                    </Col>
                                </Row>

                            </section>

                            {this.state.cvInfo.education.length > 0 &&
                                <section className='education-section'>

                                    <Row className='section-title'>
                                        <Col lg="1"> <SchoolIcon id='school-section-icon' style={this.state.sectionTitleStyle} /></Col>
                                        <Col lg="9"><h3 id='education-section-title' style={this.state.sectionTitleStyle}>Education</h3></Col>
                                    </Row>

                                    <Row className='section-info'>
                                        <Col lg={{ offset: 1 }}>
                                            {this.state.cvInfo.education.map((education, index) => {
                                                return (
                                                    <div className='education-item' key={index}>
                                                        <Row> <h4 className='education-item-title' style={this.state.paragraphStyle}>{education.degree}, {education.school}, {education.city}</h4></Row>
                                                        <Row><h5 className='education-item-date' style={this.state.paragraphStyle}>{education.start} - {education.end}</h5></Row>
                                                        <Row>
                                                            <div
                                                                className='education-item-description'
                                                                style={this.state.paragraphStyle}>
                                                                {education.description.map((node, index) => {
                                                                    const serializedHTML = this.serialize(node)
                                                                    return (<> {ReactHtmlParser(serializedHTML)}</>)
                                                                })}
                                                            </div>
                                                        </Row>
                                                    </div>

                                                )
                                            })}
                                        </Col>
                                    </Row>

                                </section>
                            }

                            {this.state.cvInfo.employment.length > 0 &&
                                <section className='employment-section'>

                                    <Row className='section-title'>
                                        <Col lg="1"><WorkIcon id='employment-section-icon' style={this.state.sectionTitleStyle} /> </Col>
                                        <Col lg="9"><h3 id='employment-section-title' style={this.state.sectionTitleStyle}>Employment</h3></Col>
                                    </Row>

                                    <Row className="section-info">
                                        <Col lg={{ offset: 1 }}>
                                            {this.state.cvInfo.employment.map((employment, index) => {
                                                return (
                                                    <div className='employment-item' key={index}>
                                                        <Row><h4 className='employment-item-title' style={this.state.paragraphStyle}>{employment.title} at {employment.employer}, {employment.city}</h4></Row>
                                                        <Row><h5 className='employment-item-date' style={this.state.paragraphStyle}>{employment.start} - {employment.end}</h5></Row>
                                                        <Row>
                                                            <div
                                                                className='employment-item-description'
                                                                style={this.state.paragraphStyle}>
                                                                {employment.description.map((node, index) => {
                                                                    const serializedHTML = this.serialize(node)
                                                                    return (<>{ReactHtmlParser(serializedHTML)}</>)
                                                                })}
                                                            </div>
                                                        </Row>
                                                    </div>
                                                )
                                            })}
                                        </Col>
                                    </Row>

                                </section>
                            }


                        </Col>

                        <Col lg="3" className='right-side'>

                            <section className='details-section'>
                                <Row className='section-title'><h4 id='details-section-title' style={this.state.subtitleStyle}>Details</h4></Row>
                                <div className='section-info'>
                                    <Row><p className='details-item-phone' style={this.state.paragraphStyle}>{this.state.cvInfo.userInfo.phone}</p></Row>
                                    <Row><p className='details-item-phone' style={this.state.paragraphStyle}>{this.state.cvInfo.userInfo.email}</p></Row>
                                </div>
                            </section>


                            {this.state.cvInfo.skills.length > 0 &&
                                <section className='skills-section'>
                                    <Row className='section-title'><h4 id='details-section-title' style={this.state.subtitleStyle}>Skills</h4></Row>
                                    <div className='section-info'>
                                        {this.state.cvInfo.skills.map((skill, index) => {
                                            return (
                                                <Row className='skill-item' key={index}><p className='skills-item-title' style={this.state.paragraphStyle}>{skill.skill}</p></Row>
                                            )
                                        })}
                                    </div>
                                </section>
                            }

                            <section className='links-section'>
                                <Row className='section-title'><h4 id='links-section-title' style={this.state.subtitleStyle}>Links</h4></Row>
                                <div className='section-info'>
                                    {this.state.cvInfo.links.map((link, index) => {
                                        return (
                                            <Row className='link-item' key={index}><a className='links-item-label' href={link.link} key={index} style={this.state.paragraphStyle}>{link.label}</a></Row>
                                        )
                                    })}
                                </div>
                            </section>

                        </Col>
                    </Row>
                </section>

            </Container >
        )
    }
}

export default Apollo