import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Men from '../assets/MEN.jpeg';
import Women from '../assets/WOMEN.jfif';
import Kids from '../assets/KIDS.jfif';

// Hero Slider Component
// function HeroSlider() {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(2); // Start with middle slide (index 2)
  
//   const slides = [
//     {
//       id: 1,
//       image: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Img-Gallery-3.png",
//       category: "shoes",
//       buttonText: "SHOP SHOES",
//       categoryId: null
//     },
//     {
//       id: 2,
//       image: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Img-Gallery-2.png",
//       category: "men",
//       buttonText: "SHOP MEN",
//       categoryId: "67c82a32ac6e3964ca7755f7"
//     },
    
//     {
//       id: 3,
//       image: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Img-Gallery-1.png",
//       category: "women",
//       buttonText: "SHOP WOMEN",
//       categoryId: "67c08f837f61f5f03104ec4b"
//     },
//     {
//       id: 4,
//       image: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Img-Gallery-4.png",
//       category: "kids",
//       buttonText: "SHOP KIDS",
//       categoryId: "67c9b33fb372a96364d09e3b"
//     },
//     {
//       id: 5,
//       image: "https://wamani.vercel.app/wp-content/uploads/2023/06/Home-6-Img-Gallery-5.png",
//       category: "bags",
//       buttonText: "SHOP BAGS",
//       categoryId: null
//     }
//   ];

//   const goToNextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//   };

//   const goToPrevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
//   };

//   const handleShopClick = (slide) => {
//     window.scrollTo(0, 0);
//     if (slide.categoryId) {
//       navigate(`/shop?category_id=${slide.categoryId}`);
//     } else {
//       navigate('/shop');
//     }
//   };

//   // Helper function to calculate position and styling for each slide
//   const getSlideStyles = (index) => {
//     // Calculate position relative to current slide
//     const position = (index - currentSlide + slides.length) % slides.length;
    
//     // Convert position to a value between -2 and 2
//     // -2: far left, -1: left, 0: center, 1: right, 2: far right
//     let relativePosition = position;
//     if (relativePosition > 2) relativePosition -= slides.length;
//     if (relativePosition < -2) relativePosition += slides.length;
    
//     // Base styles - increased horizontal offset for more space between slides
//     const baseX = 50; // Increased from 30 to 40 for even more spacing
//     const baseOpacity = 0.7; // Increased for better visibility of inactive slides
//     const baseScale = 0.78; // Slightly adjusted scale for better visibility
//     const baseZIndex = 10; // Base z-index
    
//     // Calculate properties based on position
//     let xPercent = 0;
//     let opacity = 1;
//     let scale = 0.9; // Active slide scale
//     let zIndex = baseZIndex + 2;
    
//     switch (relativePosition) {
//       case -2: // Far left
//         xPercent = -baseX * 2;
//         opacity = baseOpacity - 0.1;
//         scale = baseScale - 0.05;
//         zIndex = baseZIndex;
//         break;
//       case -1: // Left
//         xPercent = -baseX;
//         opacity = baseOpacity;
//         scale = baseScale;
//         zIndex = baseZIndex + 1;
//         break;
//       case 0: // Center (active)
//         xPercent = 0;
//         opacity = 1;
//         scale = 0.9;
//         zIndex = baseZIndex + 2;
//         break;
//       case 1: // Right
//         xPercent = baseX;
//         opacity = baseOpacity;
//         scale = baseScale;
//         zIndex = baseZIndex + 1;
//         break;
//       case 2: // Far right
//         xPercent = baseX * 2;
//         opacity = baseOpacity - 0.1;
//         scale = baseScale - 0.05;
//         zIndex = baseZIndex;
//         break;
//       default:
//         // Hide slides that are too far away
//         opacity = 0;
//         scale = 0.6;
//         xPercent = (relativePosition > 0) ? baseX * 2.5 : -baseX * 2.5;
//         zIndex = baseZIndex - 1;
//     }
    
//     return {
//       transform: `translateX(${xPercent}%) scale(${scale})`,
//       opacity,
//       zIndex,
//       visibility: opacity > 0 ? 'visible' : 'hidden'
//     };
//   };

//   return (
//     <div className="relative w-full max-h-[800px] overflow-hidden bg-gray-100 py-10" style={{backgroundColor:'#FAF9F6'}}>
//       {/* Added header section */}
//       <div className="text-center mb-1">
//         <h2 className="text-2xl md:text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">
//           Shop By Category
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto px-4">
//           Discover our carefully curated collections designed for every style and age.
//         </p>
//       </div>
      
//       {/* Slide Container */}
//       <div className="relative w-full h-[600px] flex items-center justify-center">
//         {slides.map((slide, index) => {
//           const styles = getSlideStyles(index);
//           const isActive = index === currentSlide;
          
