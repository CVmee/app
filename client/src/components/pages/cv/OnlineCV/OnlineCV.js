import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import CVService from '../../../../service/cv.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

import Apollo from '../Models/Apollo/Apollo'
import './OnlineCV.css'

class OnlineCV extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cvInfo: {},
            error: ''
        }
        this.cvService = new CVService()
    }

    componentDidMount = () => {
        this.cvService.getCVInfo(this.props.match.params.id)
            .then(response => this.setState({ cvInfo: response.data }))
            .catch(() => this.setState({error: "Sorry, the CV you're looking for doesn't exists :("}))
    }


    render() {

        if (this.state.cvInfo) {
            switch (this.state.cvInfo.name) {
                case 'Apollo':
                    return (
                        <Row id='online-cv-container' className='justify-content-lg-center'>
                            <Col lg="6">
                                <Apollo cvInfo={this.state.cvInfo}/>
                            </Col>
                        </Row>
                    )
            
                default:
                    break;
            }
         }
        else if (this.state.error) 
            return <p>{this.state.error}</p>
        else
            return <p>Cargando...</p>

    }
}

export default OnlineCV