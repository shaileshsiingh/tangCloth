import React from 'react';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 border-b">
        <nav className="text-sm">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-black">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-800">Contact</li>
          </ol>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Feel Free To Contact Us</h2>
            <p className="text-gray-600 mb-8">
              Porttitor eget dolor morbi non arcu risus quis varius. Venenatis
              a condimentum vitae sapien pellentesque habitant morbi tristique.
            </p>
            
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:border-black resize-none"
                ></textarea>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="save-info"
                  className="mr-2 border-gray-300 rounded"
                />
                <label htmlFor="save-info" className="text-gray-600 text-sm">
                  Save my name, email, and website in this browser
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 hover:bg-gray-900 transition-colors"
              >
                SUBMIT NOW
              </button>
            </form>
          </div>

          {/* Contact Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Contact Us"
              className="w-full h-[475px] object-cover"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Locate Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Find Us */}
            <div>
              <h3 className="font-bold mb-4">Find Us</h3>
              <p className="text-gray-600">
                2301 Ravenswood Rd<br />
                Madison, WI 53711<br />
                United Kingdom
              </p>
            </div>

            {/* Email */}
            <div>
              <h3 className="font-bold mb-4">Email</h3>
              <p className="text-gray-600">
                info@example.com<br />
                support@example.com
              </p>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="font-bold mb-4">Working Hours</h3>
              <p className="text-gray-600">
                Mon-Fri: 8 AM - 5 PM<br />
                Sat-Sun: 8 AM - 2 PM
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 h-[400px] bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645004576187!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 