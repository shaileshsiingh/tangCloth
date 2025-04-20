import React from 'react';
import { useNavigate } from 'react-router-dom';

function ServicesSection() {
  const navigate = useNavigate();

  const services = [
    {
      title: "BIO CLEANING",
      description: "Professional cleaning services for luxury items.",
      imageUrl: "https://wamani.vercel.app/wp-content/uploads/2023/05/insta-01.jpg",
      link: "/bio-cleaning",
    },
    {
      title: "AUTHENTICATION",
      description: "Verify the authenticity of luxury products.",
      imageUrl: "https://wamani.vercel.app/wp-content/uploads/2023/05/insta-04.jpg",
      link: "/authentication",
    },
    {
      title: "PRIVATE VIEWING",
      description: "Exclusive appointments to view premium collections.",
      imageUrl: "https://wamani.vercel.app/wp-content/uploads/2023/05/insta-06.jpg",
      link: "/private-viewing",
    },
    {
      title: "REQUEST A PRODUCT",
      description: "Exclusive appointments to view premium collections.",
      imageUrl: "https://wamani.vercel.app/wp-content/uploads/2023/05/insta-03.jpg",
      link: "/request-product",
    },
  ];
  
  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className="w-full bg-white py-12"  style={{backgroundColor:'#FAF9F6'}}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">OUR SERVICES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={service.imageUrl}
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="bg-pink-100 text-pink-900 px-6 py-2 rounded-full font-medium text-center w-auto cursor-pointer"
                onClick={() => handleNavigation(service.link)}
              >
                {service.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background pattern similar to the image */}
      <div className="absolute inset-0 -z-10 opacity-5">
        {/* This would be where the pattern goes, represented by placeholder */}
      </div>
    </div>
  );
}

export default ServicesSection;