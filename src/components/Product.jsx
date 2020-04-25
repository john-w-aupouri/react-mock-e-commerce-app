import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../context'
import { ProductWrapper } from './ProductWrapper'
import PropTypes from 'prop-types'

export default class Product extends Component {
  render() {
    const {id, title, img, price, inCart} = this.props.product

    return (
      <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <ProductConsumer>
          {value => (
            <div 
              className="img-container p-0.5" 
              onClick={() => value.handleDetail(id)}>
              <Link to="/details">
                <img 
                  src={img} 
                  // style={{width: "15.5rem", height: "15.5rem"}} 
                  alt="product" 
                  className="card-img-top" 
                />
              </Link>
              <button 
                className="cart-btn" 
                disabled={inCart ? true : false} 
                onClick={() => {
                  value.addToCart(id)
                  value.openModal(id)
                }} 
              >
              {/* if product is in the cart or not */}
              {inCart ? (
                <p className="text-capitalize mb-0" disabled>
                  {" "}
                  in cart
                </p>
                ):(
                <i className="fas fa-cart-plus" />)
              }
              </button> 
            </div>
          )}   
          </ProductConsumer>
        </div>          
        {/* card footer */}
        <div className="card-footer d-flex justify-content-between">
          <p className="align-self-center mb-0">{title}</p>
          <h5 className="text-blue font-italic mb-0">${price}</h5>
        </div>
      </ProductWrapper>
    )
  }
}

Product.protoTypes = {
  // since this is an object property need to use a colean
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  }).isRequired
}
