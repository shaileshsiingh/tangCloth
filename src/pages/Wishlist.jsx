import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';

function Wishlist() {
  const { cart } = useCart(); // Assuming you have a way to manage wishlist items

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your wishlist is currently empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <img src={item.images[0]} alt={item.name} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-gray-600">${item.price.min.toFixed(2)} - ${item.price.max.toFixed(2)}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`h-4 w-4 ${i < item.reviews.rating ? 'text-black-400' : 'text-gray-200'}`} 
                  />
                ))}
              </div>
              <Link to={`/product/${item.id}`} className="text-blue-500 hover:underline mt-2 block">
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