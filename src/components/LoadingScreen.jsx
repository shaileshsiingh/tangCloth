import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoaded ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
    >
      <h1 className="text-4xl font-bold font-serif">Tangerine..</h1>
    </motion.div>
  );
}

export default LoadingScreen; 