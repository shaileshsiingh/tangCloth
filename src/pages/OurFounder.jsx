import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function OurFounder() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      rotateY: 5 
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.5
      }
    })
  };

  const nameAccentVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay: 1.8,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen"  style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4 py-24">
        <motion.h1 
          className="text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut"
          }}
        >
          Our Founder
        </motion.h1>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="md:w-2/5 mb-12 md:mb-0 relative"
              variants={imageVariants}
            >
              <div className="absolute inset-0 bg-orange-100 rounded-lg -rotate-3 scale-95 z-0"></div>
              <img
                src="http://tangerineluxury.com/wp-content/uploads/2023/11/TANIYA-828x1024.jpeg"
                alt="Taniya Bhatia - Founder of Tangerine Luxury"
                className="w-full h-auto rounded-lg shadow-xl relative z-10 transform transition-transform duration-500 hover:scale-105"
              />
              
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg z-20"
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <p className="font-bold text-orange-500">Founder & CEO</p>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2 space-y-6"
              variants={itemVariants}
            >
              <motion.div className="overflow-hidden">
                <motion.p 
                  className="text-xl text-gray-700 leading-relaxed"
                  custom={0}
                  variants={textRevealVariants}
                >
                  Everyone desires and is entitled to a small amount of luxury in their life. Tangerine Luxury has something for everyone, whether you are a luxury collector or have only recently begun your venture into the world of luxury.
                </motion.p>
              </motion.div>

              <motion.div className="overflow-hidden">
                <motion.p 
                  className="text-xl text-gray-700 leading-relaxed"
                  custom={1}
                  variants={textRevealVariants}
                >
                  The goal of Tangerine Luxury is to make luxury a daily experience for everyone. The new approach of living is circular. Improve the quality of life on this planet.
                </motion.p>
              </motion.div>

              <motion.div 
                className="pt-6 mt-6 border-t border-gray-200"
                variants={itemVariants}
              >
                <motion.div className="relative">
                  <motion.p 
                    className="text-2xl font-bold text-gray-800 inline-block relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    Taniya Bhatia
                  </motion.p>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-3 bg-orange-200 z-0"
                    variants={nameAccentVariants}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <motion.a 
                  href="#" 
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect
                </motion.a>
                <motion.a 
                  href="#" 
                  className="px-6 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OurFounder;