import React from 'react';
    import { ArrowRight } from 'lucide-react';

    function Newsletter() {
      return (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Sign up for Newsletter</h2>
              <p className="text-gray-600 mb-8">
                Nulla tincidunt risam convallis itunu vatna bibendum. Sed estas, massa.
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                />
                <button className="bg-black text-white px-6 py-3 hover:bg-gray-900 transition flex items-center gap-2">
                  Subscribe
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <a href="#" className="text-gray-600 hover:text-black transition mx-2">FB</a>
                <a href="#" className="text-gray-600 hover:text-black transition mx-2">IN</a>
                <a href="#" className="text-gray-600 hover:text-black transition mx-2">TW</a>
              </div>
            </div>
          </div>
        </section>
      );
    }

    export default Newsletter;
