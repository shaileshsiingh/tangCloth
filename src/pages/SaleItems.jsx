import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const SaleItems = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = "/api";
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/product/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        // Filter products that have a discounted_price
        const saleProducts = data.data.products.filter(product => 
          product.discount_price || 
          (product.estimated_price && product.price < product.estimated_price)
        );
        
        setProducts(saleProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load sale items. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div ref={ref} className="container mx-auto px-4 py-12" style={{backgroundColor:'#FAF9F6'}}>
      <section className="mb-16">
        <div className="flex justify-center items-center mb-12 mt-20">
          <motion.h2 
            className="text-5xl font-bold text-center relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-red-600 to-yellow-500 text-transparent bg-clip-text">
              SALE ITEMS
            </span>
            <motion.div 
              className="absolute -top-4 -right-10 bg-red-600 text-white text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center transform rotate-12"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SALE
            </motion.div>
          </motion.h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-600 py-8">No sale items available at the moment.</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                className="w-full bg-[#fafafa] border border-gray-100 rounded-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden cursor-pointer group relative"
                whileHover={{ scale: 1.02 }}
                style={{backgroundColor:'white'}}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative aspect-square w-full">
                  <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300x300'}
                    alt={product.product_name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300';
                    }}
                  />
                  {product.condition && (
                    <span className="absolute top-3 left-3 bg-black bg-opacity-80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-sm">
                      {product.condition.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  )}
                  
                  {/* Brand Logo/Badge */}
                  {(product.brand || (product.brandDetails && product.brandDetails.length > 0)) && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm shadow-sm rounded-sm px-2.5 py-1.5 text-xs font-medium tracking-wide">
                      {(typeof product.brand === 'string' ? product.brand : 
                       (product.brandDetails && product.brandDetails[0]?.name) || 
                       (product.brand?.name || 'Brand')).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="p-5 bg-white">
                  <h2 className="text-base font-medium mb-2 truncate tracking-wide">{product.product_name.toUpperCase()}</h2>
                  <div className="mt-3 space-y-1.5">
                    {product.estimated_price ? (
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">
                          Estimated Retail Price: <span className="line-through">₹{product.estimated_price.toLocaleString()}</span>
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-900 font-medium">
                            Our Price: ₹{(product.discount_price || product.price).toLocaleString()}
                          </span>
                          {product.estimated_price > (product.discount_price || product.price) && (
                            <span className="text-xs px-1.5 py-0.5 bg-black text-white rounded-sm">
                              {Math.round((1 - (product.discount_price || product.price) / product.estimated_price) * 100)}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-900 font-medium mt-1">₹{product.price.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default SaleItems; 