import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import EmploymentInfoForm from './EmploymentInfoForm'
import CVService from '../../../../../service/cv.service'


class EmploymentInfo extends Component {

    constructor(props) {
        super(props)
        this.state = { employment: this.props.employment }
        this.cvService = new CVService()
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({ employment: this.props.employment })

    updateEmploymentInfo = (index, info) => {
        const newEmploymentInfo = [...this.state.employment]
        newEmploymentInfo[index] = info
        this.setState({ employment: newEmploymentInfo }, () => {
            this.props.updateCVInfo(this.state.employment, 'employment')
        })
    }

    // createEmploymentItem = () => {
    //     this.cvService.createEmployment(this.props.cvID)
    //         .then(response => {
    //             this.setState({ employment: response.data.employment }, () => {
    //                 this.props.updateCVInfo(this.state.employment, 'employment')
    //             })
    //         })
    //         .catch(error => console.log(error))
    // }

    // deleteEmploymentItem = (itemID) => {
    //     this.cvService.deleteEmployment(this.props.cvID, itemID)
    //         .then(response => {
    //             this.setState({ employment: response.data.employment }, () => {
    //                 this.props.updateCVInfo(this.state.employment, 'employment')
    //             })
    //         })
    //         .catch(error => console.log(error))
    // }

    render() {
        return (
            <Container>
                <h2 className="editor-section-title">Employment Info</h2>
                {this.state.employment && this.state.employment.map((employment, index) =>
                    <EmploymentInfoForm
                        {...this.props}
                        employment={employment}
                        key={index}
                        index={index}
                        updateEmploymentInfo={this.updateEmploymentInfo}
                        // deleteEmploymentItem={this.deleteEmploymentItem}
                        deleteElement={this.props.deleteElement}
                    />)}
                <Container>
                    {/* <Button id="add-employment-button" onClick={this.createEmploymentItem}>+ Add Employment</Button> */}
                    <Button id="add-employment-button" onClick={() => this.props.createNewElement('employment')}>+ Add Employment</Button>
                </Container>
            </Container>
        )
    }
}

export default EmploymentInfo