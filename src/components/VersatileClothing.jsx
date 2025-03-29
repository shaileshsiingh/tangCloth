import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function VersatileClothing() {
  return (
    <section className="relative py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image with Left Animation */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Woman in casual wear"
              className="w-full h-[600px] object-cover rounded-lg shadow-xl"
            />
          </motion.div>

          {/* Text Content with Right Animation */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <h2 className="text-5xl font-extrabold mb-6 text-gray-900">
              Versatile Clothing For Style
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Maximize all great men attire, tailored-fit men suits, women's
              attire. Amet ut convallis est. Nam nunc erat, quis tempus ultrices
              ligula et amet, malesuada pellentesque diam.
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-16 py-4 text-lg font-semibold border border-black rounded-lg hover:bg-white hover:text-black hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                SHOP COLLECTION
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VersatileClothing;
