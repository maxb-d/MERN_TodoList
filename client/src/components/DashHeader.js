import React from 'react'

import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const DashHeader = () => {
  const content = (
        <div className='dash-header__container'>
            <Link to="/dash">
                <button className='dash-header__home'><FaHome size={24}/></button>
            </Link>
            
            <nav className='dash-header__nav'>
                <Link to="/dash/notes">
                    <h4>Notes</h4>
                </Link>
                <Link to="/dash/todos">
                    <h4>Todos</h4>
                </Link>
                <Link to="/dash/counter">
                    <h4>Counter</h4>
                </Link>
            </nav>
        </div>
  )

  return content
}

export default DashHeader