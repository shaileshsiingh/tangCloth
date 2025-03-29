import React from 'react';
import { motion } from 'framer-motion';

function Authenticity() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Authenticity
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        At Tangerine Luxury, we ensure that every item is authentic and meets our high standards of quality. Our team of experts meticulously verifies each product to guarantee its authenticity.
      </motion.p>
    </div>
  );
}

export default Authenticity;