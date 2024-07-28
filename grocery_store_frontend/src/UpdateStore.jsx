import axios from 'axios'
import React, { useEffect, useInsertionEffect, useState } from 'react'

function Product({name, price, quantity, product_id}){

}

export default function UpdateStore() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetch(){
            const response = await axios.get('http://localhost:8000/products', {
                params:{username: 'admin'}
            })
            
        setProducts(response.data)
        }
        fetch()
    }, [])
    return (
        <div>
            <h1>Update Store</h1>
            <div>

            </div>
        </div>
     )
}
