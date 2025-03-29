import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function PrivacyPolicy() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.h1 
        className="text-4xl font-bold text-center mb-12 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        Privacy Policy
      </motion.h1>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        className="bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">ADVICE ON PRIVACY</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The privacy notice for Tangerineluxury.com is provided here.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree to and accept the practices outlined in this Privacy Notice by using the website Tangerineluxury.com.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Please carefully examine this Privacy Policy before using or submitting any information through or in connection with the Services. You acknowledge that your information will be gathered, used, and disclosed in accordance with this Privacy Policy if you use any aspect of the Services. DO NOT USE THE SERVICES IF YOU DO NOT AGREE TO THIS PRIVACY POLICY.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">INFORMATION WE RECEIVE</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Tangerine luxury will use a variety of methods to acquire data or information. Our information collection, including any incidental, consequential, or purely unintentional data, is limited to the needs of the website's transactions.
          </p>

          <h3 className="text-xl font-medium text-gray-800 mb-2">Information you voluntarily provide to us</h3>
          <p className="text-gray-700 leading-relaxed">
            Any information you voluntarily give us will be gathered by us. We may also obtain information from you in other ways, such as when you:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Open an account with Tangerine luxury</li>
            <li>Apply for membership to the Tangerine luxury website</li>
            <li>Use, buy, return, or conduct any other business on the website</li>
            <li>Get in touch with us or give us feedback</li>
            <li>Join our email list</li>
            <li>Provide information to us in any other way as a result of using www.tangerineluxury.com</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Examples of data could include: name, email address, age, phone number, mailing address, payment information, photo, location, and social network handles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">AUTOMATICALLY COLLECTED INFORMATION</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Information regarding the computer or devices (including mobile phones or tablets) you use to access the Services on the website may be automatically collected by us.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We may gather and examine:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Device information: IP addresses, location data, unique device identifiers, IMEI and TCP/IP addresses, browser types, browser languages, operating systems, mobile device carrier information</li>
            <li>Information about how you interact with the Services: referring and exit web pages, platform type, number of clicks, domain names, landing pages, pages and content viewed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">RETENTION PERIOD</h2>
          <p className="text-gray-700 leading-relaxed">
            Tangerine luxury will keep collected/provided information for a year following the date of a user's/last buyer's access to or transaction on the website. We keep the data we collect for as long as it takes to accomplish the goals outlined in this privacy statement, or for as long as we are required or permitted to do so by law. Information might last longer in copies created for backup and business continuity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">USE OF YOUR INFORMATION</h2>
          <p className="text-gray-700 leading-relaxed">We might use the data we learn about you to:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Offer and enhance services</li>
            <li>Create new features or services</li>
            <li>Promote and hasten internet transactions</li>
            <li>Secure the Services</li>
            <li>Provide technical and customer support</li>
            <li>Send account notifications or newsletters</li>
            <li>Process requests and provide responses</li>
            <li>Analyze and investigate user interactions</li>
            <li>Comply with law and protect safety, rights, and property</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">SECURITY MEASURES</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use Secure Sockets Layer (SSL) software and maintain security in accordance with International Standard IS/ISO/IEC 27001 on "Information Technology Security Techniques".
          </p>
          <p className="text-gray-700 leading-relaxed">
            We employ physical, electronic, and procedural safeguards when collecting, storing, and disclosing personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">USER RIGHTS AND CHOICES</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Email Unsubscribe: You can unsubscribe from marketing emails by emailing sales@Tangerineluxury.com</li>
            <li>Account Preferences: Update account information and communication preferences</li>
            <li>Right to revoke consent for data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">MINOR PROTECTION</h2>
          <p className="text-gray-700 leading-relaxed">
            Individuals under 18 cannot engage in direct transactions without a parent or guardian. We will take steps to remove personal information from children under 18 if discovered.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">CONTACT INFORMATION</h2>
          <p className="text-gray-700 leading-relaxed">
            For any questions about this privacy policy, contact:
            <br />
            <span className="font-medium">Email: sales@Tangerineluxury.com</span>
          </p>
        </section>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={sectionVariants}
        className="mt-12 text-center text-gray-500 text-sm"
      >
        Last Updated: March 2025
      </motion.div>
    </div>
  );
}

export default PrivacyPolicy;