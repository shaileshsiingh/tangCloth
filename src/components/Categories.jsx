import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Category ID mapping
  const categoryIds = {
    'men': '67c82a32ac6e3964ca7755f7',
    'women': '67c08f837f61f5f03104ec4b',
    'kids': '67c9b33fb372a96364d09e3b'
  };
const API_URL = '/api'
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      // const response = await fetch(`http://91.203.135.152:2001/api/category/getAllCategory`);
      const response = await fetch(`${API_URL}/category/getAllCategory`);


      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      const filteredCategories = data.data.category.filter(cat =>
        ['men', 'women', 'kids'].includes(cat.name.toLowerCase())
      );
      setCategories(filteredCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Function to navigate to shop with selected category
  const handleCategoryClick = (category) => {
    const categoryName = category.name.toLowerCase();
    const categoryId = categoryIds[categoryName];
    
    if (categoryId) {
      navigate(`/shop?category_id=${categoryId}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <div ref={ref} className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Shop By Category
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collections designed for every style and age.
        </p>
      </div>

      <div className="flex justify-center space-x-8">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        ) : (
          categories.map((category) => (
            <motion.div
              key={category._id}
              className="group text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                onClick={() => handleCategoryClick(category)}
                className="cursor-pointer"
              >
                <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg transition-all duration-300 
                  group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-blue-500/30 mb-4">
                  <img
                    src={category.image}
                    alt={category.name.toUpperCase()}
                    className="w-full h-full object-cover transform transition-transform duration-300 
                      group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-semibold tracking-wider text-gray-800 
                  transition-colors duration-300 
                  group-hover:text-blue-600 uppercase">
                  {category.name.toUpperCase()}
                </h3>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;