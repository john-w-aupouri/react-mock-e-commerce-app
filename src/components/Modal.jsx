import React, { Component } from 'react'
import styled from 'styled-components'
import { ProductConsumer } from '../context'
import { ButtonContainer } from "./ButtonContainer"
import { Link } from 'react-router-dom'

class Modal extends Component {
  render() { 
    return (
      <ProductConsumer>
        {value => {
          const { modalOpen, closeModal } = value
          const { img, title, price } = value.modalProduct

          if(!modalOpen) {
            return null
          } else {
            return(
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    {/* 4 cols wide on large screen and 6 cols wide on medium screen */}
                    <div id="modal" className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5">
                      <h5 style={{color: "white"}}>added to cart</h5>
                      <img src={img} className="img-fluid" alt="product" />
                      <h5>{title}</h5>
                      <h5 className="text-muted">price : $ {price}</h5>
                      <Link to="/">
                        <ButtonContainer onClick={() => closeModal()}>
                          store
                        </ButtonContainer>
                      </Link>
                      <Link to="cart">
                        <ButtonContainer cart onClick={() => closeModal()}>
                          go to cart
                        </ButtonContainer>
                      </Link> 
                    </div>
                  </div>
                </div>
              </ModalContainer>
            )
          }
        }}
      </ProductConsumer>
    )
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  #modal{
    background: snow;
  }
`;
 
export default Modal