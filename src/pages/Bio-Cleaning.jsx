import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const BioCleaning = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="relative w-full h-[400px] mb-10">
        <img
          src="https://tangerineluxury.com/wp-content/uploads/2023/11/top-10-bag-cleaning-services-in-singapore.png"
          alt="Bio Cleaning"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-white">BIO CLEANING</h1>
        </div>
      </div>

      <motion.h2 className="text-2xl font-bold text-center mb-6">
        ADD A SECOND LIFE TO YOUR FAVOURITE PRODUCTS
      </motion.h2>
      <p className="text-lg text-gray-700 text-center mb-10">
        Our Bio-Cleaning Services not only increase the lifespan of your handbags and accessories, but they also get rid of the dirt and grime that prematurely ages the product and accelerates wear and tear.
      </p>

      <h3 className="text-xl font-bold mb-4 text-center">YOUR BAG NEEDS TO BREATHE BECAUSE IT HAS SEEN BETTER DAYS</h3>
      <p className="text-lg text-gray-700 text-center mb-10">
        Including crackled and lightly used leathers, form loss, fading, and stains. We use our in-house experts to carefully repair any goods. With years of combined experience, our knowledgeable team of specialists can repair handbags from all brands and take care of some of the most expensive and irreplaceable accessories in the world.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://tangerineluxury.com/wp-content/uploads/2022/12/henry-kobutra-Y7C2sWaxf4Q-unsplash-2.png"
          alt="Cleaning"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-xl font-bold mb-4">
            DON'T IGNORE THE AMOUNT OF BACTERIA YOU BRING IN YOUR SHOES AND HANDBAGS.
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            According to studies, a lot of these things were infected with plenty of bacteria that unintentionally got transmitted and harmed YOU. The risk of infection can be significantly decreased by routine cleaning of your priceless possessions.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold">
            <Link to="/contact">Book Now</Link>
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-4 text-center">TERMS & CONDITIONS</h3>
      <ul className="list-disc list-inside text-lg text-gray-700">
        <li>Upon reviewing the product, recommended final services/quotes will be given.</li>
        <li>We do not provide stain removal guarantees for our entry-level bag, shoe, and belt spa treatments.</li>
        <li>Removal of pen marks is not guaranteed.</li>
        <li>GST is already included in all pricing.</li>
        <li>Extra for shipping</li>
      </ul>
    </div>
  );
};

export default BioCleaning;
