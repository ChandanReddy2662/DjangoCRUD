import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditProdcut from './../../components/EditProduct'

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
            <h1>Grocery Management</h1>
            <div>
              <EditProdcut handleSubmit={handleSubmit} handleChange={handleChange} />
            </div>
        </div>
     )
}
