import React from 'react';

export default function PrivateViewing() {
  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-900 py-16">
      {/* Background Image only behind PRIVATE VIEWING title */}
      <div 
        className="w-full h-48 bg-cover bg-center flex items-center justify-center" 
        style={{ backgroundImage: "url('https://tangerineluxury.com/wp-content/uploads/2023/11/123dcvbf-scaled.jpg')" }}
      >
        <h1 className="text-5xl font-bold text-white shadow-md">PRIVATE VIEWING</h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center mt-12">
        <p className="text-lg mb-8">
          Shop for pre-owned luxury items in the safety and comfort of your home using our personal concierge service.
        </p>

        <div className="bg-white shadow-lg rounded-lg p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4">The Personal Concierge Service from Tangerine Luxury</h2>
          <table className="w-full border-collapse border border-gray-300 text-gray-900">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border border-gray-300">S. NO.</th>
                <th className="p-3 border border-gray-300">OUR SERVICES</th>
                <th className="p-3 border border-gray-300">SERVICES FEE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-300">1</td>
                <td className="p-3 border border-gray-300 font-bold">IN PERSON (Available only in Delhi and NCR)</td>
                <td className="p-3 border border-gray-300">UP TO 4 PRODUCTS - INR 700<br/>MORE THAN 4 PRODUCTS - INR 100 EXTRA PER PRODUCT</td>
              </tr>
              <tr>
                <td className="p-3 border border-gray-300">2</td>
                <td className="p-3 border border-gray-300 font-bold">VIDEO CALL (Pan India/Worldwide)</td>
                <td className="p-3 border border-gray-300">FREE</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 text-left">
          <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Trying on clothing during COVID-19 is not allowed.</li>
            <li>Private viewing times must be scheduled in advance.</li>
            <li>Fees are waived in the case of an immediate sale.</li>
            <li>Additional shipping fees may apply for ordered products.</li>
            <li>Video calls must be scheduled 24-48 hours in advance.</li>
            <li>Without a booking fee, products cannot be held.</li>
            <li>If a product is sold before your appointment, it will be shown via video call.</li>
          </ul>
        </div>

        <a href="/contact" className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition">
          Book Now
        </a>
      </div>

      {/* Red Label Below Container */}
      <div className="mt-10 text-center">
        <span className="inline-block bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-md">
          Limited Slots Available!
        </span>
      </div>
    </div>
  );
}