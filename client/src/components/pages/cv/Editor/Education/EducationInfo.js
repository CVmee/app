import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import EducationInfoForm from './EducationInfoForm'

import UserService from '../../../../../service/user.service'
import CVService from '../../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class EducationInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo,
            cvID: this.props.match.params.id,
            educationInfo: this.props.cvInfo.education,
            // userAction: 'edition'
        }
        this.userService = new UserService() // Probably Unnecessary too
        this.cvService = new CVService()
    }

    updateEducationInfo = (index, info) => {
        this.state.educationInfo[index] = info
        const neweducationInfo = this.state.educationInfo
        this.state.cvInfo = { ...this.state.cvInfo, education: neweducationInfo }
        this.props.updateCVInfo(this.state.cvInfo)
    }

    createEducationItem = () => {
        const newEducation = { degree: '', school: '', start: '', end: '', city: '', description: '' }
        this.state.cvInfo.education.push(newEducation)
        this.props.createNewElement(this.state.cvInfo)
        //this.props.updateCVInfo(this.state.cvInfo)
    }

    deleteEducationItem = (itemID) => {
    //     console.log('INDEX')
    //     console.log(index);
    //     console.log('EDUCATION STATUS BEFORE')
    //     console.log(this.state.cvInfo.education);
    //     //this.state.cvInfo.education.splice(index, 1)
    //    // this.state.educationInfo = this.state.cvInfo.education
    //     console.log('EDUCATION STATUS AFTER')
    //     console.log(this.state.cvInfo.education);
    //     console.log(this.state.cvInfo)
        const splicedArr = this.state.educationInfo.filter(education => education.id !== itemID)
        this.state.cvInfo.education = splicedArr
        //this.setSt
    }

    render() {
        console.log('RENDERING EDUCATION INFO! --------------------')
        console.log(this.state)
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
                        deleteEducationItem={this.deleteEducationItem}
                    />)}
                <Container>
                    <Button onClick={this.createEducationItem}>+ Add Education</Button>
                </Container>
            </Container>
        )
    }
}

export default EducationInfo