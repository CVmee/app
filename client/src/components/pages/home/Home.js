import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ResumeExample from './img/resume-example.png'
import {Link} from 'react-router-dom'
import './Home.css'

const Home = (props) => {

    return (
        <>
            <main id='home-main'>
                <h1>Build your own CV</h1>
                <article id='specs'>
                    <h2>Simple.</h2>
                    <h2>Quick.</h2>
                    <h2><span className='underscore'>Free.</span></h2>
                </article>
                {props.loggedInUser
                    ? <Link to='/profile'><Button variant='warning'>Profile</Button></Link>
                    : <Link to='/signup'><Button variant='warning'>Sign Up</Button></Link>}
                <Col lg={{span: 4, offset: 4}}><img src={ResumeExample} alt="Resume Example" /></Col>
            </main>
        </>
    )
}

export default Home