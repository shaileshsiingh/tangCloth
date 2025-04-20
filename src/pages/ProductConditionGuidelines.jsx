import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, Tag, Star, Gem, ShoppingBag, Award } from 'lucide-react';

function ProductConditionGuidelines() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const conditions = [
    {
      title: "New With Tags",
      description: "Products under the Condition New, have never been used. They come with tags, packaging and dustbags.",
      image: "https://tangerineluxury.com/wp-content/uploads/2023/11/with-tags-1024x1024.jpg",
      icon: Tag
    },
    {
      title: "New Without Tags",
      description: "Products under this category are new, have never been used or worn. They are in mint condition. Tags might be missing.",
      image: "https://tangerineluxury.com/wp-content/uploads/2023/11/without-tags-1-1024x1024.jpg",
      icon: CheckCircle2
    },
    {
      title: "Pristine",
      description: "Products are as good as new with insignificant sign of usage or no visible sign of usage. They are in pristine condition.",
      image: "https://tangerineluxury.com/wp-content/uploads/2023/11/pristine-1-1024x1024.jpg",
      icon: Star
    },
    {
      title: "Good Condition",
      description: "Products under this condition are previously worn with minor or no visible flaws and/or no significant wear & tear.",
      image: "https://tangerineluxury.com/wp-content/uploads/2023/11/fasdasd111111-1-1-1-1-1024x682.jpg",
      icon: Gem
    },
    {
      title: "Gently Used",
      description: "Products under this condition are previously worn with minor visible flaws and little wear & tear.",
      image: "https://images.unsplash.com/photo-1611010344444-5f9e4d86a6e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      icon: ShoppingBag
    },
    {
      title: "Used Fairly Well",
      description: "Products under this category are fairly used and have some signs of usage. Some fading or cracks on the products are visible.",
      image: "https://tangerineluxury.com/wp-content/uploads/2023/11/good-condition-1024x1024.jpg",
      icon: Award
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-orange-50 py-20"  style={{backgroundColor:'#FAF9F6'}}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1 
          className="text-5xl font-bold text-center mb-16 text-gray-800 tracking-tight"
          initial="hidden"
          animate={controls}
          variants={variants}
          ref={ref}
        >
          PRODUCT CONDITION GUIDELINES
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              initial="hidden"
              animate={controls}
              variants={{
                ...variants,
                visible: { 
                  ...variants.visible,
                  transition: { 
                    type: 'spring', 
                    stiffness: 100, 
                    damping: 15,
                    delay: index * 0.2 
                  }
                }
              }}
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={condition.image} 
                  alt={condition.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg">
                  <condition.icon className="w-8 h-8" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-4 border-orange-500 pb-2">
                  {condition.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {condition.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductConditionGuidelines;