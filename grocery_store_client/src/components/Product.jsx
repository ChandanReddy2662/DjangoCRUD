import React from 'react'

function Product({name, price, quantity, image, product_id, addToCart}) {

    function cart(){
        addToCart(quantity, product_id);
    }

    return (
        <div className="flex justify-between items-center border-b border-zinc-300 p-4 w-full bg-white rounded-lg shadow-md" key={product_id}>
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-700">Price: ${price}</p>
            <p className="text-gray-700">{quantity > 0 ? `Quantity: ${quantity}` : 'Out Of Stock'}</p>
            <button 
              onClick={cart} 
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={quantity <= 0} // Disable button if out of stock
            >
              {quantity > 0 ? 'Add To Cart' : 'Out of Stock'}
            </button>
          </div>
          <div className="ml-4">
            <img src={'http://localhost:8000/media/' + image} width={60} alt={name} className="rounded-lg" />
          </div>
        </div>
      );
}

export default Product
