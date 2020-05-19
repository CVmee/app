import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import EducationInfoForm from './EducationInfoForm'
import CVService from '../../../../../service/cv.service'


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

    // createEducationItem = () => {
    //     this.cvService.createEducation(this.props.cvID)
    //         .then(response => {
    //             this.setState({ education: response.data.education }, () => {
    //                 this.props.updateCVInfo(this.state.education, 'education')
    //             })
    //         })
    //         .catch(error => console.log(error))
    // }

    // deleteEducationItem = (itemID) => {
    //     this.cvService.deleteEducation(this.props.cvID, itemID)
    //         .then(response => {
    //             this.setState({ education: response.data.education }, () => {
    //                 this.props.updateCVInfo(this.state.education, 'education')
    //             })
    //         })
    //         .catch(error => console.log(error))
    // }

    render() {

        return (
            <Container>
                <h2 className="editor-section-title">Education Info</h2>
                {this.state.education && this.state.education.map((education, index) =>
                    <EducationInfoForm
                        {...this.props}
                        education={education}
                        key={index}
                        index={index}
                        updateEducationInfo={this.updateEducationInfo}
                        // deleteEducationItem={this.deleteEducationItem}
                        deleteElement={this.props.deleteElement}
                    />)}
                <Container>
                    {/* <Button id="add-education-button" onClick={this.createEducationItem}>+ Add Education</Button> */}
                    <Button id="add-education-button" onClick={() => this.props.createNewElement('education')}>+ Add Education</Button>
                </Container>
            </Container>
        )
    }
}

export default EducationInfo