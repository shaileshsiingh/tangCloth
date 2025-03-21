import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const items = [
  { name: 'APPAREL', image: 'https://tangerineluxury.com/wp-content/uploads/2024/10/Gucci.png' },
  { name: 'BAGS', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C22.webp' },
  { name: 'FOOTWEAR', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C33.webp' },
  { name: 'ACCESSORIES', image: 'https://tangerineluxury.com/wp-content/uploads/2024/04/C44.webp' },
];

function PrelovedLuxury() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="bg-pink-100 py-12">
      <h2 className="text-center text-3xl font-bold mb-8">EXPLORE PRELOVED LUXURY</h2>
      <div className="flex justify-center space-x-8">
        {items.map((item) => (
          <motion.div
            key={item.name}
            className="text-center transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-64 h-64 object-cover rounded-lg mb-4 shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors shadow-md">
              EXPLORE MORE
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PrelovedLuxury;