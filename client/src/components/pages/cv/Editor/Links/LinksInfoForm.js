import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'


class LinksInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoSaveInterval: undefined, // Unnecessary
            user: this.props.loggedInUser,
            cvID: this.props.match.params.id,
            cvInfo: this.props.link, // Probably Unnecessary
            _id: this.props.link._id,
            label: this.props.link.label,
            link: this.props.link.link,
            // userAction: 'edition'

        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.state[name] = value
        const { _id, label, link } = this.state
        this.props.updateLinksInfo(this.props.index, { _id, label, link })
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col lg="6">
                        <Form.Group controlId="label">
                            <Form.Label>Label</Form.Label>
                            <Form.Control name="label" type="text" value={this.state.label} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg="6">
                        <Form.Group controlId="link">
                            <Form.Label>Link</Form.Label>
                            <Form.Control name="link" type="text" value={this.state.link} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default LinksInfoForm