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
        if (document.querySelector('#add-education-button').classList.contains('active')) {
            this.cvService.createEducation(this.state.cvInfo)
                .then(newCVInfo => {
                    //this.state.educationInfo = newCVInfo.data.education // Still don't understand why is this necessary
                    //this.props.updateCVInfo(newCVInfo.data)
                    this.setState({ cvInfo: newCVInfo.data, educationInfo: newCVInfo.data.education })
                    document.querySelector('#add-education-button').classList.remove('inactive')
                    document.querySelector('#add-education-button').classList.add('active')
                })
                .catch(error => console.log(error))
            document.querySelector('#add-education-button').classList.remove('active')
            document.querySelector('#add-education-button').classList.add('inactive')
        }
    }

    deleteEducationItem = (itemID) => {
        this.cvService.deleteEducation(this.state.cvID, itemID)
            .then(response => {
                this.setState({cvInfo: response.data, educationInfo: response.data.education})
                this.props.updateCVInfoInstant(response.data)
            })
            .catch(error => console.log(error))
        // const filteredArr = this.state.educationInfo.filter(item => item._id !== itemID)
        // console.log('FILTERED ARR')
        // console.log(filteredArr)
        // this.state.cvInfo.education = filteredArr
        // this.state.educationInfo = filteredArr
        // this.setState({ educationInfo: filteredArr })
        // this.props.deleteElement(this.state.cvInfo)
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
                    <Button id="add-education-button" className='active' onClick={this.createEducationItem}>+ Add Education</Button>
                </Container>
            </Container>
        )
    }
}

export default EducationInfo