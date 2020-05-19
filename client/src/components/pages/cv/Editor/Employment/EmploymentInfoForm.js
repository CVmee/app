import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import RichText from '../../../../slate-editor/RichText'


class EmploymentInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = { employment: this.props.employment }
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({employment: this.props.employment})

    handleInputChange = event => {
        const { name, value } = event.target
        const newEmployment = { ...this.state.employment, [name]: value }
        this.setState({ employment: newEmployment }, () => {
            this.props.updateEmploymentInfo(this.props.index, this.state.employment)
        })
    }

    handleDescriptionChange = value => {
        this.setState({ employment: { ...this.state.employment, description: value } }, () => {
            this.props.updateEmploymentInfo(this.props.index, this.state.employment)
        })
    }

    formWrapper = (index) => {
        const form = document.querySelector(`#employment-form-${index}`)
        form.classList.toggle('show')
    }

    render() {
        return this.state.employment ? (
            <>
                <Form >
                    <Row>
                        <h3 className="job-title" onClick={(event) => this.formWrapper(this.props.index)}>{this.state.employment.title} at {this.state.employment.employer}</h3>
                    </Row>

                    <div id={`employment-form-${this.props.index}`} className='form-wrapper'>

                        <Row>
                            <Col lg="6">
                                <Form.Group controlId="title">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control name="title" type="text" value={this.state.employment.title} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col lg="6">
                                <Form.Group controlId="employer">
                                    <Form.Label>Employer</Form.Label>
                                    <Form.Control name="employer" type="text" value={this.state.employment.employer} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col lg="6">
                                <Form.Label>Start & End Date</Form.Label>
                                <Row>
                                    <Col lg="6">
                                        <Form.Group controlId="start">
                                            <Form.Control name="start" type="text" value={this.state.employment.start} onChange={this.handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                        <Form.Group controlId="end">
                                            <Form.Control name="end" type="text" value={this.state.employment.end} onChange={this.handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                            <Col lg="6">
                                <Form.Group controlId="city">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control name="city" type="text" value={this.state.employment.city} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <RichText
                                        {...this.props}
                                        type='employment'
                                        index={this.props.index}
                                        handleDescriptionChange={this.handleDescriptionChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                    </div>
                </Form>
                {/* <Button variant="danger" onClick={() => this.props.deleteEmploymentItem(this.state.employment._id)}>Delete Employment</Button> */}
                <Button variant="danger" onClick={() => this.props.deleteElement('employment', this.state.employment._id)}>Delete Employment</Button>
            </>
        ) : <p>Cargando...</p>
    }
}

export default EmploymentInfoForm