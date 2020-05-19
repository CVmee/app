import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import SkillsInfoForm from './SkillsInfoForm'
import CVService from '../../../../../service/cv.service'

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

    // createSkillItem = () => {
    //     this.cvService.createSkill(this.state.cvInfo)
    //         .then(response => this.setState({ cvInfo: response.data }))
    //         .catch(error => console.log(error))
    // }

    // deleteSkillItem = (itemID) => {
    //     this.cvService.deleteSkill(this.state.cvInfo._id, itemID)
    //         .then(response => {
    //             this.setState({ cvInfo: response.data })
    //             this.props.updateCVInfo(this.state.cvInfo)
    //         })
    //         .catch(error => console.log(error))
    // }

    render() {
        return (
            <Container>
                <h2 className="editor-section-title">Skills</h2>
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
                    {/* <Button id="add-skill-button" onClick={this.createSkillItem}>+ Add Skill</Button> */}
                    <Button id="add-skill-button" onClick={() => this.props.createNewElement('skill')}>+ Add Skill</Button>
                </Container>
            </Container>
        )
    }
}

export default SkillsInfo