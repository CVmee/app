import React from 'react'
import Navigation from '../../ui/navbar/Navbar'


const Home = (props) => {

    return (
        <>
            <Navigation setTheUser={props.setTheUser} loggedInUser={props.loggedInUser} />
            <h1>Home</h1>
        </>
    )
}

export default Home