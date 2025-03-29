import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: 'https://wamani.vercel.app/wp-content/uploads/2023/05/Home-1-Slider-1-2.jpg',
    title: 'Summer Collection',
    subtitle: 'New Arrivals'
  },
  {
    id: 2,
    image: 'https://wamani.vercel.app/wp-content/uploads/2023/06/Home-1-Slider-2-1.jpg',
    title: 'Winter Collection',
    subtitle: 'Latest Styles'
  }
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-light mb-4"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-6xl font-semibold mb-8"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate('/shop')}
                className="bg-black text-white px-14 py-4 border border-white rounded-lg hover:bg-white hover:text-black hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"              >
                SHOP COLLECTION
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner; 