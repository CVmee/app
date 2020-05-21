import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import LinksInfoForm from './LinksInfoForm'
import CVService from '../../../../../service/cv.service'
import { mouseEnterAddButton, mouseLeaveAddButton } from '../../../../../clientEvents/editorEvents'


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

    render() {
        return (

            <section className='editor-form-section'>

                <Col lg={{ span: 10, offset: 1 }}>
                    <h2 className="editor-section-title">Links</h2>
                </Col>

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
                    <Col lg={{ offset: 1 }}>
                        <p
                            id="add-link-button"
                            className='add-item-button'
                            onClick={() => this.props.createNewElement('link')}
                            onMouseEnter={() => mouseEnterAddButton('link')}
                            onMouseLeave={() => mouseLeaveAddButton('link')}
                        >+ Add Link
                        </p>
                    </Col>
                </Container>

            </section>
        )
    }
}

export default LinksInfo