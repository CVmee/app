import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import RichText from '../../../../slate-editor/RichText'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import { formWrapper, mouseEnterFormItem, mouseLeaveFormItem, mouseEnterDeleteButton, mouseLeaveDeleteButton } from '../../../../../clientEvents/editorEvents'


class EmploymentInfoForm extends Component {

    constructor(props) {
        super(props)
        this.state = { employment: this.props.employment }
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ employment: this.props.employment })

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

    render() {
        return this.state.employment ? (

            <article>
                <Row
                    onMouseEnter={() => mouseEnterFormItem(this.props.index, 'employment')}
                    onMouseLeave={() => mouseLeaveFormItem(this.props.index, 'employment')}
                >
                    <Col lg='1'>
                        <DragIndicatorIcon
                            className='side-item'
                            id={`drag-employment-button-${this.props.index}`}
                        />
                    </Col>

                    <Col lg='10'>
                        <Form className="form-item">
                            <Row
                                onClick={(event) => formWrapper(this.props.index, 'employment')}
                            >
                                <h3
                                    id={`form-employment-item-title-${this.props.index}`}
                                    className="form-item-title"
                                >
                                    {this.state.employment.title} at {this.state.employment.employer}
                                </h3>
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
                                        <Row >
                                            <Col lg="6" style={{ padding: "0 5% 0 0" }}>
                                                <Form.Group controlId="start">
                                                    <Form.Control name="start" type="text" value={this.state.employment.start} onChange={this.handleInputChange} />
                                                </Form.Group>
                                            </Col>
                                            <Col lg="6" style={{ padding: "0 5% 0 0" }}>
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
                    </Col>
                    <Col lg='1'>
                        <DeleteOutlineIcon
                            id={`delete-employment-item-button-${this.props.index}`}
                            className='side-item'
                            onClick={() => this.props.deleteElement('employment', this.state.employment._id)}
                            onMouseEnter={() => mouseEnterDeleteButton(this.props.index, 'employment')}
                            onMouseLeave={() => mouseLeaveDeleteButton(this.props.index, 'employment')}

                        />
                    </Col>


                </Row>

            </article>

        ) : <p>Cargando...</p>
    }
}

export default EmploymentInfoForm