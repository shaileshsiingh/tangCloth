import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [showCard, setShowCard] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const API_URL = "/api";   
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://91.203.135.152:2001/api/product/list');
        // const response = await fetch(`${API_URL}/product/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    const interval = setInterval(() => {
      setShowCard(true);
      setTimeout(() => setShowCard(false), 5000); // Show card for 5 seconds
    }, 8000); // Show card every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Casual Outfits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative z-10" onClick={() => handleProductClick(product)}>
                <div className="relative pb-[100%] bg-gray-50">
                  <img src={product.images[0]} alt={product.product_name} className="absolute top-0 left-0 w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-70 flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
                    <button className="bg-black text-white border border-white px-6 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors">
                      SELECT OPTIONS
                    </button>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold mb-1">{product.product_name}</h3>
                  <div className="flex justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-4 h-4 ${star <= (product.rating || 3) ? 'text-black-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending Apparels</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative z-10" onClick={() => handleProductClick(product)}>
                <div className="relative pb-[100%] bg-gray-50">
                  <img src={product.images[0]} alt={product.product_name} className="absolute top-0 left-0 w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-70 flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
                    <button className="bg-black text-white border border-white px-6 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors">
                      SELECT OPTIONS
                    </button>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold mb-1">{product.product_name}</h3>
                  <div className="flex justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-4 h-4 ${star <= (product.rating || 3) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Add more sections as needed */}
      </div>

      {showCard && (
        <div className="fixed bottom-4 left-4 bg-white shadow-lg p-4 rounded-lg w-64 h-64 flex flex-col justify-between">
          <img src="https://wamani.vercel.app/wp-content/uploads/2023/05/Home-1-Slider-1-2.jpg" alt="Product" className="w-full h-32 object-cover rounded" />
          <div className="mt-2">
            <h3 className="text-lg font-bold">Coat</h3>
            <p className="text-sm text-gray-600">$99.99</p>
            <p className="text-lg font-bold text-black-500">Just purchased!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage; 