//           return (
//             <motion.div
//               key={slide.id}
//               className="absolute w-full md:w-2/3 lg:w-1/2 xl:w-2/5 h-[500px] transform-gpu"
//               initial={{ opacity: 0 }}
//               animate={{
//                 x: `${styles.transform.match(/translateX\(([^%]+)%\)/)[1]}%`,
//                 scale: parseFloat(styles.transform.match(/scale\(([^)]+)\)/)[1]),
//                 opacity: styles.opacity,
//                 zIndex: styles.zIndex,
//                 visibility: styles.visibility
//               }}
//               transition={{ duration: 0.7, ease: "easeInOut" }}
//             >
//               <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
//                 <img
//                   src={slide.image}
//                   alt={slide.category}
//                   className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
//                 />
                
//                 {/* Overlay with different opacity based on active state */}
//                 <div className={`absolute inset-0 bg-black ${isActive ? 'bg-opacity-10' : 'bg-opacity-30'}`}></div>
                
//                 {/* Content positioned at the bottom of each slide */}
//                 <div className={`absolute inset-x-0 bottom-8 flex items-center justify-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
//                   <div className="text-center">
//                     {/* Button styled like in the example */}
//                     <button
//                       onClick={() => handleShopClick(slide)}
//                       className="bg-white text-gray-900 font-medium py-3 px-10 rounded-sm 
//                         transition duration-300 hover:bg-gray-100 hover:shadow-lg"
//                     >
//                       {slide.buttonText}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Navigation Arrows */}
//       <button
//         onClick={goToPrevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 
//           bg-white bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center 
//           shadow-md z-20 hover:bg-opacity-100 transition-all duration-300"
//         aria-label="Previous slide"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
      
//       <button
//         onClick={goToNextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 
//           bg-white bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center 
//           shadow-md z-20 hover:bg-opacity-100 transition-all duration-300"
//         aria-label="Next slide"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
//         <div className="flex space-x-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 currentSlide === index ? 'bg-white w-6' : 'bg-white bg-opacity-50'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// Categories Component
function Categories2() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.7 });
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 4;

  // Category ID mapping
  const categoryIds = {
    'men': '67c82a32ac6e3964ca7755f7',
    'women': '67c08f837f61f5f03104ec4b',
    'kids': '67c9b33fb372a96364d09e3b'
  };
  
  // Updated category images
  const categoryImages = {
    'women': Women,
    'men': Men,
    'kids': Kids
  };
  
  const API_URL = '/api';
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true); 
        const response = await fetch(`${API_URL}/category/getAllCategory`);
        // const response = await fetch(`http://91.203.135.152:2001/api/category/getAllCategory`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        const filteredCategories = data.data.category.filter(cat =>
          ['men', 'women', 'kids'].includes(cat.name.toLowerCase())
        );
        const categoriesWithUpdatedImages = filteredCategories.map(cat => {
          const categoryName = cat.name.toLowerCase();
          return { ...cat, image: categoryImages[categoryName] || cat.image };
        });
        setCategories(categoriesWithUpdatedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Auto-scroll logic
  // useEffect(() => {
  //   if (categories.length <= 3) return;
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % categories.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [categories.length]);

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };
  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleCategoryClick = (category) => {
    window.scrollTo(0, 0);
    const categoryName = category.name.toLowerCase();
    const categoryId = categoryIds[categoryName];
    if (categoryId) {
      navigate(`/shop?category_id=${categoryId}`);
    } else {
      navigate('/shop');
    }
  };

  // Get visible items for the current window (classic carousel logic)
  const getVisibleCategories = () => {
    if (categories.length <= itemsToShow) return categories;
    let visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(categories[(currentIndex + i) % categories.length]);
    }
    return visible;
  };

  return (
    <div ref={ref} className="container mx-auto px-2 sm:px-4 py-4 md:py-8" style={{backgroundColor:'#FAF9F6'}}>
      <div className="text-center mb-4 md:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-3 tracking-tight">
          Shop By Category
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-2 md:px-4">
          Discover our carefully curated collections designed for every style and age.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-8 md:py-12">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 md:py-12">
          <p className="text-red-600 text-base md:text-lg font-semibold">{error}</p>
        </div>
      ) : (
        <div className="relative" style={{ minHeight: '280px' }}>
          <div className="flex items-center justify-center relative" style={{ minHeight: '280px' }}>
            <div className="flex justify-center items-center w-full overflow-x-auto" style={{ minHeight: '280px' }}>
              {getVisibleCategories().map((category) => (
                <div key={category._id} className="w-[280px] sm:w-[300px] h-[280px] sm:h-[340px] flex-shrink-0 mx-2 sm:mx-4 flex flex-col justify-center">
                  <motion.div
                    className="group text-center h-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div 
                      onClick={() => handleCategoryClick(category)}
                      className="cursor-pointer flex flex-col items-center p-2 h-full"
                    >
                      <div className="w-full h-[260px] sm:h-[320px] aspect-square rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-blue-500/30">
                        <img
                          src={category.image}
                          alt={category.name.toUpperCase()}
                          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <h3 className="text-sm md:text-base font-semibold tracking-wider text-gray-800 transition-colors duration-300 mt-2 md:mt-4 group-hover:text-blue-600 uppercase">
                        {category.name.toUpperCase()}
                      </h3>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Main HomePage Component that combines both
function Categories() {
  return (
    <div className="flex flex-col">
      {/* <HeroSlider /> */}
      <Categories2 />
    </div>
  );
}

export default Categories;