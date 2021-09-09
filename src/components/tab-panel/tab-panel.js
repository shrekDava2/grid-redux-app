import React        from 'react'
import { Link }     from 'react-router-dom'

import './tab-panel.css'

const TabPanel = ({ data, name }) => {

  const items   = data.map((item,idx) => {
      const active  = name === item ? 'active' : ''
      return (
            <li 
              key         = { idx } 
              className   = "nav-item">
                <Link   
                    className   = { `nav-link ${ active }` }
                    to          = { `/${item}` }
                >
                      { item }
                </Link>
            </li>
          )
  })
  return (
      <div className="header-my">
          <ul className="nav nav-tabs">
              { items }
          </ul>
      </div>
    )
  }  
export default TabPanel
