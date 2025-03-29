import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import CategoryBanner from '../components/CategoryBanner';
import BrandsSale from '../components/BrandsSale';
import PopularProducts from '../components/PopularProducts';
import VersatileClothing from '../components/VersatileClothing';
import Testimonials from '../components/Testimonials';
import FashionBlog from '../components/FashionBlog';
import Newsletter from '../components/Newsletter';
import HomePage from '../components/HomePage';
import LoadingScreen from '../components/LoadingScreen';
import Popup from '../components/Popup';
import Categories from '../components/Categories';
import PrelovedLuxury from '../components/PrelovedLuxury'
import BrandSection from '../components/BrandSection';
import ServicesSection from '../components/ServiceSection';
import TangerineLuxuryHeader from '../components/TangerineLuxuryHeader';

function Home() {
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    // Show popup after a delay
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
    console.log('Popup closed from Home component');
    
    // Force removal of any popup elements after animation completes
    setTimeout(() => {
      // Remove any elements with the popup data attribute
      const popupElements = document.querySelectorAll("[data-popup-element='true']");
      popupElements.forEach(element => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      
      // Also look for any elements that might be leftovers from the popup
      const fixedElements = document.querySelectorAll(".fixed.inset-0.flex.items-center.justify-center");
      fixedElements.forEach(element => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
      
      // Reset any z-index styles that might be stuck
      document.body.style.zIndex = "auto";
      document.body.style.position = "static";
      document.body.style.overflow = "auto";
      
      // Force a CSS redraw to ensure all styles are updated
      window.dispatchEvent(new Event('resize'));
      
      console.log('Popup cleanup completed');
    }, 600); // Wait for animation to complete (slightly longer than the animation duration)
  };

  return (
    <div className="relative">
      <LoadingScreen />
      
      {/* Popup is rendered outside the main content flow */}
      <Popup isOpen={showPopup} onClose={handleClosePopup} />
      
      {/* Main content */}
      <div className={showPopup ? "" : ""}>
        <Banner />
        <HomePage />
        <Categories/>
        <CategoryBanner />
        <BrandSection/>
        <ServicesSection/>
        <FeaturedProducts />


        {/* <PrelovedLuxury /> 
          */}
                  {/* <PopularProducts /> */}

        <BrandsSale />
        <TangerineLuxuryHeader/>
        <VersatileClothing />
        <Testimonials />
        <FashionBlog />
        <Newsletter />
      </div>
    </div>
  );
}

export default Home;