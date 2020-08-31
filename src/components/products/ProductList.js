import React from 'react'
import Product from "./Product"
import Spinner from "../ui/Spinner"

const  ProductList =  ({items, isLoading}) => {
    return isLoading ? (<Spinner />)
                     : (<section className="cards">
                         {items.map(item => (
                             <Product key={item.id} item= {item}></Product>
                         ))}
                     </section>)
}

export default ProductList
