import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TLElite = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center text-4xl font-bold mb-12 text-gray-800"
        >
          TANGERINE LUXURY ELITE
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative overflow-hidden rounded-lg shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img 
              src="https://tangerineluxury.com/wp-content/uploads/2022/12/michael-dagonakis-eaiqiA-PoTU-unsplash-1.png" 
              alt="TL Elite Model 1" 
              className={`w-full h-[500px] object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
              >
                <p className="text-white text-2xl font-bold">Vogue Essence</p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative overflow-hidden rounded-lg shadow-lg"
          >
            <img 
              src="	https://tangerineluxury.com/wp-content/uploads/2022/12/denerio-watkins-VPIzOHFxmmw-unsplash-1.png" 
              alt="TL Elite Model 2" 
              className="w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>

        {/* Affiliate Network Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            JOIN THE TL ELITE AFFILIATE NETWORK
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Tangerine Luxury is looking for fashion-forward innovators and influencers with a focus on fashion, beauty, and all things luxury. By promoting Tangerine Luxury to your followers, you get exclusive access to our loyalty programme.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a 
              href="tel:+917042039009"
              className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Get in Touch: 7042039009
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TLElite;