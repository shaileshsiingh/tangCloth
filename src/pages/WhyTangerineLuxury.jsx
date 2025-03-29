import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldCheck, Globe, Leaf, Gift } from 'lucide-react';

export default function WhyTangerineLuxury() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gradient-to-b from-white to-orange-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          WHY TANGERINE LUXURY ?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          "Tangerine Luxury" is India's first entrupy verified portal to buy and sell pre-owned, authenticated luxury online.
        </p>
      </motion.div>

      <div className="space-y-16">
        <Section
          Icon={ShieldCheck}
          title="ENTRUPY BENEFIT FOREVER?"
          text="On returns, rescan to confirm identity. Entrupy Fingerprinting verifies an item's identity, ensuring that a returned item is the same as the one sold."
          imageUrl="https://tangerineluxury.com/wp-content/uploads/2023/11/fasdasd111111-1-1-1-1-1024x682.jpg"
          reverse
        />

        <Section
          Icon={Camera}
          title="SELL & BUY SAFELY AND CONFIDENTLY"
          text="Identity, clarity, authenticity, and ownership are essential to a brand's success. We ensure that you are secured in every transaction."
          imageUrl="https://tangerineluxury.com/wp-content/uploads/2023/11/pretty-woman-shopping-shoes-1-1024x683.jpg"
        />

        <Section
          Icon={Globe}
          title="DISCREET & SECURE TRANSACTIONS"
          text="Our goal is to make sure that both buyers and sellers have a safe and easy experience. We ensure strict confidentiality and industry-standard encryption."
          imageUrl="https://tangerineluxury.com/wp-content/uploads/2023/11/ytrfg.png"
          reverse
        />

        <Section
          Icon={Gift}
          title="EXPERIENCE ONE-STOP SHOPPING"
          text="An excellent site to shop for both adults and children. A wide range of styles, brands, sizes, and price points available for selection."
          imageUrl="https://tangerineluxury.com/wp-content/uploads/2023/11/qwertyerwerwer.png"
        />

        <Section
          Icon={Leaf}
          title="ENVIRONMENTALLY CONSCIOUS"
          text="When you purchase from 'Tangerine Luxury,' you help reduce the environmental effect of the fashion industry. Every order you place contributes to a better future."
          imageUrl="https://tangerineluxury.com/wp-content/uploads/2023/11/qwerty.png"
          reverse
        />
      </div>
    </div>
  );
}

function Section({ Icon, title, text, imageUrl, reverse }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: reverse ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center gap-8 bg-white shadow-lg rounded-xl overflow-hidden`}
    >
      <div className="md:w-1/2 relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-orange-500 text-white p-3 rounded-full shadow-lg">
          <Icon className="w-8 h-8" />
        </div>
      </div>
      
      <div className="md:w-1/2 p-8 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 border-b-4 border-orange-500 pb-2">
          {title}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {text}
        </p>
        <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
          Learn More
        </button>
      </div>
    </motion.div>
  );
}