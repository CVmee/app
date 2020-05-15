import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import LinksInfoForm from './LinksInfoForm'

import UserService from '../../../../../service/user.service'
import { Switch, Route, Link, Redirect } from 'react-router-dom'

class LinksInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.loggedInUser,
            cvInfo: this.props.cvInfo,
            linksInfo: this.props.cvInfo.links,
            // userAction: 'edition'
        }
        this.userService = new UserService()
        // this.cvService = new UserService()
    }

    updateLinksInfo = (index, info) => {
        console.log('before')
        console.log(this.state.linksInfo)
        console.log('after')
        console.log(this.state.linksInfo)
        this.state.linksInfo[index] = info
        const newLinksInfo = this.state.linksInfo
        this.state.cvInfo = { ...this.state.cvInfo, links: newLinksInfo }
        console.log('THIS IS THE NEW STATE')
        console.log(this.state.cvInfo);
        this.props.updateCVInfo(this.state.cvInfo)
    }

    render() {
        return (
            <Container>
                {/* <h1 id="editor-user-title">{this.state.cvInfo.title}, {this.state.cvInfo.firstName} {this.state.cvInfo.lastName}</h1>            */}
                <h2 className="editor-section-title">Links</h2>
                {this.state.linksInfo.map((link, index) =>
                    <LinksInfoForm
                        {...this.props}
                        {...this.state.cvInfo}
                        // updateCVInfo={this.props.updateCVInfo}
                        link={link}
                        key={index}
                        index={index}
                        updateLinksInfo={this.updateLinksInfo}
                    />)}
            </Container>
        )
    }
}

export default LinksInfo