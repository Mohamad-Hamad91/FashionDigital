import React from 'react'

const Product = ({ item }) => {
  return (
    <div className='card'>
      <div >
        <div>
          <h1> {item.brand} </h1>
          <p> {item.description} </p>
          <img src={item.images[0]} alt='' />
          <p> <span>{item.priceO} €</span></p>
        </div>

      </div>
    </div>
  )
}

export default Product
