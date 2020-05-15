import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import EducationInfoForm from './EducationInfoForm'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class EducationInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo,
            educationInfo: this.props.cvInfo.education,
            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    updateEducationInfo = (index, info) => {
        console.log('before')
        console.log(this.state.educationInfo)
        console.log('after')
        console.log(this.state.educationInfo)
        this.state.educationInfo[index] = info
        const neweducationInfo = this.state.educationInfo
        this.state.cvInfo = { ...this.state.cvInfo, education: neweducationInfo }
        console.log('THIS IS THE NEW STATE')
        console.log(this.state.cvInfo);
        this.props.updateCVInfo(this.state.cvInfo)
    }

    render() {
        return (
            <Container>
                {/* <h1 id="editor-user-title">{this.state.cvInfo.title}, {this.state.cvInfo.firstName} {this.state.cvInfo.lastName}</h1>            */}
                <h2 className="editor-section-title">Education Info</h2>
                {this.state.educationInfo.map((education, index) =>
                    <EducationInfoForm
                        {...this.props}
                        {...this.state.cvInfo}
                        // updateCVInfo={this.props.updateCVInfo}
                        education={education}
                        key={index}
                        index={index}
                        updateEducationInfo={this.updateEducationInfo}
                    />)}
            </Container>
        )
    }
}

export default EducationInfo