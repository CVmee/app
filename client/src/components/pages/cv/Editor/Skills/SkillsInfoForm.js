import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class SkillsInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = { skill: this.props.skill }
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({skill: this.props.skill})

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ skill: { ...this.state.skill, [name]: value } }, () => {
            this.props.updateSkillsInfo(this.props.index, this.state.skill)
        })
    }

    formWrapper = (index) => {
        const form = document.querySelector(`#skill-form-${index}`)
        form.classList.toggle('show')
    }

    render() {
        return this.state.skill ? (
            <>
                <Form>
                    <Row>
                        <h3 className="skill-title" onClick={() => this.formWrapper(this.props.index)}>{this.state.skill.skill}</h3>
                    </Row>
                    <div id={`skill-form-${this.props.index}`} className='form-wrapper'>
                        <Row>
                            <Col lg="6">
                                <Form.Group controlId="skill">
                                    <Form.Label>Skill</Form.Label>
                                    <Form.Control name="skill" type="text" value={this.state.skill.skill} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col lg="6">
                                <Form.Group controlId="level">
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control name="level" type="text" value={this.state.skill.level} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Form>
                {/* <Button variant="danger" onClick={() => this.props.deleteSkillItem(this.state.skill._id)}>Delete Skill</Button> */}
                <Button variant="danger" onClick={() => this.props.deleteElement('skill', this.state.skill._id)}>Delete Skill</Button>
            </>
        ) : <p>Cargando...</p>
    }
}

export default SkillsInfoForm