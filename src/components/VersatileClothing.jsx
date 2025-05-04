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
          {/* Image with Left Animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group overflow-hidden rounded-xl shadow-2xl"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-105"
            >
              <source
                src="https://neytri.wpengine.com/wp-content/uploads/2023/06/home5-video-Copy-01_1-output.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Text Content with Right Animation */}
          <motion.div
            className="text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Versatile Clothing For Style
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              Maximize all great men attire, tailored-fit men suits, women's
              attire. Amet ut convallis est. Nam nunc erat, quis tempus ultrices
              ligula et amet, malesuada pellentesque diam.
            </p>
            <motion.button
              onClick={() => handleNavigation('/shop')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-8 py-4 text-lg font-semibold rounded-lg 
                hover:bg-white hover:text-black hover:shadow-xl transition-all duration-300 
                ease-in-out cursor-pointer border-2 border-black"
            >
              SHOP COLLECTION
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VersatileClothing;
