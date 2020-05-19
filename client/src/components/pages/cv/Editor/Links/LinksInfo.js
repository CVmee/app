import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import LinksInfoForm from './LinksInfoForm'
import CVService from '../../../../../service/cv.service'

class LinksInfo extends Component {

    constructor(props) {
        super(props)
        this.state = { links: this.props.links }
        this.cvService = new CVService()
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ links: this.props.links })

    updateLinksInfo = (index, info) => {
        console.log('this gets executed and gets the following info: ', info)
        const newLinksInfo = [...this.state.links]
        newLinksInfo[index] = info
        this.setState({ links: newLinksInfo }, () => {
            this.props.updateCVInfo(this.state.links, 'links')
        })
    }

    // createLinkItem = () => {
    //     this.cvService.createLink(this.state.cvInfo)
    //         .then(response => this.setState({ cvInfo: response.data }))
    //         .catch(error => console.log(error))
    // }

    // deleteLinkItem = (itemID) => {
    //     this.cvService.deleteLink(this.state.cvInfo._id, itemID)
    //         .then(response => {
    //             this.setState({ cvInfo: response.data })
    //             this.props.updateCVInfo(this.state.cvInfo)
    //         })
    //         .catch(error => console.log(error))
    // }

    render() {
        return (
            <Container>
                <h2 className="editor-section-title">Links</h2>
                {this.state.links && this.state.links.map((link, index) =>
                    <LinksInfoForm
                        {...this.props}
                        link={link}
                        key={index}
                        index={index}
                        updateLinksInfo={this.updateLinksInfo}
                        deleteLinkItem={this.deleteLinkItem}
                    />)}
                <Container>
                    {/* <Button id="add-link-button" onClick={this.createLinkItem}>+ Add Link</Button> */}
                    <Button id="add-link-button" onClick={() => this.props.createNewElement('link')}>+ Add Link</Button>
                </Container>
            </Container>
        )
    }
}

export default LinksInfo