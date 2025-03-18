
const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section with About Us */}
      <div className="relative w-full h-56 bg-gray-900 flex items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl font-bold text-white">ABOUT US</h1>
        </div>
      </div>

      {/* First Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2">
            <p className="text-gray-800 mb-4">
              Sell the items in your closet, so you can go shopping for what you actually want today.
            </p>
            <p className="text-gray-800">
              Set aside your preconceived notions about secondhand luxury and join us in the circular revolution.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="	https://tangerineluxury.com/wp-content/uploads/2023/11/black-bag-from-brand-louis-vuitton-scaled.jpg" 
              alt="Luxury handbag" 
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img 
                     src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg"  

              alt="Tangerine Luxury Logo" 
              className="h-12"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">TANGERINE LUXURY</h2>
          
          <p className="text-gray-800 max-w-3xl mx-auto mb-6">
            An online marketplace like "Tangerine Luxury" allows users to buy and sell pre loved women's, men's, and children's clothing and accessories.
          </p>
          <p className="text-gray-800 max-w-3xl mx-auto">
            Every single item in our collection was carefully chosen..! You won't need to worry about anything when you shop with us because each and every product meets the highest standards for both quality and style.
          </p>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="relative w-full bg-gray-900 py-16">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">WHO WE ARE</h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-white mb-6">
              Tangerine Luxury is who we are. And we adore fashion tremendously. Fashion is incredibly good at generating desire and creating magical worlds.
            </p>
            
            <p className="text-white mb-6">
              However, let's face it, the sector has also contributed to a number of the largest issues facing the planet.
            </p>
            
            <p className="text-white mb-6">
              Overconsumption, Overproduction, Climate change, Workplace morals etc.
            </p>
            
            <p className="text-white mb-6">
              For a more sustainable future, it is why we transform it. But it's not about having any less love for fashion.
            </p>
            
            <p className="text-white mb-6">
              The world needs to love it more, in fact. Existing brands are most popular oft the planet. For a reason. It is referred to as pre-LOVED fashion.
            </p>
            
            <p className="text-white font-bold mt-12">
              "I know our minds no longer think LONG TERM, it's all about NOW, but it's about time we do."
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex justify-center md:justify-start mb-4">
                <img 
                 src="https://wamani.vercel.app/wp-content/uploads/2023/05/Logo.svg" 
                  alt="Tangerine Luxury Logo" 
                  className="h-10"
                />
              </div>
              <h3 className="text-lg font-bold mb-4">CONTACT INFO</h3>
              <div className="text-gray-600">
                <p>C Dass Group, 156, KC Road, New</p>
                <p>Industrial Township 5, Faridabad,</p>
                <p>Faridabad, Haryana, 121001</p>
                <p className="my-2">+91 7042039009</p>
                <p>+91 7042039009</p>
                <p className="my-2">hello@tangerineluxury.com</p>
                <p>Open Time: 11:00 AM - 7:00 PM</p>
              </div>
            </div>
            
           
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;