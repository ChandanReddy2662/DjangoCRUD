import React, { useState } from "react"
export default function CartItem({name, price, quantity, image, product_id}){
    const [count, setCount] = useState(quantity)
    const incrementQuantity = () => {
      setCount(count + 1)
    }
  
    const decrementQuantity = () => {
      setCount(count - 1)
    }
    const removeFromCart = () => {
  
    }
    return (
      <div className="flex justify-between items-center border-b border-gray-300 p-4 w-full bg-white rounded-lg shadow-md mb-4" key={product_id}>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-700">Price: ${price}</p>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => decrementQuantity(product_id)} 
              className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            >
              -
            </button>
            <p className="text-gray-700">{count}</p>
            <button 
              onClick={() => incrementQuantity(product_id)} 
              className="w-8 h-8 bg-gray-300 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img src={'http://localhost:8000/media/' + image} width={60} alt={name} className="rounded-lg" />
          <button 
            onClick={() => removeFromCart(product_id)} 
            className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    );
}