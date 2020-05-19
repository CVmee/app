import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import RichText from '../../../../slate-editor/RichText'


class EducationInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = { education: this.props.education }
    }

    componentDidUpdate = (prevProps) => {
        prevProps !== this.props && this.setState({education: this.props.education})
    }


    handleInputChange = event => {
        const { name, value } = event.target      
        const newEducationInfo = { ...this.state.education, [name]: value }
        this.setState({ education: newEducationInfo }, () => {
            this.props.updateEducationInfo(this.props.index, this.state.education)
        })
    }

    handleDescriptionChange = value => {
        this.setState({ education: { ...this.state.education, description: value } }, () => {
            this.props.updateEducationInfo(this.props.index, this.state.education)
        })
    }

    formWrapper = (index) => {
        const form = document.querySelector(`#education-form-${index}`)
        form.classList.toggle('show')
    }


    render() {

        return this.state.education ? (
            <>

                <Form>
                    <Row>
                        <h3 className="degree-title" onClick={() => this.formWrapper(this.props.index)} >{this.state.education.degree} at {this.state.education.school}</h3>
                    </Row>

                    <div id={`education-form-${this.props.index}`} className='form-wrapper'>
                        <Row>
                            <Col lg="6">
                                <Form.Group controlId="degree">
                                    <Form.Label>Degree</Form.Label>
                                    <Form.Control name="degree" type="text" value={this.state.education.degree} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col lg="6">
                                <Form.Group controlId="school">
                                    <Form.Label>School</Form.Label>
                                    <Form.Control name="school" type="text" value={this.state.education.school} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col lg="6">
                                <Form.Label>Start & End Date</Form.Label>
                                <Row>
                                    <Col lg="6">
                                        <Form.Group controlId="start">
                                            <Form.Control name="start" type="text" value={this.state.education.start} onChange={this.handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                        <Form.Group controlId="end">
                                            <Form.Control name="end" type="text" value={this.state.education.end} onChange={this.handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg="6">
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name="city" type="text" value={this.state.education.city} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <RichText
                                        {...this.props}
                                        type='education'
                                        index={this.props.index}
                                        handleDescriptionChange={this.handleDescriptionChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Form>
                {/* <Button variant="danger" onClick={() => this.props.deleteEducationItem(this.state.education._id)}>Delete Education</Button> */}
                <Button variant="danger" onClick={() => this.props.deleteElement('education',this.state.education._id)}>Delete Education</Button>
            </>
        ) : <p>Cargando...</p>
    }
}

export default EducationInfoForm