import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = React.createContext()

// Provider
class ProductProvider extends Component {
  state = {
    products: [], // this empty array will become populated with a copy of storeProducts after componentDidMount fires
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal:10,
    cartTax: 0,
    cartTotal: 0
  }
  
  componentDidMount() {
    this.setProducts()
  }

  // IMPORTANT!! To be able to always use original data values, create a copy so as to not reference original data
  setProducts = () => {
    // Create empty array to store incoming data.
    let cloneOfProducts = []
    // Loop through the array coming from './data' returning an array of objects.
    storeProducts.forEach(item => {
      const singleItem = {...item}
      cloneOfProducts = [...cloneOfProducts, singleItem] 
    })
    // Then clone the value creating a new variable equal to an onbject with the previously returned value spread into it.
    this.setState(() => {
      return {products: cloneOfProducts}
    })
  }

  handleDetail = () => {
    console.log('hello from detail')
  }

  // utility method that will get item by id
  getItem = id => {
    const product = this.state.products.find(item => item.id === id)
    return product
  }

  // called when whatever img in ProductList is clicked to Link to the deatials of said img
  handleDetail = (id) => {
    const product = this.getItem(id)
    this.setState(() => {
      return {detailProduct: product}
    })
  }

  addToCart = id => {
    // destructrue products in state into an array then find the index IMPORTANT!
    let cloneOfProducts = [...this.state.products]
    // need to create an index IMPORTANT! find using indexOf method in con-junction with the getItem method
    const index = cloneOfProducts.indexOf(this.getItem(id))
    const product = cloneOfProducts[index]

    product.inCart = true
    product.count = 1
    const price = product.price
    product.total = price

    // change values in state
    this.setState(
      () => {
        return { products: cloneOfProducts, cart 
        : [...this.state.cart, product ]}
      }
      // () => {this.addTotals()}
    )
  }

  openModal = id => {
    // retrieve product via getItem method
    const product = this.getItem(id)
    this.setState(() => {
      return { modalProduct: product, modalOpen: true }   
    })
  }
  
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false }
    })
  }


  // CART METHODS
  increment = id => {
    // get cart from state
    let cloneOfCart = [...this.state.cart]
    // get specific item
    const selectedProduct = cloneOfCart.find(item => item.id === id)
    // get index of item
    const index = cloneOfCart.indexOf(selectedProduct)
    const product = cloneOfCart[index]

    product.count = product.count + 1
    product.total = product.count * product.price

    this.setState(() => {return{cart:[...cloneOfCart]}}, () => {this.addTotals()})
  }

  decrement = id => {
    // get cart from state
    let cloneOfCart = [...this.state.cart]
    // get specific item
    const selectedProduct = cloneOfCart.find(item => item.id === id)
    const index = cloneOfCart.indexOf(selectedProduct)
    // get index of item
    const product = cloneOfCart[index]

    product.count = product.count - 1

    if(product.count === 0) {
      this.removeItem(id)
    } else {
      product.total = product.count * product.price
      this.setState(() => {return{cart:[...cloneOfCart]}}, () => {this.addTotals()})
    }
  }

  removeItem = id => {
    // create temporary arrays to get products and cart from state
    let cloneOfProducts = [...this.state.products]
    let cloneOfCart = [...this.state.cart]

    // filter to find item without id
    cloneOfCart = cloneOfCart.filter(item => item.id !== id)

    // get the index of the product in the cloneOfProduct array
    const index = cloneOfProducts.indexOf(this.getItem(id))
    let removedProduct = cloneOfProducts[index]
    removedProduct.inCart = false
    removedProduct.count = 0
    removedProduct.total = 0

    this.setState(() => {
      return {
        cart: [...cloneOfCart],
        products: [...cloneOfProducts]
      }
    },() => {
      this.addTotals()
    })
  }

  clearCart = () => {
    this.setState(() => {
      return { cart: [] }
    },() => {
      this.setProducts()
      this.addTotals()
    })
  }
  
  addTotals = () => {
    let subTotal = 0 // use this to collect all the values
    this.state.cart.map(item => (subTotal += item.total)) // each item will have a total prop
    const tempTax = subTotal * 0.15 // 15% tax rate 
    const tax = parseFloat(tempTax.toFixed(2)) // toFixed means how many decimals
    const total = subTotal + tax
    this.setState(
      () => {
        return {
          cartSubTotal: subTotal, 
          cartTax: tax,
          cartTotal: total
        }
      })
  }

  render() { 
    return (
      <ProductContext.Provider 
        value={{
          ...this.state,
          handleDetail: this.handleDetail, // called in the Product Component
          addToCart: this.addToCart, // called in the Product Component
          openModal: this.openModal, // called in the Product and Details Component
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

// Consumer
const ProductConsumer = ProductContext.Consumer
export { ProductProvider, ProductConsumer }