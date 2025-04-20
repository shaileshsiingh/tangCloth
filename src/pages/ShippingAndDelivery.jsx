import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTruck, FaGlobeAmericas, FaPlaneDeparture } from 'react-icons/fa';

function ShippingAndDelivery() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto"  style={{backgroundColor:'#FAF9F6'}}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-8">SHIPPING INFORMATION</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Domestic Shipping */}
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center text-center p-6"
        >
          <div className="mb-6">
            <FaTruck size={48} />
          </div>
          <h3 className="font-bold text-lg mb-4">DOMESTIC SHIPPING</h3>
          <p className="text-sm">
            Tangerine luxury charges a flat shipping rate of Rs 500 for all of India.
          </p>
        </motion.div>
        
        {/* Worldwide Shipping */}
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center text-center p-6"
        >
          <div className="mb-6">
            <FaGlobeAmericas size={48} />
          </div>
          <h3 className="font-bold text-lg mb-4">WORLDWIDE SHIPPING</h3>
          <p className="text-sm">
            Import duties, taxes, customs fees, or shipping costs are not included in the prices of the products featured on Tangerine luxury. These are all additional costs that the buyer will pay. It is advised that a foreign purchaser confirms all of the aforementioned expenses with the customs office in their country. ON DELIVERY PAYMENT.
          </p>
          <p className="text-sm mt-4">
            Cash on Delivery (COD) is offered throughout India. Please reach out to our Personal Shopper Team at +91 701-045-045 or sales@tangerineluxury.com for any additional assistance.
          </p>
        </motion.div>
        
        {/* Departure Times */}
        <motion.div 
          variants={variants}
          initial="hidden"
          animate={controls}
          className="flex flex-col items-center text-center p-6"
        >
          <div className="mb-6">
            <FaPlaneDeparture size={48} />
          </div>
          <h3 className="font-bold text-lg mb-4">DEPARTURE TIMES</h3>
          <p className="text-sm">
            Tangerine luxury makes every effort to ship all orders within 7 to 10 days of the purchase date, however delays are beyond our control. Domestic deliveries can be made within 15 days of the purchase date, and deliveries to Delhi/NCR can be made in 7 to 12 days. From the date of dispatch, international deliveries could take up to 20 to 25 days.
          </p>
        </motion.div>
      </div>
      
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-8">PURCHASE METHODS</h2>
        <p className="mb-4">We provide Cash on Delivery (COD) throughout India. For the most COD Value, please get in touch with Our Personal Shopper Team.</p>
        <p className="mb-8">We take all major credit and debit cards, including American Express, Mastercard, and Visa.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Bank Transfer */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="3" />
                <text x="50" y="60" fontSize="40" textAnchor="middle" fill="black">$</text>
              </svg>
            </div>
            <h3 className="font-bold mb-2">Bank Transfer</h3>
            <p className="text-sm text-center">
              For more help, get in touch with Our Personal Shopper Team.
            </p>
          </div>
          
          {/* Paytm */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <img src="https://d1.awsstatic.com/Paytm-Logo.516dcbea24a48dc1f0187700fbd0f6a48f9a18c3.png" alt="Paytm" className="w-full" />
            </div>
            <h3 className="font-bold mb-2">Paytm</h3>
            <p className="text-sm text-center">
              For more help, get in touch with Our Personal Shopper Team.
            </p>
          </div>
          
          {/* Cheque */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center mb-4">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <rect x="10" y="30" width="80" height="40" fill="none" stroke="black" strokeWidth="2" />
                <line x1="20" y1="50" x2="70" y2="50" stroke="black" strokeWidth="2" />
                <line x1="20" y1="60" x2="50" y2="60" stroke="black" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="font-bold mb-2">Cheque</h3>
            <p className="text-sm text-center">
              Cheque payments are only accepted in very specific circumstances, and the merchandise is delivered once the check has cleared.
            </p>
          </div>
        </div>
        
        <p className="mt-8">
          Please get in touch with Our Personal Shopper Team if you need more help.
        </p>
      </motion.div>
    </div>
  );
}

export default ShippingAndDelivery;