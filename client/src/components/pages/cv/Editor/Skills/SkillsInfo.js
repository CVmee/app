import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import SkillsInfoForm from './SkillsInfoForm'
import CVService from '../../../../../service/cv.service'
import { mouseEnterAddButton, mouseLeaveAddButton } from '../../../../../clientEvents/editorEvents'


class SkillsInfo extends Component {

    constructor(props) {
        super(props)
        this.state = { skills: this.props.skills }
        this.cvService = new CVService()
    }

    componentDidUpdate = (prevProps) => prevProps !== this.props && this.setState({skills: this.props.skills})

    updateSkillsInfo = (index, info) => {
        const newSkillsInfo = [...this.state.skills]
        newSkillsInfo[index] = info
        this.setState({ skills: newSkillsInfo }, () => {
            this.props.updateCVInfo(this.state.skills, 'skills')
        })
    }


    render() {
        return (
            <section className='editor-form-section'>
                
                <Col lg={{ span: 10, offset: 1 }}>
                    <h2 className="editor-section-title">Skills</h2>
                </Col>

                {this.state.skills && this.state.skills.map((skill, index) =>
                    <SkillsInfoForm
                        {...this.props}
                        skill={skill}
                        key={index}
                        index={index}
                        updateSkillsInfo={this.updateSkillsInfo}
                        deleteSkillItem={this.deleteSkillItem}
                    />)}
                
                <Container>
                    <Col lg={{ offset: 1 }}>
                        <p
                            id="add-skill-button"
                            className='add-item-button'
                            onClick={() => this.props.createNewElement('skill')}
                            onMouseEnter={() => mouseEnterAddButton('skill')}
                            onMouseLeave={() => mouseLeaveAddButton('skill')}
                        >+ Add Skill
                        </p>
                    </Col>
                </Container>
                
            </section>
        )
    }
}

export default SkillsInfo