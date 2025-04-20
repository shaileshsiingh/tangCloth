import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CategoryBanner() {
  const navigate = useNavigate();

  const subcategoryMappings = {
    accessories: {
      men: "67d827fd03c676492cbbeb3c",
      women: "67d8277e03c676492cbbeb39",
      kids: "67d828d103c676492cbbeb48"
    },
    clothing: {
      men: "67d8282003c676492cbbeb40",
      women: "67d8276703c676492cbbeb33",
      kids: "67d828ed03c676492cbbeb4d"
    },
    footwear: {
      men: "67d8283003c676492cbbeb44",
      women: "67d8276003c676492cbbeb30"
    },
    bags: {
      women: "67d826ef03c676492cbbeb2d"
    }
  };

  const handleSubcategoryTypeClick = (subcategoryType) => {
    window.scrollTo(0, 0);
    navigate('/shop');
  };

  const categories = [
    {
      id: "accessories",
      title: "Accessories",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "clothing",
      title: "Clothing",
      image:
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "footwear",
      title: "Footwear",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: "bags",
      title: "Bags",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-4 py-4"  style={{backgroundColor:'#FAF9F6'}}>
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          className="relative group cursor-pointer rounded-xl overflow-hidden aspect-[4/5]"
          onClick={() => handleSubcategoryTypeClick(category.id)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500" />
          <motion.div
            className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              {category.title}
            </h3>
            <motion.span
              className="text-xs sm:text-sm uppercase tracking-wider border-b-2 border-white pb-0.5"
              whileHover={{ letterSpacing: "2px" }}
            >
              Shop Now
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}

export default CategoryBanner;
