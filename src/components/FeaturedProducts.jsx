import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function FeaturedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = "/api";

  useEffect(() => {
    const fetchExpensiveProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch all products since API doesn't support price sorting
        const response = await fetch(`${API_URL}/product/list`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch products');
        }
        
        // Sort products by price (highest to lowest)
        const allProducts = data.data.products || [];
        const sortedByPrice = [...allProducts].sort((a, b) => b.price - a.price);
        
        // Take only the first 4 most expensive products
        setProducts(sortedByPrice.slice(0, 4));
      } catch (err) {
        console.error('Error fetching expensive products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpensiveProducts();
  }, []);

  const handleProductClick = (productId, product) => {
    // Navigate to product detail page with product state
    navigate(`/product/${productId}`, { state: { product } });
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white"  style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most luxurious items, crafted with exceptional quality and attention to detail
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {error}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product._id} 
                className="overflow-hidden cursor-pointer group relative bg-white shadow-sm hover:shadow-xl transition-all duration-300 rounded-lg border border-gray-200"
                whileHover={{ y: -5 }}
                onClick={() => handleProductClick(product._id, product)}
              >
                <div className="relative pb-[120%] bg-gray-50">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                    alt={product.product_name}
                    className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500';
                    }}
                  />
                  {product.condition && (
                    <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                      {product.condition.toUpperCase()}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                    PREMIUM
                  </div>
                  {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                    <span className="absolute top-10 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                      {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                    </span>
                  )}
                  <div className="absolute right-2 top-14 flex flex-col gap-2">
                    <motion.button 
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist functionality would go here
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
                        handleProductClick(product._id, product);
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
                      handleProductClick(product._id, product);
                    }}
                  >
                    SHOP NOW
                  </motion.button>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-base font-medium mb-1 transition-all duration-200 group-hover:text-black group-hover:font-bold">
                    {product.product_name.toUpperCase()}
                  </h3>
                  
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
                  
                  {/* Available sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex justify-center gap-1 mt-3">
                      {product.sizes.slice(0, 4).map((sizeObj, idx) => (
                        <span 
                          key={idx}
                          className="text-xs border border-gray-300 px-2 py-1 rounded-sm hover:border-gray-500 transition-colors duration-300"
                        >
                          {sizeObj.size}
                        </span>
                      ))}
                      {product.sizes.length > 4 && (
                        <span className="text-xs flex items-center justify-center">+{product.sizes.length - 4}</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Show more button */}
        <div className="flex justify-center mt-12">
          <motion.button
            className="bg-[#B2FFFF] hover:bg-[#8EEAEA] text-gray-800 font-medium px-8 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/shop');
            }}          >
            Show more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
