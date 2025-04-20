import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Upload, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate()

  const authenticationSteps = [
    {
        icon: <Upload className="w-12 h-12 text-orange-500" />,
        title: 'UPLOAD IMAGES',
        description: 'Simply upload your photographs, and you\'ll get a response in 48-72 hours. Even provide immediate turnaround time! Please include the front, back, buckle, inside lining, and date code area of your hardware.'
      },
    {
      icon: <ShieldCheck className="w-12 h-12 text-orange-500" />,
      title: 'THE AUTHENTICATION PROCESS',
      description: 'Your item will always be validated by Our Expert Luxury Authenticators best in house & Third Party based out in the USA with decades of experience in this action.',
    },
    {
      icon: <Check className="w-12 h-12 text-orange-500" />,
      title: 'FAKE OR REAL',
      description: 'According to Tangerine Luxury\'s certification, if a thing is either REAL or FAKE, or we need more information, you can upgrade your order or anytime.',
    }
  ];

  const authenticatedServices = [
    'HANDBAG AUTHENTICATION (DOES NOT INCLUDE HERMÈS)',
    'FOOTWEAR AUTHENTICATION',
    'FINE JEWELLERY AUTHENTICATION',
    'APPARELS AUTHENTICATION',
    'ACCESSORIES AUTHENTICATION (BELTS, SCARF, TIE, ETC.)',
    'WATCHES',
    '24 HR TURNAROUND (ANY SERVICE EXCEPT WATCHES & FINE JEWELLERY)',
    'AUTHENTICITY CARD (SIZE OF AN ID CARD)',
    'AUTHENTICITY CARD (FINE JEWELLERY & WATCHES)',
    'ITEM IDENTIFICATION (INCLUDES STYLE NAME, MATERIAL, PATTERN, AND PRODUCTION DATE OR CIRCA)',
    'HERMÈS HANDBAGS (LEATHER & EXOTIC)'
  ];

  return (
    <div className="min-h-screen bg-white"  style={{backgroundColor:'#FAF9F6'}}>
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('https://tangerineluxury.com/wp-content/uploads/2023/11/handbag-authentication.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-white/80 p-12 rounded-xl shadow-2xl max-w-3xl mx-4"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            ARE YOU UNSURE IF A PIECE YOU PURCHASED IS ORIGINAL?
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            ACCIDENTALLY PURCHASED A COUNTERFEIT ITEM?
          </p>
          <p className="text-2xl font-semibold text-orange-600">
            DO YOU HAVE SECOND THOUGHTS?
          </p>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">HOW IT WORKS</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {authenticationSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all"
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e)=>{
                e.stopPropagation()
                navigate('/contact')
            }}
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Authenticate Now
          </motion.button>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            LUXURY AUTHENTICATION SERVICES WE OFFER
          </h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-4 bg-white rounded-xl shadow-lg p-8"
          >
            {authenticatedServices.map((service, index) => (
              <div 
                key={service} 
                className="flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <span>{service}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Terms & Conditions Mini Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">TERMS & CONDITIONS</h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-100 p-6 rounded-xl text-gray-700 max-w-4xl mx-auto"
        >
          <ul className="list-disc list-inside space-y-2">
            <li>Please be aware that the authentication process takes 48-72 hours.</li>
            <li>Weekends and public holidays can not included in the 24-hour turnaround service.</li>
            <li>Tangerine Luxury Authentications in the USA will provide a Certificate of Authenticity or in-Authenticity for all basic authentication services.</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Authentication;