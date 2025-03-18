import React from 'react';
    import { Github, Linkedin, Twitter } from 'lucide-react';

    function Footer() {
      return (
        <footer className="bg-white text-black py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Tangerine</h3>
                <p className="text-gray-600 mb-4">
                Tangerine is a platform that allows you to buy and sell products online.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-black transition">
                    <Github size={24} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black transition">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-black transition">
                    <Twitter size={24} />
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Know Us</h4>
                <ul className="space-y-2">
                  <li><a href="/about" className="text-gray-600 hover:text-black transition">About Store</a></li>
                  <li><a href="/about" className="text-gray-600 hover:text-black transition">Store Location</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">FAQ</a></li>
                  <li><a href="/contact" className="text-gray-600 hover:text-black transition">Contact Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Awards</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
                <ul className="space-y-2">
                  <li><a href="/order-and-return" className="text-gray-600 hover:text-black transition">Orders & Returns</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Promote Your Product</a></li>
                  <li><a href="/order-and-return" className="text-gray-600 hover:text-black transition">Order Tracking</a></li>
                  <li><a href="/user-details" className="text-gray-600 hover:text-black transition">Your Account</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Press Release</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Information</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Terms & Condition</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Delivery Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Cancellation Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-black transition">Advanced Search</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-300 mt-12 pt-8 text-center text-gray-600">
              <p>© {new Date().getFullYear()} Wedesigntech. All Rights Reserved</p>
            </div>
          </div>
        </footer>
      );
    }

    export default Footer;
