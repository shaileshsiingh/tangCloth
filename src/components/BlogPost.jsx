import React, { useState } from 'react';
import { motion } from 'framer-motion';

function BlogPost({ title, excerpt, image, date, category }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>{date}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
        <h3 className="text-xl font-medium group-hover:text-gray-600">{title}</h3>
        <p className="text-gray-600">
          {isExpanded ? excerpt : `${excerpt.substring(0, 150)}...`}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-black font-medium hover:text-gray-600"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </motion.div>
  );
}

export default BlogPost; 