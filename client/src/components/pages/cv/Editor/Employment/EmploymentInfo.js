import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import EmploymentInfoForm from './EmploymentInfoForm'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class EmploymentInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo,
            employmentInfo: this.props.cvInfo.employment,
            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    updateEmploymentInfo = (index, info) => {
        this.state.employmentInfo[index] = info
        const newEmploymentInfo = this.state.employmentInfo
        this.state.cvInfo = { ...this.state.cvInfo, employment: newEmploymentInfo }
        this.props.updateCVInfo(this.state.cvInfo)
    }

    render() {
        return (
            <Container>
                {/* <h1 id="editor-user-title">{this.state.cvInfo.title}, {this.state.cvInfo.firstName} {this.state.cvInfo.lastName}</h1>            */}
                <h2 className="editor-section-title">Employment Info</h2>
                {this.state.employmentInfo.map((employment, index) =>
                    <EmploymentInfoForm
                        {...this.props}
                        {...this.state.cvInfo}
                        // updateCVInfo={this.props.updateCVInfo}
                        employment={employment}
                        key={index}
                        index={index}
                        updateEmploymentInfo={this.updateEmploymentInfo}
                    />)}
            </Container>
        )
    }
}

export default EmploymentInfo