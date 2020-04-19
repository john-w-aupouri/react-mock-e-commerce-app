import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa'

const Logo = () => {
  return (
    <div className="logo-outer-wrapper">
      <div className="logo">
        <div className="logo-inner-wrapper">
          <div style={{color: "purple"}}><FaChevronLeft /></div>
          <div className="john">John</div>
          <div className="at">@</div>
          <div className="web">Web</div>
          <div className="dev">DEV</div>
          <p style={{color: "purple", fontWeight: "bold"}}>/</p>
          <div className="right-arrow"><FaChevronRight /></div>
        </div>
      </div >
    </div>
  )
}

export default Logo
