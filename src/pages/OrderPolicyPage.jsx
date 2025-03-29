import React from 'react';
import { motion } from 'framer-motion';

const PolicyPage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Order and Return Policy Section */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <svg className="w-10 h-10 text-orange-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v-2h7v2z"/>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">Order and Return Policy</h2>
          </div>
          <p className="text-gray-600 mb-4">
            We encourage you to visit your Returns Page or get in touch with us directly to initiate a return request if you determine that an item isn't to correct fit for you. Within 24 hours of receiving the order, we must be notified of any returns or exchanges, and all returns must be returned back within 5 days of the delivery date. Your Returns would be impacted if you didn't do this.
          </p>
        </motion.div>

        {/* Our Guarantee Section */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-lg rounded-lg p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <svg className="w-10 h-10 text-green-500 mr-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800">Our Guarantee</h2>
          </div>
          <p className="text-gray-600">
            We will put things right if we list an item inaccurately or if there is an issue with your order or an item. Send us an email at salesTangerineluxury.com with a brief description of the problem, and we'll respond as quickly as we can.!
          </p>
        </motion.div>

        {/* Key Information Section */}
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Informations</h2>
          <ul className="space-y-4">
            {[
              "We must receive notification of the return within 24 hours of receiving the order in order to be eligible.",
              "Buyers are responsible for shipping back all returns to Tangerine Luxury. If you would want the return address, please contact your personal shopper.",
              "Everything must be in the same state as when you first acquired it. (New with Tags items must be returned with original tags attached, dust bag, Original Invoice, Authenticity Certificate etc.)",
              "There must be no damage to the product return tag.",
              "The item(s) purchased during the sale are non-refundable.",
              "Tangerine luxury has the right to refuse to accept the returned product or to withhold a specific amount in accordance with the harm suffered if the buyer fails to return the item in the same condition as it was supplied to him/her.",
              "In Tangerine luxury's shipping costs to return the item.",
              "All products bought under reduction will be considered sale.",
              "On all returns, we provide 6 month-valid exchanges and store credits equal to the purchase price. All store credits may be applied to a single transaction or several.",
              "During COVID-19 or any variations, NO returns on apparel will be accepted, not making much sense100% cashback will only be given if the product is proved fake. Within 15 days of receiving the merchandise, we require official confirmation from the brand on letterhead or via email that the item is not real. If you have any additional questions, please contact us to learn more.",
              "Once the goods are sold, Tangerine luxury is not liable for any color fading or change.",
              "Tangerine luxury does not accept returns for products that have color discrepancies that could be caused by digital photography.",
              "Please contact the Tangerine luxury support team at +91 704 202 9009 if an item is received damaged.",
              "When returning things, original shipping costs are non-refundable.",
              "Each and every dispute is subject to Faridabad's jurisdiction. Disclaimer: Order cancellations are only permitted within 24 hours after purchase for all orders."
            ].map((item, index) => (
              <motion.li 
                key={index}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                className="text-gray-600 flex items-start"
              >
                <svg className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyPage;