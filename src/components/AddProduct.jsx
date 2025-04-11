              {/* Additional Information */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Additional Information
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                  value={formData.additional_info || ''}
                  onChange={(e) => handleInputChange('additional_info', e.target.value)}
                  placeholder="Enter any additional information about the product"
                />
              </div>

              {/* Pricing Section */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Pricing</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Estimated Retail Price (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      value={formData.estimated_price || ''}
                      onChange={(e) => handleInputChange('estimated_price', e.target.value)}
                      placeholder="Enter estimated retail price"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Our Price (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      value={formData.price || ''}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="Enter our price"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Discount Price (₹)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      value={formData.discount_price || ''}
                      onChange={(e) => handleInputChange('discount_price', e.target.value)}
                      placeholder="Enter discount price (if any)"
                    />
                  </div>
                </div>
              </div> 