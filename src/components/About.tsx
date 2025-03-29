import { motion } from 'framer-motion';

// About Page Component with Animations
const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section with About Us */}
      <motion.div 
        className="relative w-full h-56 bg-gray-900 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            className="text-4xl font-bold text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ABOUT US
          </motion.h1>
        </div>
      </motion.div>

      {/* First Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-800 mb-4">
              Sell the items in your closet, so you can go shopping for what you actually want today.
            </p>
            <p className="text-gray-800">
              Set aside your preconceived notions about secondhand luxury and join us in the circular revolution.
            </p>
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://tangerineluxury.com/wp-content/uploads/2023/11/black-bag-from-brand-louis-vuitton-scaled.jpg" 
              alt="Luxury handbag" 
              className="w-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg"  
              alt="Tangerine Luxury Logo" 
              className="h-12"
            />
          </motion.div>
          <motion.h2 
            className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            TANGERINE LUXURY
          </motion.h2>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-800 max-w-3xl mx-auto mb-6">
              An online marketplace like "Tangerine Luxury" allows users to buy and sell pre loved women's, men's, and children's clothing and accessories.
            </p>
            <p className="text-gray-800 max-w-3xl mx-auto">
              Every single item in our collection was carefully chosen..! You won't need to worry about anything when you shop with us because each and every product meets the highest standards for both quality and style.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="relative w-full bg-gray-900 py-16">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h2 
            className="text-4xl font-bold text-white mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            WHO WE ARE
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {[
              "Tangerine Luxury is who we are. And we adore fashion tremendously. Fashion is incredibly good at generating desire and creating magical worlds.",
              "However, let's face it, the sector has also contributed to a number of the largest issues facing the planet.",
              "Overconsumption, Overproduction, Climate change, Workplace morals etc.",
              "For a more sustainable future, it is why we transform it. But it's not about having any less love for fashion.",
              "The world needs to love it more, in fact. Existing brands are most popular oft the planet. For a reason. It is referred to as pre-LOVED fashion."
            ].map((text, index) => (
              <motion.p 
                key={index} 
                className="text-white mb-6"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                {text}
              </motion.p>
            ))}
            
            <motion.p 
              className="text-white font-bold mt-12"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              "I know our minds no longer think LONG TERM, it's all about NOW, but it's about time we do."
            </motion.p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <motion.div 
              className="mb-8 md:mb-0"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center md:justify-start mb-4">
                <img 
                  src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg" 
                  alt="Tangerine Luxury Logo" 
                  className="h-10"
                />
              </div>
              <h3 className="text-lg font-bold mb-4">CONTACT INFO</h3>
              <div className="text-gray-600">
                <p>C Dass Group, 156, KC Road, New</p>
                <p>Industrial Township 5, Faridabad,</p>
                <p>Faridabad, Haryana, 121001</p>
                <p className="my-2">+91 7042039009</p>
                <p>+91 7042039009</p>
                <p className="my-2">hello@tangerineluxury.com</p>
                <p>Open Time: 11:00 AM - 7:00 PM</p>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;