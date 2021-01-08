import React from 'react'
import "./home.scss"
import {Link} from "react-router-dom"

function Home(props) {
    return (
        <div className="start-page">
           <h1>Quiz Time!</h1>
           <p>Click the button to get started</p>
          <Link to="/start/form"><button>Let's Start</button></Link> 
        </div>
    )
}

export default Home
