import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import CVService from '../../../../service/cv.service'

import './Template.css'

import Apollo from '../Models/Apollo/Apollo'
import Blue from '../Models/Blue/Blue'

class Template extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: {},
            error: ''
        }
        this.cvService = new CVService()
    }

    componentDidMount = () => {
        this.cvService.getCVInfo(this.props.match.params.id)
            .then(response => this.setState({ cvInfo: response.data }))
            .catch(() => this.setState({ error: "Sorry, the CV you're looking for doesn't exists :(" }))
    }

    changeTemplate = name => {
        this.cvService.changeTemplate(this.state.cvInfo._id, name)
            .then(response => this.setState({ cvInfo: response.data }))
            .catch(error => console.log(error))
    }


    renderTemplateModel = () => {
        switch (this.state.cvInfo.name) {
            case 'Apollo':
                return <Apollo cvInfo={this.state.cvInfo} />

            case 'Blue':
                return <Blue cvInfo={this.state.cvInfo} />

            default:
                return <></>
        }
    }


    render() {
        return (
            <Row>
                <Col id="template-templates-section" lg="4">
                    {this.state.cvInfo &&
                        <Container>
                            <Button onClick={() => this.changeTemplate('Apollo')} >Apollo</Button>
                            <Button onClick={() => this.changeTemplate('Blue')} >Blue</Button>
                        </Container>
                    }
                </Col>
                <Col id="template-visualizer-section" lg="8">
                    {this.state.cvInfo && this.renderTemplateModel()}
                </Col>
            </Row>
        )
    }
}

export default Template