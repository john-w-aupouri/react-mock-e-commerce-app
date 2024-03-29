import React from 'react'
import { Link } from 'react-router-dom'
import PayPalBtn from './PayPalBtn'

export default function cartTotals({value, props}) {
  const{ cartTotal, cartTax, cartSubTotal, clearCart } = value
  return (
    <>
      <div className="container">
        <div className="row">
          <div 
            className="col-10 mt-2 ml-auto col-sm-8 text-capitalize-text-right">
            <Link to="/">
              <button 
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                  type="button"
                  onClick={() => clearCart()}
                >
                  clear cart
              </button>
            </Link>
          
              <h5>
                <span className="text-title">
                sub total : 
                <strong>$ {cartSubTotal} </strong>
                </span>
              </h5>
              <h5>
                <span className="text-title">
                gst 15% :
                <strong>$ {cartTax} </strong>
                </span>
              </h5>
              <h5>
                <span className="text-title">
                total : 
                <strong>$ {cartTotal} </strong>
                </span>
              </h5>
              <br />
              <PayPalBtn 
                total={cartTotal} 
                clearCart={clearCart}
                // history={history}
              />
          </div>
        </div>
      </div>
    </>
  )
}
