import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import UserService from '../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class Template extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }
    render() {
        return (
            <Row>
                <Col id="editor-section" lg="6">
                    <Container>
                        This is the Template Visualizer
                    </Container>
                </Col>
                <Col id="visualizer-section" lg="6">
                    <Container>Visualizer</Container>
                </Col>
            </Row>
        )
    }
}

export default Template