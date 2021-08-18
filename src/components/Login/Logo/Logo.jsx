import React from 'react'
import LogoURS from './../../../images/logo.png'

import './logo.css'

const Logo = () => {
  return (
    <div className ='logo-container'> 
      <img
                src={LogoURS}
                border="1"
                alt="LOGO"
                width="310px"
                height="95px"
              />  
    </div>
  )
}

export default Logo;
