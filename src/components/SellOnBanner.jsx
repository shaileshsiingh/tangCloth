import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SellOnBanner = () => {
  const navigate = useNavigate()
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* SELL WITH US Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold">SELL WITH US</h1>
        </motion.div>

        {/* Main Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Left Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 mb-8"
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Turn Your Luxury Items into Profit
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Join our exclusive marketplace and sell your premium fashion items to fashion-forward buyers worldwide. We make selling simple, secure, and profitable.
              </p>
            </motion.div>

            {/* Process Steps - Now in 2 rows and 3 columns */}
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm">SHARE IMAGE</h3>
                <p className="text-xs text-gray-600">OF YOUR PRODUCTS</p>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm">DIGITAL CONTRACT</h3>
                <p className="text-xs text-gray-600">ASSURANCE CERTIFICATE</p>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm">FREE PAN INDIA PICKUP</h3>
                <p className="text-xs text-gray-600">NATIONWIDE SERVICE</p>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm">AUTHENTICATION</h3>
                <p className="text-xs text-gray-600">& LISTING</p>
              </motion.div>

              {/* Step 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm">PAYMENT IN 24HRS</h3>
                <p className="text-xs text-gray-600">NO PAYMENT DELAYS</p>
              </motion.div>

              {/* Step 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white shadow rounded-lg p-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="font-bold text-sm">CONTACT US</h3>
                <p className="text-xs text-gray-600">704 203 9099</p>
              </motion.div>
            </div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://wamani.vercel.app/wp-content/uploads/2023/06/Home-8-Spacer-Bg.png"
              alt="Luxury Fashion Items"
              className="rounded-lg shadow-xl w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Competitive Commission</h3>
            <p className="text-gray-600">Enjoy industry-leading commission rates and maximize your profits with our seller-friendly pricing structure.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">Our platform ensures secure transactions and protects both buyers and sellers with advanced security measures.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Dedicated Support</h3>
            <p className="text-gray-600">Get personalized support from our expert team to help you list and sell your items effectively.</p>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-black mb-2">10K+</h4>
              <p className="text-gray-600">Active Sellers</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-black mb-2">50K+</h4>
              <p className="text-gray-600">Products Sold</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-black mb-2">95%</h4>
              <p className="text-gray-600">Seller Satisfaction</p>
            </div>
            <div className="text-center">
              <h4 className="text-3xl font-bold text-black mb-2">24/7</h4>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers on our platform and turn your luxury items into profit. We're here to help you every step of the way.
          </p>
          
            <motion.button
            onClick={()=>{
              window.scrollTo(0,0)
              navigate('/sell-with-us')}
            }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Create Seller Account
            </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SellOnBanner;