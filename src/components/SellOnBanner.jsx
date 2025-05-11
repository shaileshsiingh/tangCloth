import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import sellwithus from '../assets/SELL WITH US.jpeg';

const SellOnBanner = () => {
  const navigate = useNavigate();
  
  // Setup for scroll-triggered animations
  const controlsFeatures = useAnimation();
  const controlsStats = useAnimation();
  const controlsCta = useAnimation();
  
  const [refFeatures, inViewFeatures] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [refStats, inViewStats] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const [refCta, inViewCta] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Start animations when elements come into view
  useEffect(() => {
    if (inViewFeatures) controlsFeatures.start('visible');
    if (inViewStats) controlsStats.start('visible');
    if (inViewCta) controlsCta.start('visible');
  }, [controlsFeatures, controlsStats, controlsCta, inViewFeatures, inViewStats, inViewCta]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };
  
  const statItemVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const processItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" 
      }
    })
  };

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden"  style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4 py-12 sm:py-20">
        {/* SELL WITH US Header with subtle zoom effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
            initial={{ letterSpacing: "0.2em" }}
            animate={{ letterSpacing: "0.1em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            SELL WITH US
          </motion.h1>
          <motion.div 
            className="h-1 w-20 bg-black mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Main Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Content */}
          <motion.div 
            className="space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Left Text Content */}
            <div className="space-y-6 mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Turn Your Luxury Items into Profit
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-xl">
                Join our exclusive marketplace and sell your premium fashion items to fashion-forward buyers worldwide. We make selling simple, secure, and profitable.
              </p>
            </div>

            {/* Process Steps - Now with better responsive layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  title: "SHARE IMAGE",
                  subtitle: "OF YOUR PRODUCTS",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  title: "DIGITAL CONTRACT",
                  subtitle: "ASSURANCE CERTIFICATE",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                {
                  title: "FREE PAN INDIA PICKUP",
                  subtitle: "NATIONWIDE SERVICE",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  )
                },
                {
                  title: "AUTHENTICATION",
                  subtitle: "& LISTING",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )
                },
                {
                  title: "PAYMENT IN 24HRS",
                  subtitle: "NO PAYMENT DELAYS",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )
                },
                {
                  title: "CONTACT US",
                  subtitle: "704 203 9099",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  )
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={processItemVariant}
                  initial="hidden"
                  animate="visible"
                  className="bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-lg p-3 md:p-4 flex flex-col items-center text-center"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black rounded-full flex items-center justify-center mb-2 md:mb-3">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-xs md:text-sm">{step.title}</h3>
                  <p className="text-xs text-gray-600">{step.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image with floating animation */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                boxShadow: [
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
                  "0 20px 25px -5px rgba(0, 0, 0, 0.15)", 
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                ]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="rounded-lg overflow-hidden"
            >
              <img
                src={sellwithus}
                alt="Luxury Fashion Items"
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur rounded-lg p-4">
                  <h3 className="font-bold text-lg">Luxury Worth Sharing</h3>
                  <p className="text-sm text-gray-700">Transform your closet into cash with our premium marketplace</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section with staggered animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16"
          ref={refFeatures}
          variants={staggerContainer}
          initial="hidden"
          animate={controlsFeatures}
        >
          {[
            {
              title: "Competitive Commission",
              description: "Enjoy industry-leading commission rates and maximize your profits with our seller-friendly pricing structure.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            },
            {
              title: "Secure Platform",
              description: "Our platform ensures secure transactions and protects both buyers and sellers with advanced security measures.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )
            },
            {
              title: "Dedicated Support",
              description: "Get personalized support from our expert team to help you list and sell your items effectively.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section with counter animation */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-sm p-6 md:p-8 mb-16"
          ref={refStats}
          variants={staggerContainer}
          initial="hidden"
          animate={controlsStats}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { number: "10K+", label: "Active Sellers" },
              { number: "50K+", label: "Products Sold" },
              { number: "95%", label: "Seller Satisfaction" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={statItemVariant}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.h4 
                  className="text-2xl md:text-3xl font-bold text-black mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  {stat.number}
                </motion.h4>
                <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section with attention-grabbing animation */}
        <motion.div 
          className="text-center"
          ref={refCta}
          variants={fadeInUp}
          initial="hidden"
          animate={controlsCta}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to Start Selling?</h2>
          <p className="text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Join thousands of successful sellers on our platform and turn your luxury items into profit. We're here to help you every step of the way.
          </p>
          
          <motion.button
            onClick={() => {
              window.scrollTo(0, 0);
              navigate('/sell-with-us');
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 md:px-8 md:py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create Seller Account
          </motion.button>
          
          {/* Animated decorative elements */}
          <div className="relative h-20 mt-12">
            <motion.div 
              className="absolute w-6 h-6 bg-black rounded-full left-1/4"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute w-4 h-4 bg-gray-400 rounded-full left-1/3"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{ 
                duration: 2.5,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute w-8 h-8 bg-gray-800 rounded-full right-1/4"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.2, 0.9, 0.2],
              }}
              transition={{ 
                duration: 4,
                delay: 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SellOnBanner;