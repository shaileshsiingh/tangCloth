import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Team working together" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About wamani</h2>
              <p className="text-gray-600 mb-6">
                We are a team of passionate developers, designers, and digital strategists dedicated to creating exceptional software solutions. With years of experience in the industry, we understand what it takes to build successful digital products.
              </p>
              <p className="text-gray-600 mb-8">
                Our mission is to help businesses thrive in the digital age by providing innovative, scalable, and user-friendly solutions that drive growth and success.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-3xl font-bold text-black mb-2">50+</h3>
                  <p className="text-gray-600">Projects Completed</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-black mb-2">30+</h3>
                  <p className="text-gray-600">Happy Clients</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-black mb-2">15+</h3>
                  <p className="text-gray-600">Team Members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
