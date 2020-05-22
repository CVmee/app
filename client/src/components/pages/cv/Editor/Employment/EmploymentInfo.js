import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import EmploymentInfoForm from './EmploymentInfoForm'
import CVService from '../../../../../service/cv.service'
import { mouseEnterAddButton, mouseLeaveAddButton } from '../../../../../clientEvents/editorEvents'


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

    render() {
        return (
            <section className='editor-form-section'>

                <Col lg={{ span: 10, offset: 1 }}>
                    <h2 className="editor-section-title">Employment Info</h2>
                </Col>
                {this.state.employment && this.state.employment.map((employment, index) =>
                    <EmploymentInfoForm
                        {...this.props}
                        employment={employment}
                        key={index}
                        index={index}
                        updateEmploymentInfo={this.updateEmploymentInfo}
                        deleteElement={this.props.deleteElement}
                    />)}
                <Container>
                    <Col lg={{ offset: 1 }}>
                        <p
                            id="add-employment-button"
                            className='add-item-button'
                            onClick={() => this.props.createNewElement('employment')}
                            onMouseEnter={() => mouseEnterAddButton('employment')}
                            onMouseLeave={() => mouseLeaveAddButton('employment')}
                        >+ Add Employment
                        </p>
                    </Col>
                </Container>

            </section>
        )
    }
}

export default EmploymentInfo