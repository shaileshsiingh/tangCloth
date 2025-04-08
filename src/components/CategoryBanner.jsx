import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CategoryBanner() {
  const navigate = useNavigate();

  // Fixed subcategory mapping with correct IDs
  const subcategoryMappings = {
    // Accessories subcategories by main category
    accessories: {
      men: "67d827fd03c676492cbbeb3c",    // Men's Accessories
      women: "67d8277e03c676492cbbeb39",  // Women's All Accessories
      kids: "67d828d103c676492cbbeb48"    // Kids' Accessories
    },
    // Clothing subcategories by main category
    clothing: {
      men: "67d8282003c676492cbbeb40",    // Men's Clothing
      women: "67d8276703c676492cbbeb33",  // Women's Clothing
      kids: "67d828ed03c676492cbbeb4d"    // Kids' Clothing
    },
    // Footwear subcategories by main category
    footwear: {
      men: "67d8283003c676492cbbeb44",    // Men's Footwear
      women: "67d8276003c676492cbbeb30",  // Women's Footwear
    },
    // Special case - Women's Bags
    bags: {
      women: "67d826ef03c676492cbbeb2d"   // Women's All Bags
    }
  };

  // Function to navigate to subcategory across all categories
  const handleSubcategoryTypeClick = (subcategoryType) => {
    // Simply log what was clicked and navigate to shop
    window.scrollTo(0, 0);
    console.log(`User clicked on ${subcategoryType} category`);
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
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 h-[600px] gap-2">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          className="relative group overflow-hidden cursor-pointer rounded-xl"
          onClick={() => handleSubcategoryTypeClick(category.id)}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-500" />
          <motion.div
            className="absolute bottom-8 left-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
            <motion.span
              className="text-sm uppercase tracking-wider border-b-2 border-white pb-1"
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
