import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Summer Suit',
    price: '$89.00',
    image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4,
  },
  {
    id: 2,
    name: 'Denim Shorts',
    price: '$45.00',
    image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Denim Shirt',
    price: '$65.00',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4,
  },
  {
    id: 4,
    name: 'Clutch Hand Bag',
    price: '$79.00',
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 3,
  },
  {
    id: 5,
    name: 'Full Sleeve T-Shirt',
    price: '$49.00',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    rating: 4,
  },
];

function PopularProducts() {
  const navigate = useNavigate();

  const handleQuickView = (e, productId) => {
    e.preventDefault(); // Prevent event bubbling
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Popular This Week</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most-loved styles, hand-picked for their exceptional design and quality
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                <button 
                  onClick={(e) => handleQuickView(e, product.id)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
                >
                  Quick View
                </button>
              </div>
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating ? 'text-black-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularProducts;
