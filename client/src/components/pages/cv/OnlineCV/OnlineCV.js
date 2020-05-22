import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import CVService from '../../../../service/cv.service'

import Apollo from '../Models/Apollo/Apollo'
import Hermes from '../Models/Hermes/Hermes'
import Blue from '../Models/Blue/Blue'
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
        console.log('COMPONENTE MONTADO, LLAMANDO A GETINFO')
        this.cvService.getCVInfo(this.props.match.params.id)
            .then(response => {
                console.log('RESPONSE', response.data)
                this.setState({ cvInfo: response.data })
            })
            .catch(() => {
                console.log('ERROR')
                this.setState({ error: "Sorry, the CV you're looking for doesn't exists :(" })
            })
    }


    render() {
        if (Object.keys(this.state.cvInfo).length) {
            console.log('HAY CV', this.state.cvInfo)
            switch (this.state.cvInfo.name) {
                case 'Apollo':
                    return (
                        <Row id='online-cv-container' className='justify-content-lg-center'>
                            <Col lg="8">
                                <Apollo cvInfo={this.state.cvInfo}/>
                            </Col>
                        </Row>
                    )
                case 'Hermes':
                    return (
                        <Row id='online-cv-container' className='justify-content-lg-center'>
                            <Col lg="8">
                                <Hermes cvInfo={this.state.cvInfo} />
                            </Col>
                        </Row>
                    )
                case 'Blue':
                    return (
                        <Row id='online-cv-container' className='justify-content-lg-center'>
                            <Col lg="8">
                                <Blue cvInfo={this.state.cvInfo} />
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