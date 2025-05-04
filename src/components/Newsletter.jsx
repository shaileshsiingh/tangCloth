import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Signup Section */}
        <div 
          className="text-center mb-10 transition-all duration-500 transform hover:scale-105"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h2 className={`text-3xl font-bold mb-3 tracking-tight transition-all duration-500 ${isHovered ? 'text-black' : 'text-gray-800'}`}>
            SIGN UP and get 25% OFF<span className="text-orange-500">*</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed transition-all duration-500">
            Sign up to our e-mails to be the first to hear about the latest trends, new arrivals and exclusive offers. Available to customers opting
            in for the first time or returning to opt in, offer excludes third party branded, promotional and sale items.
            <br />You can unsubscribe at any time. <span className="underline cursor-pointer hover:text-black">*T&Cs apply</span>.
          </p>
        </div>

        {/* Email Form */}
        <div className="flex flex-col md:flex-row justify-center max-w-xl mx-auto mb-16 shadow-lg">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`border border-gray-300 px-4 py-4 w-full md:flex-1 mb-2 md:mb-0 transition-all duration-300 outline-none ${isFocused ? 'border-black shadow-sm' : ''}`}
          />
          <button 
            className="bg-black text-white px-8 py-4 md:w-auto w-full hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span className="font-medium">Sign me up</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;