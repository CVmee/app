import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import { formWrapper, mouseEnterFormItem, mouseLeaveFormItem, mouseEnterDeleteButton, mouseLeaveDeleteButton } from '../../../../../clientEvents/editorEvents'


class SkillsInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = { skill: this.props.skill }
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ skill: this.props.skill })

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ skill: { ...this.state.skill, [name]: value } }, () => {
            this.props.updateSkillsInfo(this.props.index, this.state.skill)
        })
    }


    render() {
        return this.state.skill ? (

            <article>
                <Row
                    onMouseEnter={() => mouseEnterFormItem(this.props.index, 'skill')}
                    onMouseLeave={() => mouseLeaveFormItem(this.props.index, 'skill')}
                >
                    <Col lg="1">
                        <DragIndicatorIcon
                            className='side-item' 
                            id={`drag-skill-button-${this.props.index}`}
                            />
                    </Col>

                    <Col lg="10">
                        <Form className='form-item'>
                            <Row
                                    onClick={() => formWrapper(this.props.index, 'skill')}
                            >
                                <h3
                                    className="form-item-title"
                                    id={`form-skill-item-title-${this.props.index}`}
                                >
                                    {this.state.skill.skill}
                                </h3>
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
                    </Col>

                    <Col lg="1">
                        <DeleteOutlineIcon
                            className='side-item'
                            id={`delete-skill-item-button-${this.props.index}`}
                            onClick={() => this.props.deleteElement('skill', this.state.skill._id)} 
                            onMouseEnter={() => mouseEnterDeleteButton(this.props.index, 'skill')}
                            onMouseLeave={() => mouseLeaveDeleteButton(this.props.index, 'skill')}
                            />
                    </Col>
                </Row>

            </article>

        ) : <p>Cargando...</p>
    }
}

export default SkillsInfoForm