import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Navigation from '../../ui/navbar/Navbar'
import { Link, Redirect } from 'react-router-dom'
import UserService from '../../../service/user.service'
import CVService from '../../../service/cv.service'
import RichText from '../../slate-editor/RichText'

class UserDetails extends Component {

    constructor(props) {
        super(props)
        this.state = { userInfo: this.props.userInfo }
        this.userService = new UserService()
        this.cvService = new CVService()
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ userInfo: this.props.userInfo })

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ userInfo: { ...this.state.userInfo, [name]: value } }, () => {
            this.userService.updateProfile(this.state.userInfo._id, this.state.userInfo)
        })
    }

    handleFileUpload = event => {
        const uploadData = new FormData()
        uploadData.append('profilePicture', event.target.files[0])
        this.userService.updateProfilePicture(this.props.match.params.id, uploadData)
            .then(response => {
                this.setState({ userInfo: { ...this.state.userInfo, profilePicture: response.data } }, () => {
                    this.userService.updateProfile(this.state.userInfo._id, this.state.userInfo)
                })
            })
            .catch(error => console.log(error))
    }



    handleProfileChange = value => {
        this.setState({ userInfo: { ...this.state.userInfo, profileDescription: value } }, () => {
            this.userService.updateProfile(this.state.userInfo._id, this.state.userInfo)
        })
    }



    render() {

        console.log('Esto es el state de UD -----', this.state)

        return (
            <>
                {this.state.userInfo &&
                    <Container>

                        <Row>
                            <Col md={{ span: 4, offset: 4 }}>

                                <h3>Complete your Profile</h3>
                                <hr></hr>
                                <Form >

                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name="email" type="text" value={this.state.userInfo.email} onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control name="firstName" type="text" value={this.state.userInfo.firstName} onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control name="lastName" type="text" value={this.state.userInfo.lastName} onChange={this.handleInputChange} />
                                    </Form.Group>

                                    <Form.Group controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="title" type="text" value={this.state.userInfo.title} onChange={this.handleInputChange} />
                                </Form.Group>
                                
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

                                    </Col>
                                </Row>

                                    <Form.Group controlId="profileDescription">
                                        <RichText
                                            {...this.props}
                                            profileDescription={this.state.userInfo.profileDescription}
                                            type='profile'
                                            handleProfileChange={this.handleProfileChange}
                                        />
                                    </Form.Group>

                                    <p
                                        className='error-message'
                                        style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                                    >
                                        {this.state.errorMessage}
                                    </p>

                                <Link to='/profile'><Button variant="dark">Back to Profile</Button></Link>
                                </Form>

                            </Col>
                        </Row>

                    </Container>
                }
            </>
        )
    }
}


export default UserDetails