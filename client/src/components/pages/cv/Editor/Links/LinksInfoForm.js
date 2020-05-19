import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class LinksInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = { link: this.props.link }
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({link: this.props.link})

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ link: { ...this.state.link, [name]: value } }, () => {
            this.props.updateLinksInfo(this.props.index, this.state.link)
        })
        
    }

    formWrapper = (index) => {
        const form = document.querySelector(`#link-form-${index}`)
        form.classList.toggle('show')
    }

    render() {
        return this.state.link ? (
            <>
                <Form>
                    <Row>
                        <h3 className="skill-title" onClick={() => this.formWrapper(this.props.index)}>{this.state.link.label}</h3>
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
                {/* <Button variant="danger" onClick={() => this.props.deleteLinkItem(this.state.link._id)}>Delete Link</Button> */}
                <Button variant="danger" onClick={() => this.props.deleteElement('link', this.state.link._id)}>Delete Link</Button>
            </>
        ) : <p>Cargando...</p>
    }
}

export default LinksInfoForm