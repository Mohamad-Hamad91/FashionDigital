import React, { useState, useEffect } from 'react'
import '../../App.css';
import ProductList from "./ProductList"
import SizeFilter from "../ui/SizeFilter"
import PriceFilter from "../ui/PriceFilter"


const Home = () => {

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newItems, setNewItems] = useState([])

    useEffect(() => {
        if (newItems.length > 0) {
            setItems(newItems)
            setIsLoading(false)
        } else {
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = "https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json"
            fetch(proxyurl + url)
                .then((result) => result.json())
                .then(function (result) {
                    setItems(result)
                    setIsLoading(false)
                })
        }

    }, [newItems])
    const priceSort = () => {

        let temp = items
        let temp1 = []
        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < temp.length - i - 1; j++) {
                if (temp[j].priceO > temp[j + 1].priceO) {
                    temp1 = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = temp1;
                }
            }
        }
        setNewItems(temp)
    }
    const cheaperBrandChoice = () => {
        let brands = []
        let count = []
        let max = 0
        let cheaperbrand = ""

        // counting the brands that has the most products that cost less than 40 €
        items.map(elem => {
            if (elem.priceO < 40) {
                if (!brands.includes(elem.brand)) {
                    brands.push(elem.brand)
                    count.push(1)
                } else {
                    let index = brands.map(function (e) { return e }).indexOf(elem.brand)
                    count[index] = count[index] + 1
                }
            }
        })
        // looking for the index of the min number of counts
        let i;
        let index
        for (i = 0; i <= count.length; i++) {
            if (count[i] > max) {
                max = count[i]
                index = i
            }
        }

        cheaperbrand = brands[index] // the brand that have most products that cost less than 40 €

        // the new list of Products whith the selected brand 
        let cheaperBrandProducts = []
        items.map(elem => {
            if (elem.brand === cheaperbrand) {
                cheaperBrandProducts.push(elem)
            }
        })
        setNewItems(cheaperBrandProducts)
    }
    const largestSizeSelection = () => {
        let brands = []
        let count = []
        let max = 0
        let largestSizeBrand = ""
        let largestSizeSelectionBrandProducts = []

        // counting the brands that has the largest selection of sizes to the customer
        items.map(elem => {
            if (elem.sizes.length > 0) {
                if (!brands.includes(elem.brand)) {
                    brands.push(elem.brand)
                    count.push(elem.sizes.length)
                } else {
                    let index = brands.map(function (e) { return e }).indexOf(elem.brand)
                    if (count[index] < elem.sizes.length)
                        count[index] = elem.sizes.length
                }
            }
        })
        // looking for the index of the max number of counts
        let i;
        let index
        for (i = 0; i <= count.length; i++) {
            if (count[i] > max) {
                max = count[i]
                index = i
            }
        }

        largestSizeBrand = brands[index] // the brand that has the largest selection of sizes to the customer


        // the new list of Products whith the selected brand 
        items.map(elem => {
            if (elem.brand === largestSizeBrand) {
                largestSizeSelectionBrandProducts.push(elem)
            }
        })
        setNewItems(largestSizeSelectionBrandProducts) 
    }

    const recommendedSize = () => {
        let brands = []
        let count = []
        let prices = []
        let recommendedSizeBrand = ""
        let recommendedSizeBrandProducts = []

        // counting the brands that have the lowest average price for customers wearing size "32"
        items.map(elem => {
            if (elem.sizes.includes("32") ) {
                if (!brands.includes(elem.brand)) {
                    brands.push(elem.brand)
                    count.push(1)
                    prices.push(elem.priceO)
                } else {
                    let index = brands.map(function (e) { return e }).indexOf(elem.brand)
                    
                        count[index] = count[index] + 1
                        prices[index] = prices[index] + elem.priceO

                }
            }
        })

         let i;
        let index
        let average = prices[0]
        for (i = 1; i <= count.length; i++) {
            let temp = (prices[i] / count[i]) 
            if (temp < average) {
                average = temp
                index = i
            }
        }

        recommendedSizeBrand = brands[index] // the brand that has lowest average price for customers wearing size "32"


        // the new list of Products whith the selected brand 
        items.map(elem => {
            if (elem.brand === recommendedSizeBrand) {
                recommendedSizeBrandProducts.push(elem)
            }
        })
        setNewItems(recommendedSizeBrandProducts)  
    }
    return (
        <div className="container">
            <ui className="listBlock">
                <li >
                    <SizeFilter items={items} getItems={(q) => setNewItems(q)} />
                </li>
                <li>
                    <button className="btn" onClick={priceSort}> sort by price </button>
                </li>
                <li>
                    <button className="btn" onClick={cheaperBrandChoice}> cheaper brand </button>
                </li>
                <li>
                    <button className="btn" onClick={largestSizeSelection}> largest sizeselection brand </button>
                </li>
                <li>
                    <button className="btn" onClick={recommendedSize}> recommended for size "32" </button>
                </li>
            </ui>
            <ProductList isLoading={isLoading} items={items} />
        </div>
    )
}

export default Home
