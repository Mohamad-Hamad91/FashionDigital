import React, { useState } from 'react'
import "../../App.css"
const SizeFilter = ({items, getItems}) => {

    const [size, setSize] = useState("")

    const onChange = (q) => {
        let filteredProducts = []

        items.map(item => {
             if(item.sizes && item.sizes.includes(q)) {
                filteredProducts.push(item)
            }  
        })
        if (filteredProducts.length > 0 ) {

            setSize(q)
            getItems(filteredProducts)

        }

    }
    return (
        <div >
            <label> Select size: </label>
            <select onChange={(e) => onChange(e.target.value)}>
                <option ></option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>



            </select>
        </div>
    )
}


export default SizeFilter
