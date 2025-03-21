import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'WOMEN', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/Women-final.webp' },
  { name: 'MEN', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/Men-final.webp' },
  { name: 'KIDS', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/Kids-Final.webp' },
];

function Categories() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  const navigate = useNavigate();

  return (
    <div ref={ref} className="py-16">
      <h2 className="text-center text-3xl font-bold mb-4">Shop By Category</h2>
      <p className="text-center text-gray-600 mb-8">
        Tincidunt convallis nulla bibendum. Sed egestas, nisi purus vestibulum augue, at iaculis.
      </p>
      <div className="flex justify-center space-x-8">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            className="text-center transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onClick={() => navigate('/shop')}
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
        ))}
      </div>
    </div>
  );
}

export default Categories;