import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonContainer } from "./ButtonContainer"
import '../App.css'
import Logo from './Logo'

export default class NavBar extends Component {
  render() {
    return (

      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">  
        <Logo />
        
        <ul className="navbar-nav align-items-center">
          <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            <i className="fas fa-cart-plus" />
            {' '}
            Shop
          </Link>
          </li>   
        </ul>
        <Link to="/cart" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span> 
            My Cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    )
  }
}

const NavWrapper = styled.nav`
  background: var(--mainWhite);
  .nav-link{
    color:var(--mainDark)!important;
    font-size:1.3rem
    text-transform: capitalize;
  }
  .buttonContainer {}
`