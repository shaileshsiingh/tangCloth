import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img5.jpg';

const influencerVideos = [
  {
    id: 1,
    title: "Luxury Fashion Haul | Tangerine Luxury",
    influencer: "@fashionista_diaries",
    thumbnail: img1,
    videoUrl: "https://www.instagram.com/reel/C7D7vway-sR/?igsh=eXVheWhtNXZhN3ps",
    description: "Unboxing the most luxurious pieces from Tangerine Luxury's latest collection"
  },
  {
    id: 2,
    title: "Summer Collection Styling Tips",
    influencer: "@style_with_me",
    thumbnail: img2,
    videoUrl: "https://www.instagram.com/reel/DHOFqG2ykb7/?igsh=ZmVzZXo0NnFqbHh6",
    description: "How to style Tangerine Luxury's summer collection for different occasions"
  },
  {
    id: 3,
    title: "Luxury Fashion Review",
    influencer: "@luxury_lover",
    thumbnail: img3,
    videoUrl: "https://www.instagram.com/reel/DAA23D6SYAN/?igsh=ZzVtZ2F2aHQ2cTU3",
    description: "Detailed review of Tangerine Luxury's premium collection"
  },
  {
    id: 4,
    title: "Street Style Inspiration",
    influencer: "@urban_fashion",
    thumbnail: img4,
    videoUrl: "https://www.instagram.com/reel/DALZ55uSHfP/?igsh=c2JueGVsZ2F5cnJt",
    description: "Street style looks featuring Tangerine Luxury's latest pieces"
  },
  {
    id: 5,
    title: "Luxury Fashion Tips",
    influencer: "@fashion_expert",
    thumbnail: img5,
    videoUrl: "https://www.instagram.com/reel/Cy-38mbSYwl/?igsh=OWhidXE3bDhjcGho",
    description: "Expert tips on styling Tangerine Luxury's collection"
  },
  {
    id: 6,
    title: "Fashion Haul & Review",
    influencer: "@style_icon",
    thumbnail: img6,
    videoUrl: "https://www.instagram.com/reel/CzJA0_Sy1ml/?igsh=MWQwdXRoaWozZ2F6cw==",
    description: "Complete haul and review of Tangerine Luxury's new arrivals"
  }
];

function InfluencerVideos() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % influencerVideos.length);
    }, 3000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % influencerVideos.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + influencerVideos.length) % influencerVideos.length);
  };

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  // Helper function to calculate position and styling for each slide
  const getSlideStyles = (index) => {
    const position = (index - currentSlide + influencerVideos.length) % influencerVideos.length;
    let relativePosition = position;
    if (relativePosition > 2) relativePosition -= influencerVideos.length;
    if (relativePosition < -2) relativePosition += influencerVideos.length;
    
    const baseX = 50; // Increased spacing between slides
    const baseOpacity = 0.7;
    const baseScale = 0.80; // Increased scale for better visibility
    const baseZIndex = 10;
    
    let xPercent = 0;
    let opacity = 1;
    let scale = 1;
    let zIndex = baseZIndex + 2;
    
    switch (relativePosition) {
      case -2:
        xPercent = -baseX * 2;
        opacity = baseOpacity * 0.6;
        scale = baseScale * 0.9;
        zIndex = baseZIndex;
        break;
      case -1:
        xPercent = -baseX;
        opacity = baseOpacity;
        scale = baseScale;
        zIndex = baseZIndex + 1;
        break;
      case 0:
        xPercent = 0;
        opacity = 1;
        scale = 1;
        zIndex = baseZIndex + 2;
        break;
      case 1:
        xPercent = baseX;
        opacity = baseOpacity;
        scale = baseScale;
        zIndex = baseZIndex + 1;
        break;
      case 2:
        xPercent = baseX * 2;
        opacity = baseOpacity * 0.6;
        scale = baseScale * 0.9;
        zIndex = baseZIndex;
        break;
      default:
        opacity = 0;
        scale = 0.7;
        xPercent = (relativePosition > 0) ? baseX * 3 : -baseX * 3;
        zIndex = baseZIndex - 1;
    }
    
    return {
      transform: `translateX(${xPercent}%) scale(${scale})`,
      opacity,
      zIndex,
      visibility: opacity > 0 ? 'visible' : 'hidden'
    };
  };

  return (
    <section ref={ref} className="py-20" style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Influencer Style Guides</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get inspired by our fashion influencers as they showcase the latest trends and styling tips from Tangerine Luxury
          </p>
        </motion.div>

        <div className="relative w-full max-w-[2000px] mx-auto h-[600px] flex items-center justify-center overflow-hidden">
          {influencerVideos.map((video, index) => {
            const styles = getSlideStyles(index);
            const isActive = index === currentSlide;
            
            return (
              <motion.div
                key={video.id}
                className="absolute w-[400px] h-[500px] transform-gpu"
                initial={{ opacity: 0 }}
                animate={{
                  x: `${styles.transform.match(/translateX\(([^%]+)%\)/)[1]}%`,
                  scale: parseFloat(styles.transform.match(/scale\(([^)]+)\)/)[1]),
                  opacity: styles.opacity,
                  zIndex: styles.zIndex,
                  visibility: styles.visibility
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <div 
                  className="relative w-full h-full rounded-lg overflow-hidden shadow-lg cursor-pointer mx-4"
                  onClick={() => handleVideoClick(video.videoUrl)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-105"
                  />
                  
                  <div className={`absolute inset-0 bg-black ${isActive ? 'bg-opacity-10' : 'bg-opacity-30'}`}></div>
                  
                  <div className={`absolute inset-x-0 bottom-8 p-6 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="text-center">
                      <h3 className="text-white text-xl font-bold mb-2">{video.title}</h3>
                      <p className="text-white text-sm mb-4">by {video.influencer}</p>
                      <p className="text-white text-sm">{video.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 
              bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center 
              shadow-lg z-20 hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 
              bg-white bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center 
              shadow-lg z-20 hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
            <div className="flex space-x-2">
              {influencerVideos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-black w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfluencerVideos; 