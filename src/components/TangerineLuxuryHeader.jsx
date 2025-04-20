import React from 'react';
import { Link } from 'react-router-dom';

function TangerineLuxuryHeader() {
  

  return (
    <div 
      className="w-full bg-white py-8 cursor-pointer"  style={{backgroundColor:'#FAF9F6'}}
    >
      {/* Logo and Brand Name */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex justify-center space-x-4 mb-4">
        <img src="https://tangerineluxury.com/wp-content/uploads/2023/09/Layer-1111111.png" alt="Tangerine" />

        </div>
        
      </div>
      
      {/* Introduction Text */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-12">
        <p className="mb-6 text-lg">
          An online marketplace like "<span className="font-bold">Tangerine Luxury</span>" allows users to buy and sell pre-loved women's, men's, and children's clothing and accessories.
        </p>
        
        <p className="mb-8 text-lg">
          Every single item in our collection was carefully chosen..! You won't need to worry about anything when you shop with us because each and every product meets the highest standards for both quality and style.
        </p>
        <Link to='/about'>
        <button className="bg-rose-100 px-6 py-3 rounded-full text-black font-medium">
          Know More
        </button>
        </Link>
      </div>
      
      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
        {/* Hassle Free Returns */}
        <div className="flex items-center">
          <div className="text-orange-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
              <rect x="1" y="3" width="15" height="10" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"></rect>
              <path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2" fill="none" stroke="currentColor" strokeWidth="2"></path>
              <path d="M4 13h5l2 2h5" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>
          <div className="font-bold">HASSLE FREE RETURNS</div>
        </div>
        
        {/* Affordable Luxury */}
        <div className="flex items-center">
          <div className="text-orange-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div className="font-bold">AFFORDABLE LUXURY</div>
        </div>
        
        {/* 100% Guaranteed Authentic */}
        <div className="flex items-center">
          <div className="text-orange-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8l-10 8"></path>
              <path d="M7 8l10 8"></path>
              <circle cx="12" cy="12" r="9"></circle>
              <text x="8" y="14" fontSize="8" fill="currentColor">$</text>
            </svg>
          </div>
          <div className="font-bold">100% GUARANTEED AUTHENTIC</div>
        </div>
        
        {/* Worldwide Shipping */}
        <div className="flex items-center">
          <div className="text-orange-500 mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M2 12h20"></path>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <div className="font-bold">WORLDWIDE SHIPPING</div>
        </div>
      </div>
    </div>
  );
}

export default TangerineLuxuryHeader;