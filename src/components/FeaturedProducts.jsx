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
        
        // Take only the first 5 most expensive products
        setProducts(sortedByPrice.slice(0, 5));
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <div className="w-24 h-1 bg-premium-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most luxurious items, crafted with exceptional quality and attention to detail
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-premium-gold"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            {error}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product._id} 
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -7 }}
                onClick={() => handleProductClick(product._id, product)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                    alt={product.product_name}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500';
                    }}
                  />
                  {product.condition && (
                    <span className={`absolute top-2 left-2 ${getConditionBadgeColor(product.condition)} text-white text-xs font-semibold px-2 py-1 rounded shadow-md`}>
                      {product.condition.toUpperCase()}
                    </span>
                  )}
                  <div className="absolute top-0 right-0 bg-premium-gold text-white px-3 py-1 m-2 text-sm font-medium">
                    Premium
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-0 transform transition-all duration-300 group-hover:bg-opacity-75 flex items-center justify-center h-16 opacity-0 group-hover:opacity-100">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 text-white font-medium text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product._id, product);
                      }}
                    >
                      SHOP NOW
                    </motion.button>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-medium mb-1 transition-colors duration-300 group-hover:text-premium-gold">{product.product_name}</h3>
                  
                  {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                    <p className="text-gray-600 text-sm mb-3">
                      {(product.brand || (product.brandDetails && product.brandDetails[0]?.name)).toUpperCase()}
                    </p>
                  )}
                  
                  {product.estimated_price ? (
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 text-xs">Estimated Retail Price</span>
                      <span className="text-gray-500 line-through mb-1">₹{product.estimated_price}</span>
                      <span className="text-xs text-gray-700">Our Price</span>
                      <span className="text-gray-900 font-bold mt-1">₹{product.discount_price || product.price}</span>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <span className="text-gray-900 font-bold">₹{product.price}</span>
                    </div>
                  )}

                  <div className="flex justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 ${
                          i < (product.averageRating || 4) ? 'text-premium-gold' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {/* Available sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex justify-center gap-1 mt-3">
                      {product.sizes.slice(0, 4).map((sizeObj, idx) => (
                        <span 
                          key={idx}
                          className="text-xs border border-gray-300 px-2 py-1 rounded-sm hover:border-premium-gold transition-colors duration-300"
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
      </div>
    </section>
  );
}

export default FeaturedProducts;
