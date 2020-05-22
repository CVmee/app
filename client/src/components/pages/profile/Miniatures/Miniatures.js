import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Apollo from './apollo.png'
import Hermes from './hermes.png'



const Miniatures = (props) => {
    console.log(props.model)

    switch (props.model) {
        case 'Apollo':
            return <img src={Apollo} alt="Apollo model"/>
    
        case 'Hermes':
           return <img src={Hermes} alt="Hermes model" />

        default:
            return <></>
    }
}



export default Miniatures