import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductList from '../components/ProductList';
import { useInView } from 'react-intersection-observer';

const SaleItems = () => {
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
            <ProductList products={products} />
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default SaleItems; 