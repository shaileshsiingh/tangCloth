import React from 'react';
import { ChevronDown } from 'lucide-react';

function TopBar() {
  return (
    <div className="bg-black text-white text-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            USD, $ 
            <ChevronDown size={14} className="ml-1" />
          </div>
          <span>|</span>
          <div className="flex items-center space-x-2">
            <a href="#" className="hover:text-gray-300">FR</a>
            <a href="#" className="hover:text-gray-300">IN</a>
            <a href="#" className="hover:text-gray-300">TW</a>
          </div>
        </div>
        <div>
          Free Shipping on Orders over $100
        </div>
      </div>
    </div>
  );
}

export default TopBar; 