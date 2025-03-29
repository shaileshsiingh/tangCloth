import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PopularProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = "/api";

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch all products
        const response = await fetch(`${API_URL}/product/list`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch products');
        }
        
        // Sort by createdAt if available, otherwise use the default order
        const allProducts = data.data.products || [];
        // Take only the first 5 products (assuming they're already ordered by newest)
        setProducts(allProducts.slice(0, 5));
      } catch (err) {
        console.error('Error fetching new products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  const handleProductClick = (productId, product) => {
    // Navigate to product detail page with product state
    navigate(`/product/${productId}`, { state: { product } });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our latest additions, fresh from our curated collection
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
                className="group"
                whileHover={{ y: -5 }}
                onClick={() => handleProductClick(product._id, product)}
              >
                <div className="relative overflow-hidden mb-4">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/400x500'}
                    alt={product.product_name}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product._id, product);
                    }}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
                  >
                    Quick View
                  </button>
                </div>
                <h3 className="text-lg font-medium">{product.product_name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default PopularProducts;
