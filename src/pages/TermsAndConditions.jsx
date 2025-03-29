import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const sections = [
  { title: 'User Terms', content: 'The subscriber is not expected to breach any laws by complying with conditions...'},
  { title: 'Terms and Conditions', content: 'According to the Information Technology Act 2000...'},
  { title: 'Company Model', content: 'Tangerine Luxury operates a hybrid model...'},
  { title: 'Collection Procedures', content: 'The collection procedure involves a verification process...'},
  { title: 'Process of Post-Authentication / Cost Analysis', content: 'Each item goes through an authentication process...'},
  { title: 'Valuation Procedures', content: 'The valuation process considers brand value, condition...'},
  { title: 'Listing Preloved', content: 'Preloved items must be authenticated before being listed...'},
  { title: 'Restoration Process', content: 'Some items undergo restoration to enhance value...'},
  { title: 'Sales of Refurbished and Preloved Items', content: 'All sales are final, and refunds are not provided...'},
  { title: 'Indemnity Clause', content: 'Tangerine Luxury holds no responsibility for losses incurred...'},
  { title: 'Disclaimer', content: 'All information is provided in good faith but without warranties...'},
  { title: 'Rules and Jurisdiction for Government', content: 'The courts in Faridabad hold exclusive jurisdiction...'},
  { title: 'Controversy Resolution', content: 'Any disputes shall be resolved amicably before arbitration...'},
  { title: 'Arbitration Informally', content: 'Disputes shall first be attempted to be resolved informally...'},
  { title: 'Arbitration. If:', content: 'If informal resolution fails, disputes proceed to formal arbitration...'}
];

function TermsAndConditions() {
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
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        Terms and Conditions
      </motion.h1>
      {sections.map((section, index) => (
        <motion.div
          key={index}
          className="mb-8"
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
          <p className="text-lg text-gray-700">{section.content}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default TermsAndConditions;
