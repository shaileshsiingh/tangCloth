import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import banner1 from '../assets/BANNER1.jpg';
import banner2 from '../assets/BANNER2.jpg';


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
  },
  {
    id: 3,
    image: banner1,
    title: 'New Collection',
    subtitle: 'Trending Styles'
  },
  {
    id: 4,
    image: banner2,
    title: 'Accesories Collection',
    subtitle: 'Branded Items'
  }
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] sm:h-[600px] md:h-[700px] w-full overflow-hidden">
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
            className="w-full h-full min-h-[500px] bg-cover bg-center bg-no-repeat relative z-0"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20 z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-20 px-4">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-4xl md:text-5xl font-light mb-2 sm:mb-4"
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-4 sm:mb-8"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => navigate('/shop')}
                className="bg-black text-white px-6 sm:px-10 py-3 sm:py-4 border border-white rounded-lg hover:bg-white hover:text-black hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-sm sm:text-base"
              >
                BUY AND SELL
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
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
