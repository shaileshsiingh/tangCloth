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

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product._id} 
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => handleProductClick(product._id, product)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                    alt={product.product_name}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500';
                    }}
                  />
                  <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 m-2 text-sm font-medium">
                    Premium
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium">{product.product_name}</h3>
                  <p className="text-gray-900 font-bold mt-1">₹{product.price}</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-4 ${
                          i < (product.averageRating || 0) ? 'text-black-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {/* Available sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {product.sizes.slice(0, 4).map((sizeObj, idx) => (
                        <span 
                          key={idx}
                          className="text-xs border px-1 rounded"
                        >
                          {sizeObj.size}
                        </span>
                      ))}
                      {product.sizes.length > 4 && (
                        <span className="text-xs">+{product.sizes.length - 4}</span>
                      )}
                    </div>
                  )}
                  
                  <button 
                    className="mt-4 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product._id, product);
                    }}
                  >
                    View Details
                  </button>
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
