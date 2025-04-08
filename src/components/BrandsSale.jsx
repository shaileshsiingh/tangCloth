import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const saleItems = [
  {
    id: 1,
    name: 'Long-sleeve T-Shirt',
    price: 'Rs 3900',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'White Shorts',
    price: 'Rs 2500.00',
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Sneakers',
    price: 'Rs4000.00',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

function BrandsSale() {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="grid grid-cols-2 gap-4">
            <motion.div className="col-span-2" whileHover={{ scale: 1.05 }}>
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Fashion collection"
                className="w-full h-96 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <img
                src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Fashion item"
                className="w-full h-48 object-cover rounded-lg"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Fashion item"
                className="w-full h-48 object-cover rounded-lg"
              />
            </motion.div>
          </div>
          
          <motion.div className="flex flex-col justify-center" initial={{ opacity: 0, y: -50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: 'easeOut' }}>
            <h2 className="text-4xl font-bold mb-6">Prestigious Brands' Goods Sale</h2>
            <p className="text-gray-600 mb-8">
              Explore unique finds, specially curated to celebrate all that fashion
              has to offer. Each piece tells a story, from classic designs to bold
              statement pieces.
            </p>
            
            <div className="space-y-6">
              {saleItems.map((item) => (
                <motion.div key={item.id} className="flex items-center space-x-4" whileHover={{ scale: 1.05 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button onClick={() => {
              window.scrollTo(0, 0);
              navigate('/shop');
            }} className="mt-8 bg-black text-white px-8 py-3 rounded-none hover:bg-gray-900 transition inline-flex items-center gap-2" whileHover={{ scale: 1.1 }}>
              SHOP COLLECTION
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BrandsSale;
