import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import RichText from '../../../../slate-editor/RichText'

class ProfileDescription extends Component {

    constructor(props) {
        super(props)
        this.state = { description: this.props.description}
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({description: this.props.description})

    handleProfileChange = value => {
        this.setState({description: value}, () => this.props.updateCVInfo())
        const newProfileInfo = {...this.state.cvInfo.userInfo, profileDescription: value}
        this.setState({ cvInfo: { ...this.state.cvInfo, userInfo: newProfileInfo } }, () => {this.props.updateCVInfo(this.state.cvInfo)})
    }

    render() {
        return (
            <Container>
                <h2 className="editor-section-title">Profile Description</h2>
                <RichText
                    {...this.props}
                    cvInfo={this.props.cvInfo}
                    updateCVInfo={this.props.updateCVInfo}
                    type='profile'
                    handleProfileChange={this.handleProfileChange}
                />
            </Container>
        )
    }
}

export default ProfileDescription
