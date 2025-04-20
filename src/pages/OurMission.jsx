import React from 'react';
import { motion } from 'framer-motion';

function OurMission() {
  return (
    <div className="container mx-auto px-4 py-16"  style={{backgroundColor:'#FAF9F6'}}>
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        OUR MISSION
      </motion.h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <motion.div 
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Luxury shopping experience" 
            className="w-full h-auto rounded-md shadow-md object-cover"
          />
        </motion.div>
        
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Luxury fashion detail" 
              className="w-full h-auto rounded-md shadow-md object-cover mb-6"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Luxury shopping bags" 
              className="w-full h-auto rounded-md shadow-md object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="text-lg mb-6">
          Our goal is to alter how people consume fashion. We wish to increase 
          sustainability of consumption without reducing your options and variety.
        </p>
        <p className="text-lg">
          We want to make it more accessible for consumers to purchase luxury goods.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Buy, adore, then sell again.</h2>
        <p className="text-gray-700">
          An investment in fine goods. For both the buyer and the seller, our team of 
          professionals is committed to making each sale a worthwhile investment.
          In this contemporary era of recommerce, we motivate our vendors to "sell 
          with us" and our consumers to "purchase with us."
        </p>
      </motion.div>
    </div>
  );
}

export default OurMission;