import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import Navigation from '../../ui/navbar/Navbar'

import UserService from '../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvs: undefined,
            templates: undefined,
            createdCV: undefined,
            userAction: 'dashboard',
        }
        this.userService = new UserService()
    }

    getCVs = (userID) => {
        if (!this.state.cvs) {
            this.userService.getCVs(userID)
                .then(response => {
                    console.log('ESTA ES LA RESPUESTA DE GETCVS')
                    console.log(response);
                    this.setState({ cvs: response.data })
                })
                .catch(error => console.log(error))
        }
    }

    getTemplates = () => {
        if (!this.state.templates) {
            this.userService.getTemplates()
                .then(response => this.setState({ templates: response.data }))
                .catch(error => console.log(error))
        }
    }

    browseTemplates = () => {
        this.setState({ userAction: 'templates' })
    }

    browseDashboard = () => {
        this.setState({ userAction: 'dashboard' })
    }

    createCV = (templateName, userID) => {
        this.userService.createCV(templateName, userID)
            .then(response => this.setState({ createdCV: response.data }))
            .catch(error => console.log(error))
    }

    render() {

        this.getCVs(this.props.loggedInUser._id)
        this.getTemplates()

        return (

            this.state.createdCV
                ? <Redirect to={`/cv/${this.state.createdCV._id}/edit`} />
                : <>
                    <Navigation setTheUser={this.props.setTheUser} loggedInUser={this.props.loggedInUser} />
                    <Container>
                        <Row>
                            <Col>
                                {this.state.userAction === 'dashboard' ? <h1>Dashboard</h1> : <h1>Templates</h1>}
                            </Col>
                            <Col lg="2">
                                {
                                    this.state.userAction === 'dashboard'
                                        ? <Button onClick={this.browseTemplates}> + New CV </Button>
                                        : <Button onClick={this.browseDashboard}> Dashboard </Button>
                                }
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            {
                                this.state.userAction === 'dashboard'
                                    ? this.state.cvs && this.state.cvs.map((cv, index) => <Col key={index} lg="6"> <Link to={`/cv/${cv._id}/edit`}><Button key={cv._id}>{cv.name}</Button> </Link></Col>)
                                    : this.state.templates.map((template, index) => <Col key={index} lg="6"> <Button onClick={() => this.createCV(template.name, this.props.loggedInUser._id)} key={template._id}>{template.name}</Button> </Col>)
                            }
                        </Row>
                    </Container>
                </>
        )
    }
}

export default Profile