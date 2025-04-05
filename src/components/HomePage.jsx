import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useWishlist } from '../context/WishlistContext';

function HomePage() {
  const [showCard, setShowCard] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addTowishlist } = useWishlist();
  const API_URL = "/api";   
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/product/list`);
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
      setTimeout(() => setShowCard(false), 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // Helper function to determine badge color based on condition
  const getConditionBadgeColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'pristine':
        return 'bg-green-600';
      case 'new':
        return 'bg-red-600';
      case 'sale':
        return 'bg-black';
      case 'used':
        return 'bg-orange-500';
      case 'refurbished':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div ref={ref} className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Casual Outfits</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product._id}
              className="overflow-hidden cursor-pointer group relative bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg"
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative pb-[125%] bg-gray-50">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.product_name}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
                {product.condition && (
                  <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                    {product.condition.toUpperCase()}
                  </span>
                )}
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <motion.button 
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addTowishlist(product);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Quick view functionality
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-70 flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 text-white font-medium transition-colors text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  SHOP NOW
                </motion.button>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-medium mb-1 transition-colors group-hover:text-premium-gold">
                  {product.product_name.toUpperCase()}
                </h3>
                {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                  <p className="text-gray-600 text-sm mb-2">
                    {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                  </p>
                )}
                <div className="mt-2">
                  {product.estimated_price ? (
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Estimated Retail Price</span>
                      <span className="text-gray-500 line-through mb-1">₹{product.estimated_price}</span>
                      <span className="text-xs text-gray-700">Our Price</span>
                      <span className="text-gray-800 font-medium">
                        ₹{product.discount_price || product.price}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-800 font-medium">₹{typeof product.price === 'number' ? product.price : product.price?.toFixed(2) || 0}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Trending Apparels</h2>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {products.slice(4, 8).map((product) => (
            <motion.div
              key={product._id}
              className="overflow-hidden cursor-pointer group relative bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg"
              whileHover={{ y: -5 }}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative pb-[125%] bg-gray-50">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'}
                  alt={product.product_name.toUpperCase()}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                />
                {product.condition && (
                  <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                    {product.condition.toUpperCase()}
                  </span>
                )}
                <div className="absolute right-2 top-2 flex flex-col gap-2">
                  <motion.button 
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      addTowishlist(product);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Quick view functionality
                      e.stopPropagation();
                      handleProductClick(product);
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-70 flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 text-white font-medium transition-colors text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  SHOP NOW
                </motion.button>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-base font-medium mb-1 transition-colors group-hover:text-premium-gold">
                  {product.product_name.toUpperCase()}
                </h3>
                {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                  <p className="text-gray-600 text-sm mb-2">
                    {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                  </p>
                )}
                <div className="mt-2">
                  {product.estimated_price ? (
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Estimated Retail Price</span>
                      <span className="text-gray-500 line-through mb-1">₹{product.estimated_price}</span>
                      <span className="text-xs text-gray-700">Our Price</span>
                      <span className="text-gray-800 font-medium">
                        ₹{product.discount_price || product.price}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-800 font-medium">₹{typeof product.price === 'number' ? product.price : product.price?.toFixed(2) || 0}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {showCard && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed bottom-4 left-4 bg-white shadow-lg rounded-lg w-72 z-20 overflow-hidden"
        >
          <div className="flex">
            <div className="w-1/3">
              <img 
                src="https://wamani.vercel.app/wp-content/uploads/2023/05/hots-01.jpg" 
                alt="Product" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="w-2/3 p-3">
              <div className="mb-1">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Oops! It's Gone.</span>
              </div>
              <h3 className="text-lg font-medium">Coat</h3>
              <p className="text-sm text-gray-800">$99.99</p>
              <div className="flex items-center mt-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-600">by Anonymous</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default HomePage;