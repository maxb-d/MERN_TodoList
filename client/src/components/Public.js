import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
  const content = (
    <div>
        <h1>Hey,</h1>
        <h4>We're happy to see you again !</h4>
        <p>You need to log in to use the awesome features of our website, it happens right there below.</p>
        <Link to="/login">
            <button>Login</button>
        </Link>
    </div>
  )
  return content
}

export default Public
