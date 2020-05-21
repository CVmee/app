import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import { formWrapper, mouseEnterFormItem, mouseLeaveFormItem, mouseEnterDeleteButton, mouseLeaveDeleteButton } from '../../../../../clientEvents/editorEvents'


class LinksInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = { link: this.props.link }
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ link: this.props.link })

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ link: { ...this.state.link, [name]: value } }, () => {
            this.props.updateLinksInfo(this.props.index, this.state.link)
        })

    }


    render() {
        return this.state.link ? (

            <article>
                <Row
                    onMouseEnter={() => mouseEnterFormItem(this.props.index, 'link')}
                    onMouseLeave={() => mouseLeaveFormItem(this.props.index, 'link')}
                >
                    <Col lg="1">
                        <DragIndicatorIcon
                            className='side-item'
                            id={`drag-link-button-${this.props.index}`}
                        />
                    </Col>

                    <Col lg="10">
                        <Form className='form-item'>
                            <Row
                                onClick={() => formWrapper(this.props.index, 'link')}
                            >
                                <h3
                                    className="form-item-title"
                                    id={`form-link-item-title-${this.props.index}`}
                                >
                                    {this.state.link.label}</h3>
                            </Row>
                            <div id={`link-form-${this.props.index}`} className='form-wrapper'>
                                <Row>
                                    <Col lg="6">
                                        <Form.Group controlId="label">
                                            <Form.Label>Label</Form.Label>
                                            <Form.Control name="label" type="text" value={this.state.link.label} onChange={this.handleInputChange} />
                                        </Form.Group>
                                    </Col>

                                    <Col lg="6">
                                        <Form.Group controlId="link">
                                            <Form.Label>Link</Form.Label>
                                            <Form.Control name="link" type="text" value={this.state.link.link} onChange={this.handleInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Col>

                    <Col lg="1">
                        <DeleteOutlineIcon
                            className='side-item'
                            id={`delete-link-item-button-${this.props.index}`}
                            onClick={() => this.props.deleteElement('link', this.state.link._id)}
                            onMouseEnter={() => mouseEnterDeleteButton(this.props.index, 'link')}
                            onMouseLeave={() => mouseLeaveDeleteButton(this.props.index, 'link')}
                        />
                    </Col>
                </Row>
            </article>

        ) : <p>Cargando...</p>
    }
}

export default LinksInfoForm