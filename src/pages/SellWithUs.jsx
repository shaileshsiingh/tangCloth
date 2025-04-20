import React, { useState, useEffect } from 'react';
import { Camera, FileText, Truck, Shield, CreditCard, MessageCircle } from 'lucide-react';

const SellWithUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    itemType: '',
    brand: '',
    productName: '',
    productCondition: '',
    description: '',
    sellingPrice: '',
    estimatedRetailPrice: '',
    images: null
  });
  
  const [isVisible, setIsVisible] = useState({
    hero: false,
    guidelines: false,
    form: false,
    howItWorks: false,
    process: Array(6).fill(false)
  });

  // Animation on scroll effect
  useEffect(() => {
    setIsVisible(prev => ({...prev, hero: true}));
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      // Guidelines section
      const guidelinesElement = document.getElementById('guidelines');
      if (guidelinesElement && scrollPosition > guidelinesElement.offsetTop + 100) {
        setIsVisible(prev => ({...prev, guidelines: true}));
      }
      
      // Form section
      const formElement = document.getElementById('form');
      if (formElement && scrollPosition > formElement.offsetTop + 100) {
        setIsVisible(prev => ({...prev, form: true}));
      }
      
      // How It Works section
      const howItWorksElement = document.getElementById('howItWorks');
      if (howItWorksElement && scrollPosition > howItWorksElement.offsetTop + 100) {
        setIsVisible(prev => ({...prev, howItWorks: true}));
        
        // Stagger the process items animations
        const processItems = document.querySelectorAll('.process-item');
        processItems.forEach((item, index) => {
          setTimeout(() => {
            setIsVisible(prev => {
              const newProcess = [...prev.process];
              newProcess[index] = true;
              return {...prev, process: newProcess};
            });
          }, 200 * index);
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to check initial visibility
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      images: e.target.files
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add submission animation
    const button = e.target.querySelector('button[type="submit"]');
    button.classList.add('animate-pulse');
    button.innerText = 'SENDING...';
    
    // Simulate submission with timeout
    setTimeout(() => {
      console.log(formData);
      button.classList.remove('animate-pulse');
      button.innerText = 'SENT SUCCESSFULLY!';
      button.classList.add('bg-green-500');
      
      // Reset after 2 seconds
      setTimeout(() => {
        button.innerText = 'SEND';
        button.classList.remove('bg-green-500');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"  style={{backgroundColor:'#FAF9F6'}}>
      {/* Hero Banner with animation */}
      <div 
  className={`w-full relative mb-12 transition-all duration-1000 transform ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
>
  <div className="bg-red-800 h-64 w-full flex items-center justify-center relative overflow-hidden">
    {/* Using placeholder image instead of external URL */}
    <img src="https://tangerineluxury.com/wp-content/uploads/2023/11/laura-chouette-FTaKIJ_uEo0-unsplash-scaled.jpg" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-20 animate-pulse"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-white z-10">SELL WITH US</h1>
    </div>
  </div>
</div>

      <div className="w-full max-w-4xl">
        {/* Product Photo Guidelines with animation */}
        <div 
          id="guidelines"
          className={`mb-8 transition-all duration-700 transform ${isVisible.guidelines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-2xl font-bold text-center mb-4">PRODUCT PHOTO GUIDELINES</h2>
          <ol className="list-decimal pl-8 space-y-2">
            {[
              'Upload Front/Back/ All Corners/ Date Code',
              'Show all wear & tear on the products',
              'UPLOAD atleast 4 photos',
              'Preferably click against a Plain background',
              'Images should be of 4K quality',
              'Upload only Original pictures'
            ].map((item, index) => (
              <li 
                key={index} 
                className="transition-all"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionDuration: '500ms',
                  opacity: isVisible.guidelines ? 1 : 0,
                  transform: isVisible.guidelines ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                {item}
              </li>
            ))}
          </ol>
        </div>

        {/* Form with animation */}
        <form 
          id="form"
          onSubmit={handleSubmit} 
          className={`space-y-4 transition-all duration-700 transform ${isVisible.form ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="FIRST NAME"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            />
            <input
              name="lastName"
              placeholder="LAST NAME"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            />
          </div>
            
          <input
            name="email"
            type="email"
            placeholder="EMAIL"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
          />
            
          <input
            name="phone"
            placeholder="PHONE"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
          />
            
          <textarea
            name="address"
            placeholder="ADDRESS"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            rows="3"
          />
          
          {/* Item Selection */}
          <div className="mt-4">
            <p className="mb-2">SELECT YOUR ITEM</p>
            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            >
              <option value="">-HANDBAGS-</option>
              <option value="handbags">Handbags</option>
              <option value="accessories">Accessories</option>
              <option value="jewelry">Jewelry</option>
            </select>
          </div>

          {/* Upload Pictures */}
          <div className="mt-4">
            <p className="mb-2">UPLOAD PICTURES</p>
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-6 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50">
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">
                  Drag and drop files here, or click to select files
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Upload up to 10 files. Each file should not exceed 5MB
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formData.images ? `${formData.images.length} file(s) selected` : 'No file chosen'}
            </p>
          </div>

          {/* Product Info */}
          <div className="mt-4">
            <p className="mb-2">PRODUCT INFO</p>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300 mb-4"
            >
              <option value="">SELECT YOUR BRAND</option>
              <option value="chanel">Chanel</option>
              <option value="gucci">Gucci</option>
              <option value="prada">Prada</option>
              <option value="louisvuitton">Louis Vuitton</option>
            </select>
            
            <input
              name="productName"
              placeholder="PRODUCT NAME"
              value={formData.productName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            />
          </div>

          {/* Product Condition */}
          <div className="mt-4">
            <p className="mb-2">PRODUCT CONDITION</p>
            <div className="flex flex-wrap gap-4">
              {['new', 'excellent', 'verygood', 'good', 'fair'].map((condition, index) => (
                <label 
                  key={condition} 
                  className={`inline-flex items-center cursor-pointer transition-transform duration-300 hover:scale-105 ${formData.productCondition === condition ? 'font-bold' : ''}`}
                >
                  <input
                    type="radio"
                    name="productCondition"
                    value={condition}
                    checked={formData.productCondition === condition}
                    onChange={handleRadioChange}
                    className="form-radio text-orange-500 focus:ring-orange-500"
                  />
                  <span className={`ml-2 ${formData.productCondition === condition ? 'text-orange-500' : ''}`}>
                    {condition.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <p className="mb-2">DESCRIPTION</p>
            <textarea
              name="description"
              placeholder="(Any wear and tear, Dust, bag belongings)"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
              rows="4"
            />
          </div>

          {/* Pricing */}
          <div className="mt-4">
            <p className="mb-2">PRICING</p>
            <input
              name="sellingPrice"
              placeholder="SELLING PRICE"
              type="number"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300 mb-4"
            />
            <input
              name="estimatedRetailPrice"
              placeholder="ESTIMATED RETAIL PRICE"
              type="number"
              value={formData.estimatedRetailPrice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-300"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-lg font-bold mt-8 transform hover:scale-105 hover:shadow-lg"
          >
            SEND
          </button>
        </form>

        {/* How It Works Section with animations */}
        <div 
          id="howItWorks" 
          className={`mt-16 transition-all duration-700 transform ${isVisible.howItWorks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-2xl font-bold text-center mb-12">HOW IT WORKS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
            {[
              {
                icon: <Camera className="text-orange-500 w-12 h-12" />,
                title: "SHARE IMAGE",
                description: "SHARE IMAGE OF THE PRODUCTS YOU WISH TO SELL WITH US"
              },
              {
                icon: <FileText className="text-orange-500 w-12 h-12" />,
                title: "DIGITAL CONTRACT",
                description: "CONTRACT IS AN ASSURANCE CERTIFICATE"
              },
              {
                icon: <Truck className="text-orange-500 w-12 h-12" />,
                title: "FREE PAN INDIA PICK UP",
                description: "OFFER COLLECTION OF ITEMS FROM VARIOUS LOCATIONS ACROSS INDIA"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`process-item flex flex-col items-center transition-all duration-700 transform ${isVisible.process[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              >
                <div className="bg-orange-100 p-4 rounded-full mb-4 transition-all duration-500 hover:bg-orange-200 transform hover:scale-110 hover:shadow-lg">
                  {item.icon}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: <Shield className="text-orange-500 w-12 h-12" />,
                title: "AUTHENTICATION AND LISTING",
                description: "REVIEW FURTHER AND PROCESS"
              },
              {
                icon: <CreditCard className="text-orange-500 w-12 h-12" />,
                title: "PAYMENT CREDITED IN 24HRS",
                description: "WE DONT DELAY IN PAYMENTS"
              },
              {
                icon: <MessageCircle className="text-orange-500 w-12 h-12" />,
                title: "CONTACT US",
                description: "CONTACT US ON 7042539009"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`process-item flex flex-col items-center transition-all duration-700 transform ${isVisible.process[index+3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{transitionDelay: `${(index+3) * 100}ms`}}
              >
                <div className="bg-orange-100 p-4 rounded-full mb-4 transition-all duration-500 hover:bg-orange-200 transform hover:scale-110 hover:shadow-lg">
                  {item.icon}
                </div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWithUsForm;