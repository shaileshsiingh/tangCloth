import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

function Wishlist() {
  const { cart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => (
            <div key={item._id} className="border rounded-lg p-4">
              <img 
                src={item.images[0]} 
                alt={item.product_name} 
                className="w-full h-48 object-cover mb-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
              <h2 className="text-lg font-medium">{item.product_name}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-sm font-medium mt-1">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <Link 
                to={`/product/${item._id}`} 
                state={{ product: item }}
                className="mt-4 block w-full bg-black text-white text-center py-2 hover:bg-gray-900"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist; 