import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white text-black py-12 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <img 
              src={'https://tangerineluxury.com/wp-content/uploads/2023/09/Layer-1111111.png'} 
              alt="logo" 
              className="mb-6 max-w-[200px]"
            />
            <h2 className='text-2xl font-bold mb-4'>
              Contact Info
            </h2>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                C Dass Group, 156, KC Road, New Industrial Township 5, Faridabad, Haryana, 121001
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 7042039009
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sales@tangerineluxury.com
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Open Time: 11:00 AM - 7:00 PM
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-black hover:text-orange-500 transition-colors duration-300">
                <Github size={28} />
              </a>
              <a href="#" className="text-black hover:text-orange-500 transition-colors duration-300">
                <Linkedin size={28} />
              </a>
              <a href="#" className="text-black hover:text-orange-500 transition-colors duration-300">
                <Twitter size={28} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2">ABOUT TANGERINE LUXURY</h4>
            <ul className="space-y-2">
              {[
                { text: 'About us', link: '/about' },
                { text: 'Our Founder', link: '/our-founder' },
                { text: 'Our Mission', link: '/our-mission' },
                { text: 'Why Tangerine Luxury', link: '/why-tangerine-luxury' },
                { text: 'Authenticity', link: '/authentication' },
                { text: 'Product Condition Guidelines', link: '/product-condition-guidelines' },
                { text: 'Terms and Conditions', link: '/terms-and-conditions' },
                { text: 'Orders and Returns', link: '/order-policy' },
                { text: 'Privacy Policy', link: '/privacy-policy' },
                { text: 'Shipping and Delivery', link: '/shipping-and-delivery' },
                { text: 'Contact Us', link: '/contact' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.link} 
                    className="text-gray-700 hover:text-orange-500 hover:pl-2 transition-all duration-300 inline-block"
                  >
                    • {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2">MY ACCOUNT</h4>
            <ul className="space-y-2">
              {[
                { text: 'Sign in', link: '/login' },
                { text: 'My Wishlist', link: '/wishlist' },
                { text: 'Track My Order', link: 'https://www.shiprocket.in/shipment-tracking/' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.link} 
                    className="text-gray-700 hover:text-orange-500 hover:pl-2 transition-all duration-300 inline-block"
                  >
                    • {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2">FAQ'S</h4>
            <ul className="space-y-2">
              {[
                { text: 'Buyer FAQ\'s', link: '/buyer-faqs' },
                { text: 'Seller FAQ\'s', link: '/seller-faqs' },
                { text: 'Sell With Us', link: '/sell-with-us' },
                { text: 'TL Elite', link: '/tl-elite' },
                { text: 'Layaway', link: '/layaway' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.link} 
                    className="text-gray-700 hover:text-orange-500 hover:pl-2 transition-all duration-300 inline-block"
                  >
                    • {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Tangerine Luxury. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;