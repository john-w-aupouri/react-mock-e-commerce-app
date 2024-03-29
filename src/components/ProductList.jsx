import React, { Component } from 'react'
import Product from './Product'
import Title from './Title'
import {ProductConsumer} from '../context'

export default class ProductList extends Component {
  
  render() {
    return (
      <>
        <div className="py-5">
          <div className="container">
            <Title name="the" title="products" />
            <div className="row" style={{textAlign: "center"}}>
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />
                  })
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </>
    )
  }
}
