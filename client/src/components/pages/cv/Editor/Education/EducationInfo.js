import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import EducationInfoForm from './EducationInfoForm'
import CVService from '../../../../../service/cv.service'
import { mouseEnterAddButton, mouseLeaveAddButton } from '../../../../../clientEvents/editorEvents'


class EducationInfo extends Component {

    constructor(props) {
        super(props)
        this.state = { education: this.props.education }
        this.cvService = new CVService()
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ education: this.props.education })


    updateEducationInfo = (index, info) => {
        const newEducationInfo = [...this.state.education]
        newEducationInfo[index] = info
        this.setState({ education: newEducationInfo }, () => {
            this.props.updateCVInfo(this.state.education, 'education')
        })
    }

    render() {

        return (

            <section className='editor-form-section'>

                <Col lg={{ span: 10, offset: 1 }}>
                    <h2 className="editor-section-title">Education Info</h2>
                </Col>
                {this.state.education && this.state.education.map((education, index) =>
                    <EducationInfoForm
                        {...this.props}
                        education={education}
                        key={index}
                        index={index}
                        updateEducationInfo={this.updateEducationInfo}
                        deleteElement={this.props.deleteElement}
                    />)}
                <Container>
                    <Col lg={{ offset: 1 }}>
                        <p
                            id="add-education-button"
                            className='add-item-button'
                            onClick={() => this.props.createNewElement('education')}
                            onMouseEnter={() => mouseEnterAddButton('education')}
                            onMouseLeave={() => mouseLeaveAddButton('education')}
                        >+ Add Education
                        </p>
                    </Col>
                </Container>

            </section>

        )
    }
}

export default EducationInfo