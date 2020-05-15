import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import './Editor.css'

import UserDetails from './UserDetails/UserDetails'
import ProfileDescription from './ProfileDescription/ProfileDescription'
import EmploymentInfo from './Employment/EmploymentInfo'
import EducationInfo from './Education/EducationInfo'
import SkillsInfo from './Skills/SkillsInfo'
import LinksInfo from './Links/LinksInfo'


import UserService from '../../../../service/user.service'
import CVService from '../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class Editor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvID: this.props.cvID,
            cvInfo: undefined,
            autoSaveInterval: undefined,
            // userAction: 'edition'
        }
        this.userService = new UserService()
        this.cvService = new CVService()
    }

    getCVInfo = (cvID) => this.cvService.getCVInfo(cvID)

    componentDidMount() {
        this.getCVInfo(this.state.cvID)
            .then(response => this.setState({ cvInfo: response.data }))
            .catch(error => console.log(error))
    }

    updateCVInfo = (cvInfo) => {
        this.setState({ cvInfo })
        if (this.state.autoSaveInterval) {
            clearTimeout(this.state.autoSaveInterval)
        }
        this.state.autoSaveInterval = setTimeout(() => {
            this.cvService.updateCVInfo(this.state.cvID, this.state.cvInfo)
                .then() // Preguntar a Quique qué hago si no me hace falta controlar la respuesta positiva del server
                .catch(error => console.log(error))
        }, 1500)
    }

    autoSave = () => {

    }

    render() {
        return (
            this.state.cvInfo
                ? <Row>
                    <Col id="editor-section" lg="6">
                        <UserDetails {...this.props} cvInfo={this.state.cvInfo} updateCVInfo={this.updateCVInfo} />
                        <ProfileDescription {...this.props} cvInfo={this.state.cvInfo} updateCVInfo={this.updateCVInfo} />
                        <EmploymentInfo {...this.props} cvInfo={this.state.cvInfo} updateCVInfo={this.updateCVInfo} />
                        <EducationInfo {...this.props} cvInfo={this.state.cvInfo} updateCVInfo={this.updateCVInfo} />
                        <SkillsInfo {...this.props} cvInfo={this.state.cvInfo} updateCVInfo={this.updateCVInfo} />
                        <LinksInfo {...this.props} cvInfo={this.state.cvInfo} updateCVInfo={this.updateCVInfo} />
                    </Col>
                    <Col id="visualizer-section" lg="6">
                        <Container>Visualizer</Container>
                    </Col>
                </Row>
                : <> </>
        )
    }
}

export default Editor