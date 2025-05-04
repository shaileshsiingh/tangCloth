import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function VersatileClothing() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <section className="relative py-20 bg-gray-100" style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Video with Left Animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group overflow-hidden rounded-xl shadow-2xl flex justify-center"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-[520px] h-[700px] object-cover transform transition-transform duration-700 group-hover:scale-105"
            >
              <source
                src="https://neytri.wpengine.com/wp-content/uploads/2023/06/home5-video-Copy-01_1-output.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Right Content - Styled as in the screenshot */}
          <motion.div
            className="flex flex-col justify-center h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Fashion that is<br />always in style
            </h1>
            <p className="text-base text-gray-700 mb-8 max-w-xl">
              Discover timeless pieces and modern essentials designed to elevate your wardrobe. Embrace effortless elegance and comfort with our curated collection, perfect for every occasion and every season.
            </p>
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-1 bg-white/80 rounded-lg p-4 shadow border border-gray-200 flex flex-col items-start">
                <span className="font-bold text-lg text-gray-900 mb-1">Natural Clothes</span>
                <span className="text-gray-700 text-sm">Experience the luxury of breathable, eco-friendly fabrics that keep you feeling fresh and confident all day long.</span>
              </div>
              <div className="flex-1 bg-white/80 rounded-lg p-4 shadow border border-gray-200 flex flex-col items-start">
                <span className="font-bold text-lg text-gray-900 mb-1">Best Designs</span>
                <span className="text-gray-700 text-sm">Stand out with our exclusive styles, crafted for those who appreciate quality, detail, and unique fashion statements.</span>
              </div>
            </div>
            <motion.button
              onClick={() => handleNavigation('/about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-6 py-4 text-base font-semibold rounded-md 
                hover:bg-white hover:text-black hover:shadow-xl transition-all duration-300 
                ease-in-out cursor-pointer border-2 border-black tracking-widest"
            >
              VIEW FULL STORY
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VersatileClothing;
