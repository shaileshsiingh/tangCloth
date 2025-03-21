import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const items = [
  { name: 'APPAREL', image: 'https://tangerineluxury.com/wp-content/uploads/2024/10/Gucci.png' },
  { name: 'BAGS', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C22.webp' },
  { name: 'FOOTWEAR', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C33.webp' },
  { name: 'ACCESSORIES', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C44.webp' },
];

function PrelovedLuxury() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.9,
  });

  const navigate = useNavigate();

  return (
    <div ref={ref} className="py-16">
      <h2 className="text-center text-3xl font-bold mb-4">Explore Preloved Luxury</h2>
      <p className="text-center text-gray-600 mb-8">
        Discover unique preloved items with timeless elegance.
      </p>
      <div className="flex justify-center space-x-8">
        {items.map((item) => (
          <motion.div
            key={item.name}
            className="text-center transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            onClick={() => navigate('/shop')}
          >
            <div className="w-64 h-64 bg-white rounded-full overflow-hidden shadow-lg mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PrelovedLuxury;