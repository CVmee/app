import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import SkillsInfoForm from './SkillsInfoForm'

import UserService from '../../../../../service/user.service'
import { Switch, Route, skill, Redirect } from 'react-router-dom'

class SkillsInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo,
            skillsInfo: this.props.cvInfo.skills,
            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    updateSkillsInfo = (index, info) => {
        this.state.skillsInfo[index] = info
        const newSkillsInfo = this.state.skillsInfo
        this.state.cvInfo = { ...this.state.cvInfo, skills: newSkillsInfo }
        this.props.updateCVInfo(this.state.cvInfo)
    }

    render() {
        return (
            <Container>
                {/* <h1 id="editor-user-title">{this.state.cvInfo.title}, {this.state.cvInfo.firstName} {this.state.cvInfo.lastName}</h1>            */}
                <h2 className="editor-section-title">Skills</h2>
                {this.state.skillsInfo.map((skill, index) =>
                    <SkillsInfoForm
                        {...this.props}
                        {...this.state.cvInfo}
                        // updateCVInfo={this.props.updateCVInfo}
                        skill={skill}
                        key={index}
                        index={index}
                        updateSkillsInfo={this.updateSkillsInfo}
                    />)}
            </Container>
        )
    }
}

export default SkillsInfo