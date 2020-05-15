import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'


class SkillsInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            autoSaveInterval: undefined, // Unnecessary
            user: this.props.loggedInUser,
            cvID: this.props.match.params.id,
            cvInfo: this.props.skill, // Probably Unnecessary
            _id: this.props.skill._id,
            skill: this.props.skill.skill,
            level: this.props.skill.level,
            // userAction: 'edition'

        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.state[name] = value
        const { _id, skill, level} = this.state
        this.props.updateSkillsInfo(this.props.index, { _id, skill, level })
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col lg="6">
                        <Form.Group controlId="skill">
                            <Form.Label>Skill</Form.Label>
                            <Form.Control name="skill" type="text" value={this.state.skill} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col lg="6">
                        <Form.Group controlId="level">
                            <Form.Label>Level</Form.Label>
                            <Form.Control name="level" type="text" value={this.state.level} onChange={this.handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default SkillsInfoForm