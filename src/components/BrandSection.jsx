import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

function BrandSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBrands, setVisibleBrands] = useState(14); // Limit number of brands shown initially

  // Brand logo URLs - add more as needed
  const brandLogos = {
    'armani': 'https://static.vecteezy.com/system/resources/previews/023/585/851/non_2x/emporio-armani-logo-brand-clothes-symbol-white-design-fashion-illustration-with-black-background-free-vector.jpg',
    'versace': 'https://th.bing.com/th/id/OIP.TPma8Aa706tPe3GdBwBjkwHaGB?rs=1&pid=ImgDetMain',
    'gucci': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/1960s_Gucci_Logo.svg/2560px-1960s_Gucci_Logo.svg.png',
    'louis vuitton': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Louis_Vuitton_logo_and_wordmark.svg/1280px-Louis_Vuitton_logo_and_wordmark.svg.png',
    'jimmy choo': 'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/a7c5bb114960751.604599b861b54.jpg',
    'balenciaga': 'https://cdn.1min30.com/wp-content/uploads/2018/02/Couleur-logo-Balenciaga.jpg',
    'roberto cavalli': 'https://th.bing.com/th/id/R.aa4ed3e4650423b81415a53ea3b2bf49?rik=Jw1DU%2bGp0tMLzQ&riu=http%3a%2f%2falainelkanninterviews.com%2fwp-content%2fuploads%2f2015%2f08%2froberto-cavalli-Gold-Black-Logo-1024x778.png&ehk=KLu8Jeq7MZGW%2f9GnzQmG1GP%2fh5OxYd0EyCbI4Mi%2bXA8%3d&risl=&pid=ImgRaw&r=0',
    'polo ralph lauren': 'https://logohistory.net/wp-content/uploads/2023/07/Ralph-Lauren-Logo.svg',
    'nike': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png',
    'adidas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1280px-Adidas_Logo.svg.png',
    'chanel': 'https://freepngimg.com/thumb/chanel/61017-logo-brand-trademark-chanel-free-clipart-hd-thumb.png',
    'dior': 'https://static.vecteezy.com/system/resources/previews/024/693/557/original/dior-logo-transparent-free-png.png',
  };

  // Add this after the brandLogos declaration
  const featuredBrandNames = [
    'versace' ,
    'armani',
    'gucci', 
    'louis vuitton', 
    'jimmy choo', 
    'balenciaga',
    'roberto cavalli',
    'polo ralph lauren',
    'nike', 
    'adidas', 
    'chanel', 
    'dior'
  ];

  // Fetch brands from API
  const API_URL = '/api'
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/brand/get-brands`);
        // const response = await axios.get(`http://91.203.135.152:2001/api/brand/get-brands`);
        
        if (response.data && response.data.success) {
          const allBrands = response.data.data;
          
          // Filter to only include the featured brands
          const featuredBrands = [];
          
          // For each featured brand name, find it in the API results
          for (const featuredName of featuredBrandNames) {
            const brandMatch = allBrands.find(brand => 
              brand.name.toLowerCase().includes(featuredName));
            
            if (brandMatch) {
              featuredBrands.push({
                id: brandMatch._id,
                name: brandMatch.name,
                displayName: brandMatch.name.toUpperCase(),
                logoUrl: brandLogos[featuredName]
              });
            }
          }
          
          // If we didn't find all brands in the API, create fallbacks for missing ones
          if (featuredBrands.length < featuredBrandNames.length) {
            for (const featuredName of featuredBrandNames) {
              const exists = featuredBrands.some(brand => 
                brand.name.toLowerCase().includes(featuredName));
                
              if (!exists) {
                // Create a fallback brand entry
                featuredBrands.push({
                  id: `fallback-${featuredName}`,
                  name: featuredName.charAt(0).toUpperCase() + featuredName.slice(1),
                  displayName: featuredName.toUpperCase(),
                  logoUrl: brandLogos[featuredName]
                });
              }
            }
          }
          
          setBrands(featuredBrands);
        } else {
          console.error('Failed to fetch brands, using fallback data');
          // Create fallback data from the featuredBrandNames
          const fallbackData = featuredBrandNames.map(name => ({
            id: `fallback-${name}`,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            displayName: name.toUpperCase(),
            logoUrl: brandLogos[name]
          }));
          setBrands(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError('Failed to load brands');
        // Create fallback data from the featuredBrandNames
        const fallbackData = featuredBrandNames.map(name => ({
          id: `fallback-${name}`,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          displayName: name.toUpperCase(),
          logoUrl: brandLogos[name]
        }));
        setBrands(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBrands();
  }, []);

  const handleBrandClick = (brandid) => {
    // Navigate using URL parameter instead of state
    window.scrollTo(0, 0)
    console.log(`Navigating to brand: ${brandid}`);
    navigate(`/shop?brandId=${brandid}`);
  };

  const handleShowMoreClick = () => {
    navigate('/shop');
  };

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    customPaging: i => (
      <div
        className={`h-3 transition-all duration-300 ${currentSlide === i ? 'bg-black w-6' : 'bg-gray-300 w-3'} rounded-full`}
      />
    )
  };

  // Show only the first N brands in the slider
  const limitedBrands = brands.slice(0, visibleBrands);

  return (
    <div className="flex flex-col w-full">
      {/* Brand section with soft peach background */}
      <div className="bg-rose-50 py-16 px-6">
        <h2 className="text-4xl font-bold mb-8 text-center">SHOP BY BRANDS</h2>
        
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <>
              <Slider {...settings}>
                {limitedBrands.map((brand, index) => (
                  <div key={brand.id} className="px-4">
                    <motion.div
                      className="flex flex-col items-center cursor-pointer relative group"
                      whileHover={{ y: -10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleBrandClick(brand.id)}
                    >
                      <div className="flex items-center justify-center h-40 w-full">
                        <img 
                          src={brand.logoUrl} 
                          alt={brand.name} 
                          className="max-h-24 max-w-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentNode.innerHTML += `<div class="text-xl font-medium">${brand.name}</div>`;
                          }}
                        />
                        
                        {/* Show brand name on hover */}
                        <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                          {brand.name}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
              
              {/* Show More button */}
              <div className="flex justify-center mt-12">
                <button 
                  onClick={handleShowMoreClick}
                  className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  View All Brands
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Services section with icons background */}
      <div className="py-8 bg-white border-t border-gray-200 relative">
        <div className="bg-gray-50 bg-opacity-50 absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-6 gap-8 opacity-10">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="w-10 h-10">
                {i % 6 === 0 && <div className="w-10 h-10 border border-gray-300 rounded-full" />}
                {i % 6 === 1 && <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">%</div>}
                {i % 6 === 2 && <div className="w-8 h-10 border border-gray-300 rounded-sm" />}
                {i % 6 === 3 && <div className="w-10 h-8 border border-gray-300 rounded-sm" />}
                {i % 6 === 4 && <div className="w-10 h-10 border border-gray-300" />}
                {i % 6 === 5 && <div className="w-10 h-10 transform rotate-45 border border-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandSection;