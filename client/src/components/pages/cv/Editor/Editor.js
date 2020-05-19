import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Editor.css'

import UserInfo from './UserDetails/UserInfoForm'
import EmploymentInfo from './Employment/EmploymentInfo'
import EducationInfo from './Education/EducationInfo'
import SkillsInfo from './Skills/SkillsInfo'
import LinksInfo from './Links/LinksInfo'
import Visualizer from './Visualizer/Visualizer'


import UserService from '../../../../service/user.service'
import CVService from '../../../../service/cv.service'

class Editor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvID: this.props.cvID,
            cvInfo: undefined,
            autoSaveInterval: undefined,
            maxHeight: undefined,
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

    // componentDidUpdate = (prevProps, prevState) => prevState !== this.state && this.setState({ cvInfo: {...this.state.cvInfo} })



    //autosave
    updateCVInfo = (info, type) => {

        this.setState({ cvInfo: { ...this.state.cvInfo, [type]: info } })

        if (this.state.autoSaveInterval) {
            clearTimeout(this.state.autoSaveInterval)
        }
        this.state.autoSaveInterval = setTimeout(() => {
            this.cvService.updateCVInfo(this.state.cvID, this.state.cvInfo)
                .then() // Preguntar a Germán qué hago si no me hace falta controlar la respuesta positiva del server
                .catch(error => console.log(error))
        }, 1500)
    }

    createNewElement = (type) => {
        switch (type) {
            case 'education':
                this.cvService.createEducation(this.state.cvID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            case 'employment':
                this.cvService.createEmployment(this.state.cvID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            case 'skill':
                this.cvService.createSkill(this.state.cvID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            case 'link':
                this.cvService.createLink(this.state.cvID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            default:
                break;
        }
    }

    deleteElement = (type, itemID) => {
        switch (type) {
            case 'education':
                this.cvService.deleteEducation(this.state.cvID, itemID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            case 'employment':
                this.cvService.deleteEmployment(this.state.cvID, itemID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            case 'skill':
                this.cvService.deleteSkill(this.state.cvID, itemID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            case 'link':
                this.cvService.deleteLink(this.state.cvID, itemID)
                    .then(response => this.setState({ cvInfo: response.data }))
                    .catch(error => console.log(error))
                break

            default:
                break;
        }
    }

    render() {

        return (
            this.state.cvInfo
                ? <Row>

                    <Col id="editor-section" lg="6">

                        <UserInfo
                            {...this.props}
                            userInfo={this.state.cvInfo.userInfo}
                            updateCVInfo={this.updateCVInfo}
                        />

                        <EmploymentInfo
                            {...this.props}
                            employment={this.state.cvInfo.employment}
                            cvID={this.state.cvInfo._id}
                            updateCVInfo={this.updateCVInfo}
                            createNewElement={this.createNewElement}
                            deleteElement={this.deleteElement}
                        />

                        <EducationInfo
                            {...this.props}
                            education={this.state.cvInfo.education}
                            cvID={this.state.cvInfo._id}
                            updateCVInfo={this.updateCVInfo}
                            createNewElement={this.createNewElement}
                            deleteElement={this.deleteElement}
                        />

                        <SkillsInfo
                            {...this.props}
                            skills={this.state.cvInfo.skills}
                            cvID={this.state.cvInfo._id}
                            updateCVInfo={this.updateCVInfo}
                            createNewElement={this.createNewElement}
                            deleteElement={this.deleteElement}
                        />

                        <LinksInfo
                            {...this.props}
                            links={this.state.cvInfo.links}
                            updateCVInfo={this.updateCVInfo}
                            createNewElement={this.createNewElement}
                            deleteElement={this.deleteElement}
                        />
                    </Col>

                    <Col id="visualizer-section" lg="6">

                        <Visualizer
                            {...this.props}
                            cvInfo={this.state.cvInfo}
                            setCVHeight={this.setCVHeight}
                        />

                    </Col>

                </Row>
                : <> </>
        )
    }
}

export default Editor