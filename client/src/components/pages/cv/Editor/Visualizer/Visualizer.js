import React, { Component } from 'react'
import UserService from '../../../../../service/user.service'
import CVService from '../../../../../service/cv.service'
import Apollo from '../../Models/Apollo/Apollo'
import Blue from '../../Models/Blue/Blue'


const  Visualizer = (props) => {

    switch (props.cvInfo.name) {
        case 'Apollo':
            return <Apollo cvInfo={props.cvInfo} />

        case 'Blue':
            return <Blue cvInfo={props.cvInfo} />
        
        default:
            break;
    }
}

export default Visualizer
