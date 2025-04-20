import React from 'react';
import { motion } from 'framer-motion';

const Layaway = () => {
  const layawayDetails = [
    {
      title: "BRING YOUR DREAM BAG TO LIFE!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      description: "Did you know that we provide almost all of our items with a flexible 3-6 week layaway period at NO ADDITIONAL COST? To reserve your PRODUCT, just pay a 25% non-refundable deposit today. The remaining money is due at any time throughout the agreed time frame."
    },
    {
      title: "AFTER FULL PAYMENT, YOU OWN THE ITEM!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
      description: "Layaway is a type of payment plan in which a customer makes a deposit on an item or items to 'LAY AWAY' it for a later pick-up when they are able to pay the remaining balance. Additionally, layaway enables buyers to make incremental payments on the item(s) until the whole amount is paid."
    },
    {
      title: "We provide a 2 to 6 week layaway period",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "If you'd want to have a longer layaway term, you can also call our Customer Care Team at +91 7042039009 or send us an email at sales@tangerineluxury.com."
    }
  ];

  const layawayPeriods = [
    { price: "above INR 10,000 to INR 25,000", period: "2 weeks" },
    { price: "above INR 25,000 to INR 50,000", period: "3 weeks" },
    { price: "above INR 50,000 to INR 1,00,000", period: "4 weeks" },
    { price: "above INR 1,00,000", period: "5 weeks" }
  ];

  return (
    <div className="min-h-screen bg-white"  style={{backgroundColor:'#FAF9F6'}}>
      {/* Banner Section */}
      <div 
        className="h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('https://tangerineluxury.com/wp-content/uploads/2023/11/easy-shopping-smiling-caucasian-female-assistant-giving-purchases-client-clothing-showroom-1-scaled.jpg')",
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-white drop-shadow-lg z-10"
        >
          LAYAWAY
        </motion.h1>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {layawayDetails.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{detail.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{detail.title}</h3>
              <p className="text-gray-600">{detail.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Layaway Period Table */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-red-500 text-white text-center py-4">
            <h2 className="text-2xl font-bold">Layaway Period Details</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="py-3 px-4 text-left">SL. NO</th>
                <th className="py-3 px-4 text-left">IF THE PRODUCT IS PRICED</th>
                <th className="py-3 px-4 text-left">LAYAWAY PERIOD</th>
              </tr>
            </thead>
            <tbody>
              {layawayPeriods.map((period, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{period.price}</td>
                  <td className="py-3 px-4">{period.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Layaway;