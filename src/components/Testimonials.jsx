import React from 'react';
import { motion } from 'framer-motion';

function Testimonials() {
  const testimonials = [
    {
      text: <div>Our concept ❤️🌿<br />"At <strong>Tangerine Luxury</strong>, we've reimagined luxury as something accessible to all through an eco-friendly online platform for buying and selling pre-loved luxurious items, because we believe it's your moment to embrace the luxury you adore."</div>,
      role: 'Company Vision'
    },
    {
      text: <div>What is 'pre-loved' luxury? 👜♻️<br />Previously owned, but still cherished. Rediscover luxury fashion sustainably."</div>,
      role: 'Our Definition'
    },
    {
      text: <div>Our concept ❤️♻️<br />Prioritizing sustainability in fashion is paramount. We're all about mindful, earth-friendly, and affordable luxury through pre-loved designer accessories with trusted authenticity."</div>,
      role: 'Sustainability Mission'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">What Our Community Says</h2>
          <p className="text-gray-600">Discover the Tangerine Luxury experience through our community's stories</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <div className="flex-grow">
                <div className="text-gray-600 italic mb-4">
                  {testimonial.text}
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
