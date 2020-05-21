import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import CVService from '../../../../../service/cv.service'
import RichText from '../../../../slate-editor/RichText'


import './UserInfoForm.css'

class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = { userInfo: this.props.userInfo }
        this.cvService = new CVService()
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ userInfo: this.props.userInfo })

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ userInfo: { ...this.state.userInfo, [name]: value } }, () => {
            this.props.updateCVInfo(this.state.userInfo, 'userInfo')
        })
    }

    handleProfileChange = value => {
        this.setState({ userInfo: { ...this.state.userInfo, profileDescription: value } }, () => {
            this.props.updateCVInfo(this.state.userInfo, 'userInfo')
        })
    }

    handleFileUpload = event => {
        const uploadData = new FormData()
        uploadData.append('profilePicture', event.target.files[0])
        this.cvService.updateProfilePicture(this.props.match.params.id, uploadData)
            .then(response => {
                this.setState({ userInfo: { ...this.state.userInfo, profilePicture: response.data } }, () => {
                    this.props.updateCVInfo(this.state.userInfo, 'userInfo')
                })
            })
            .catch(error => console.log(error))
    }


    render() {
        return (

            <section className='editor-form-section'>
                
                <Row>
                    <Col lg={{ span: 10, offset: 1 }}>

                        <h2 className="editor-section-title">Personal Details</h2>
                        <Form>
                            <Row>
                                <Col lg="6" className='input-col'>
                                    <Form.Group controlId="title">
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control name="title" type="text" value={this.state.userInfo.title} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg="6" className='input-col'>
                                    <Row>
                                        <Col lg="5">
                                            <figure id="profile-picture-img">
                                                <img src={this.state.userInfo.profilePicture} alt="profile" />
                                            </figure>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group controlId="profilePicture">
                                                {/* <Form.Control name="profilePicture" type="file" onChange={this.handleFileUpload} label="Custom"/> */}
                                                <Form.File name="profilePicture" id='profilePicture' lang='eng' onChange={this.handleFileUpload} />
                                            </Form.Group>
                                            <Form.Group controlId="profilePictureDelete">
                                                <Form.Label>Delete</Form.Label>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col lg="6" className='input-col'>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control name="firstName" type="text" value={this.state.userInfo.firstName} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg="6" className='input-col'>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control name="lastName" type="text" value={this.state.userInfo.lastName} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg="6" className='input-col'>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name="email" type="text" value={this.state.userInfo.email} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col lg="6" className='input-col'>
                                    <Form.Group controlId="phone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control name="phone" type="text" value={this.state.userInfo.phone} onChange={this.handleInputChange} />
                                    </Form.Group>
                                </Col>

                            </Row>

                        </Form>

                        <article id='profile-description-form-section'>
                            <h2 className="editor-section-title">Profile Description</h2>
                            <Container >
                                <RichText
                                    {...this.props}
                                    profileDescription={this.state.userInfo.profileDescription}
                                    type='profile'
                                    handleProfileChange={this.handleProfileChange}
                                />
                            </Container>
                        </article>

                    </Col>
                </Row>

            </section>
        )
    }
}

export default UserInfo