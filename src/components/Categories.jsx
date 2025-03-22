import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const API_URL = "/api";

function Categories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      // const response = await fetch(`${API_URL}/category/getAllCategory`);
                const response = await fetch(`http://91.203.135.152:2001/api/category/getAllCategory` )

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
  const handleCategoryClick = (categoryName) => {
    navigate('/shop', { state: { selectedCategory: categoryName } });
  };

  return (
    <div ref={ref} className="py-16">
      <h2 className="text-center text-3xl font-bold mb-4">Shop By Category</h2>
      <p className="text-center text-gray-600 mb-8">
        Tincidunt convallis nulla bibendum. Sed egestas, nisi purus vestibulum augue, at iaculis.
      </p>
      <div className="flex justify-center space-x-8">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          categories.map((category) => (
            <motion.div
              key={category._id}
              className="text-center transform transition-transform duration-300 hover:scale-110 cursor-pointer"
              initial={{ opacity: 0, y: -50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="w-64 h-64 bg-white rounded-full overflow-hidden shadow-lg mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;