import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

import CVService from '../../../../service/cv.service'

import './Template.css'

import Apollo from '../Models/Apollo/Apollo'
import Hermes from '../Models/Hermes/Hermes'
import Blue from '../Models/Blue/Blue'

class Template extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: {},
            error: '',
            autoSaveInterval: undefined,
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

    // autosave color
    changeColor = (color) => {
        this.setState({ cvInfo: { ...this.state.cvInfo, color } })
        if (this.state.autoSaveInterval) {
            clearTimeout(this.state.autoSaveInterval)
        }
        this.state.autoSaveInterval = setTimeout(() => {
            this.cvService.updateCVInfo(this.state.cvInfo._id, this.state.cvInfo)
                .then()
                .catch(error => console.log(error))
        }, 1500)
    }

    renderTemplateModel = () => {
        switch (this.state.cvInfo.name) {
            case 'Apollo':
                return <Apollo cvInfo={this.state.cvInfo} style={{ overflowY: 'scroll' }} style={{ maxHeight: "100vh" }} />

            case 'Hermes':
                return <Hermes cvInfo={this.state.cvInfo} style={{ overflowY: 'scroll' }} style={{ maxHeight: "100vh" }} />

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
                    {Object.keys(this.state.cvInfo).length &&
                        <Container>
                            <Row style={{ marginTop: "7%" }}>
                                <Col lg="4">
                                    <Button onClick={() => this.changeTemplate('Apollo')} >Apollo</Button>
                                </Col>
                                <Col lg="4">
                                    <Button onClick={() => this.changeTemplate('Hermes')} >Hermes</Button>
                                </Col>
                                <Col lg="4">
                                    <Button onClick={() => this.changeTemplate('Helena')} >Helena</Button>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Col>
                <Col id="template-visualizer-section" lg="8">
                    <Row style={{ padding: "3%" }}>
                        <Col>
                            <Link to={`/cv/${this.props.match.params.id}/edit`}><Button variant='warning'>Back to Editor</Button></Link>
                        </Col>
                        <Col>
                            <Button style={{ borderRadius: "50%", width: "20px", height: "25px", margin: "2%", backgroundColor: "#0f141e", borderColor: '#0f141e' }} onClick={() => this.changeColor('#0f141e')}></Button>
                            <Button style={{ borderRadius: "50%", width: "20px", height: "25px", margin: "2%", backgroundColor: "#4b0082", borderColor: '#4b0082' }} onClick={() => this.changeColor('#4b0082')}></Button>
                            <Button style={{ borderRadius: "50%", width: "20px", height: "25px", margin: "2%", backgroundColor: "#1E96F0", borderColor: '#1E96F0' }} onClick={() => this.changeColor('#1E96F0')}></Button>
                            <Button style={{ borderRadius: "50%", width: "20px", height: "25px", margin: "2%", backgroundColor: "#1EA05A", borderColor: '#1EA05A' }} onClick={() => this.changeColor('#1EA05A')}></Button>
                            <Button style={{ borderRadius: "50%", width: "20px", height: "25px", margin: "2%", backgroundColor: "#FA4646", borderColor: '#FA4646' }} onClick={() => this.changeColor('#FA4646')}></Button>
                        </Col>
                        <Col lg={{ span: 1, offset: 1 }}>
                            <Link to={`/cv/${this.props.match.params.id}`}><Button variant='warning'>Share</Button></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Container style={{ maxHeight: "90vh" }}>
                            {this.state.cvInfo && this.renderTemplateModel()}
                        </Container>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Template