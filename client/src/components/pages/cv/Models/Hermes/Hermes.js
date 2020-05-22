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
import './Hermes.css'

import PersonIcon from '@material-ui/icons/Person'
import SchoolIcon from '@material-ui/icons/School'
import WorkIcon from '@material-ui/icons/Work'


class Hermes extends Component {

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
            },
            smallStyle: {
                fontSize: 0
            },
            detailStyle: {
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
        const containerWidth = document.querySelector('#hermes-cv-container').offsetWidth
        const titleStyle = { fontSize: containerWidth / 30 }
        const subtitleStyle = { fontSize: containerWidth / 40 }
        const paragraphStyle = { fontSize: containerWidth / 50 }
        const sectionTitleStyle = { fontSize: containerWidth / 35 }
        const smallStyle = { fontSize: containerWidth / 60 }
        const detailStyle = { fontSize: containerWidth / 70 }
        this.setState({ titleStyle, subtitleStyle, paragraphStyle, sectionTitleStyle, smallStyle, detailStyle })
    }

    componentDidMount = () => this.setInitialInfo()

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps !== this.props) {
            const newDescription = []
            this.props.cvInfo.userInfo.profileDescription.map(node => newDescription.push(this.serialize(node)))
            this.setState({ cvInfo: this.props.cvInfo, profileDescriptionHTML: newDescription })
        }
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
            <Container id='hermes-cv-container' className='cv-container'>




                <Row>
                    <Col lg="4" className='left-side' style={{ backgroundColor: this.state.cvInfo.color }}>


                        <section className='profile-name-picture-section'>
                            <Row id='picture-row'>
                                <Col lg={{ span: 10, offset: 1 }} className='profile-picture-col'>
                                    <figure>
                                        <img id='profile-picture' src={this.state.cvInfo.userInfo.profilePicture} alt="profile" />
                                    </figure>
                                </Col>
                            </Row>
                            <Row >
                                <Col className='profile-title-col'>
                                    <h3 id='profile-user-name' style={this.state.sectionTitleStyle} >{this.state.cvInfo.userInfo.firstName} {this.state.cvInfo.userInfo.lastName}</h3>
                                    <p id='profile-user-title' style={this.state.paragraphStyle} >{this.state.cvInfo.userInfo.title}</p>
                                </Col>
                            </Row>
                        </section>



                        <section className='details-section'>
                            <Row className='section-title'>
                                <Col lg="auto" className='title-col'><h4 id='details-section-title' style={this.state.subtitleStyle}>Contact</h4></Col>
                                <Col className='hr-col'><hr /></Col>
                            </Row>
                            <div className='section-info'>
                                <Row><Col><p className='details-item-phone' style={this.state.paragraphStyle} >{this.state.cvInfo.userInfo.phone}</p></Col></Row>
                                <Row><Col><p className='details-item-phone' style={this.state.paragraphStyle} >{this.state.cvInfo.userInfo.email}</p></Col></Row>
                            </div>
                        </section>


                        {this.state.cvInfo.skills.length > 0 &&
                            <section className='skills-section'>
                                <Row className='section-title'>
                                    <Col lg="auto" className='title-col'><h4 id='details-section-title' style={this.state.subtitleStyle}>Skills</h4></Col>
                                    <Col className='hr-col'><hr /></Col>
                                </Row>
                                <div className='section-info'>
                                    {this.state.cvInfo.skills.map((skill, index) => {
                                        return (
                                            <Row className='skill-item' key={index}><Col><p className='skills-item-title' style={this.state.paragraphStyle}>{skill.skill}</p></Col></Row>
                                        )
                                    })}
                                </div>
                            </section>
                        }

                        {this.state.cvInfo.links.length > 0 &&
                            <section className='links-section'>
                                <Row className='section-title'>
                                    <Col lg="auto" className='title-col'><h4 id='links-section-title' style={this.state.subtitleStyle}>Links</h4></Col>
                                    <Col className='hr-col'><hr /></Col>

                                </Row>
                                <div className='section-info'>
                                    {this.state.cvInfo.links.map((link, index) => {
                                        return (
                                            <Row className='link-item' key={index}><Col><a className='links-item-label' href={link.link} key={index} style={this.state.paragraphStyle}>{link.label}</a></Col></Row>
                                        )
                                    })}
                                </div>
                            </section>
                        }


                    </Col>

                    <Col lg="8" className='right-side'>

                        <section className='profile-section'>

                            <Row className='section-title'>
                                <Col lg="1"><PersonIcon id='profile-section-icon' style={this.state.titleStyle} /></Col>
                                <Col lg="auto"><h3 id='profile-section-title' style={this.state.titleStyle}>Profile</h3></Col>
                                <Col className='hr-col'><hr /></Col>
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
                                    <Col lg="1"> <SchoolIcon id='school-section-icon' style={this.state.titleStyle} /></Col>
                                    <Col lg="auto"><h3 id='education-section-title' style={this.state.titleStyle}>Education</h3></Col>
                                    <Col className='hr-col'><hr /></Col>
                                </Row>

                                <Row className='section-info'>
                                    <Col lg={{ offset: 1 }}>
                                        {this.state.cvInfo.education.map((education, index) => {
                                            return (
                                                <div className='education-item' key={index}>
                                                    <Row className='justify-content-lg-between'>

                                                        <h4 className='education-item-title'>
                                                            <span className='title' style={this.state.paragraphStyle}>{education.degree} </span>
                                                            <span style={this.state.smallStyle}>, {education.school}, {education.city}</span>
                                                        </h4>

                                                    </Row>
                                                    <Row>
                                                        <p className='education-item-date' style={this.state.detailStyle}>{education.start} - {education.end}</p>
                                                    </Row>
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
                                    <Col lg="1"><div className='icon-container'><WorkIcon id='employment-section-icon' style={this.state.titleStyle} /></div> </Col>
                                    <Col lg="auto"><h3 id='employment-section-title' style={this.state.titleStyle}>Employment</h3></Col>
                                    <Col className='hr-col'><hr /></Col>
                                </Row>

                                <Row className="section-info">
                                    <Col lg={{ offset: 1 }}>
                                        {this.state.cvInfo.employment.map((employment, index) => {
                                            return (
                                                

                                                <div className='employment-item' key={index}>
                                                    <Row>
                                                        <h4 className='employment-item-title' style={this.state.paragraphStyle}>
                                                            <span className='title' style={this.state.paragraphStyle}>{employment.title} </span>
                                                            <span style={this.state.smallStyle}> at  {employment.employer} , {employment.city}</span>                                                   
                                                        </h4>
                                                    </Row>
                                                    <Row>
                                                        <p className='employment-item-date' style={this.state.detailStyle}>{employment.start} - {employment.end}</p>
                                                    </Row>
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


                </Row>





            </Container >
        )
    }
}

export default Hermes