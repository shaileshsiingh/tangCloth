import React from 'react';
import { Link } from 'react-router-dom';
    function VersatileClothing() {
      return (
        <section className="relative py-20">      
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Woman in casual wear"
                  className="w-full h-[600px] object-cover rounded-lg"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold mb-4">Versatile Clothing's For Style</h2>
                <p className="text-gray-600 mb-8">
                  Maximize all great men attire, tailored-fit men suits, women's attire. Amet ut convallis est. Nam nunc erat, quis tempus ultrices ligula et amet, malesuada pellentesque diam.
                </p>
                <Link to="/shop">
                <button                 className="bg-black text-white px-14 py-4 border border-white rounded-lg hover:bg-white hover:text-black hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out"              >
                
                  SHOP COLLECTION
                </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    }

    export default VersatileClothing;
