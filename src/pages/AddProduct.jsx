import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_URL = "/api";

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  
  // Product form state
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    discount_price: '',
    category_id: '',
    subCategory_id: '',
    subSubCategory_id: '',
    brand_id: '',
    color: '',
    material: '',
    sizes: [{ size: '', quantity: '' }],
    tags: []
  });
  
  // State for categories, brands, etc.
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // State for custom inputs
  const [newBrand, setNewBrand] = useState('');
  const [showNewBrandInput, setShowNewBrandInput] = useState(false);
  const [newColor, setNewColor] = useState('');
  const [showNewColorInput, setShowNewColorInput] = useState(false);
  const [tagInput, setTagInput] = useState('');
  
  // Add these state variables for brand creation
  const [newBrandDescription, setNewBrandDescription] = useState('');
  const [newBrandImage, setNewBrandImage] = useState(null);
  const [newBrandImagePreview, setNewBrandImagePreview] = useState('');
  
  // Popular colors for selection
  const popularColors = [
    'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 
    'Brown', 'Gray', 'Pink', 'Orange', 'Beige', 'Navy', 'Olive'
  ];
  
  // Category maps from the codebase
  const categoryIds = {
    men: "67c82a32ac6e3964ca7755f7",
    kids: "67c9b33fb372a96364d09e3b",
    women: "67c08f837f61f5f03104ec4b"
  };
  
   // Category structure
   const subcategoryStructure = {
    '67c82a32ac6e3964ca7755f7': [ // Men
      { id: '67d8282003c676492cbbeb40', name: 'Clothing' },
      { id: '67d8283003c676492cbbeb44', name: 'Footwear' },
      { id: '67d827fd03c676492cbbeb3c', name: 'Accessories' }
    ],
    '67c08f837f61f5f03104ec4b': [ // Women
      { id: '67d826ef03c676492cbbeb2d', name: 'All Bags' },
      { id: '67d8276703c676492cbbeb33', name: 'Clothing' },
      { id: '67d8276003c676492cbbeb30', name: 'Footwear' },
      { id: '67d8277e03c676492cbbeb39', name: 'Accessories' },
      { id: '67d8277203c676492cbbeb36', name: 'Fine Jewellery' }
    ],
    '67c9b33fb372a96364d09e3b': [ // Kids
      { id: '67d828ed03c676492cbbeb4d', name: 'Clothing' },
      { id: '67d8292603c676492cbbeb65', name: 'Footwear' },
      { id: '67d828d103c676492cbbeb48', name: 'Accessories' }
    ]
  };

  const subSubcategoryStructure = {
    // Women's All Bags
    '67d826ef03c676492cbbeb2d': [
      { id: '67e1a5742328f40a1515b803', name: 'Tote Bags' },
      { id: '67e1a6292328f40a1515b853', name: 'Shoulder Bags' },
      { id: '67e1a6342328f40a1515b858', name: 'Clutch' },
      { id: '67e1a63e2328f40a1515b85d', name: 'Sling Bags' },
      { id: '67e1a6482328f40a1515b862', name: 'Mini Bags' },
      { id: '67e5b3c25eb5e80a2ac15b95', name: 'Satchel Bags' },
      { id: '67e5b3cc5eb5e80a2ac15b9a', name: 'Handbags' },
      { id: '67e5b3d65eb5e80a2ac15b9f', name: 'Beltbags' },
      { id: '67e5b3e05eb5e80a2ac15ba4', name: 'Wristlet' }
    ],
    
    // Women's Clothing
    '67d8276703c676492cbbeb33': [
      { id: '67e5b3f35eb5e80a2ac15ba9', name: 'Dresses & Gowns' },
      { id: '67e5b3fe5eb5e80a2ac15bae', name: 'Skirts & Shorts' },
      { id: '67e5b4085eb5e80a2ac15bb3', name: 'T Shirts & Shirts' },
      { id: '67e5b4125eb5e80a2ac15bb8', name: 'Trousers & Denims' },
      { id: '67e5b41c5eb5e80a2ac15bbd', name: 'Jackets & Outerwear' },
      { id: '67e5b4275eb5e80a2ac15bc2', name: 'Jumpsuits' },
      { id: '67e5b4325eb5e80a2ac15bc7', name: 'Co-Ord Sets Womens' },
      { id: '67e5b43c5eb5e80a2ac15bcc', name: 'Swim Suit' }
    ],
    
    // Women's Footwear
    '67d8276003c676492cbbeb30': [
      { id: '67e5b4465eb5e80a2ac15bd1', name: 'Boots' },
      { id: '67e5b4505eb5e80a2ac15bd6', name: 'Espadrilles & Loafers' },
      { id: '67e5b45c5eb5e80a2ac15bdb', name: 'Flats & Slippers' },
      { id: '67d8290a03c676492cbbeb59', name: 'Heels & Wedges' },
      { id: '67e5b4705eb5e80a2ac15be5', name: 'Peeptoes' },
      { id: '67e5b47a5eb5e80a2ac15bea', name: 'Sneakers' }
    ],
    
    // Women's All Accessories
    '67d8277e03c676492cbbeb39': [
      { id: '67e5b4845eb5e80a2ac15bef', name: 'Belts' },
      { id: '67e5b48f5eb5e80a2ac15bf4', name: 'Watches' },
      { id: '67e5b4995eb5e80a2ac15bf9', name: 'Shawls & Scarves' },
      { id: '67e5b4a35eb5e80a2ac15bfe', name: 'Sunglasses' },
      { id: '67e5b4ae5eb5e80a2ac15c03', name: 'Small Accessories' }
    ],
    
    // Women's Fine Jewellery
    '67d8277203c676492cbbeb36': [
      { id: '67e5b4b85eb5e80a2ac15c08', name: 'Earrings' },
      { id: '67e5b4c25eb5e80a2ac15c0d', name: 'Rings' },
      { id: '67e5b4cd5eb5e80a2ac15c12', name: 'Charms & Bracelets' },
      { id: '67e5b4d75eb5e80a2ac15c17', name: 'Necklaces' }
    ],
    
    // Men's Accessories
    '67d827fd03c676492cbbeb3c': [
      { id: '67e5b4e35eb5e80a2ac15c1c', name: 'Belts' },
      { id: '67e5b4ed5eb5e80a2ac15c21', name: 'Sunglasses' },
      { id: '67e5b4f75eb5e80a2ac15c26', name: 'Scarves' },
      { id: '67e5b5015eb5e80a2ac15c2b', name: 'Caps' }
    ],
    
    // Men's Clothing
    '67d8282003c676492cbbeb40': [
      { id: '67e1a5812328f40a1515b808', name: 'Shirts' },
      { id: '67e1a58e2328f40a1515b80d', name: 'Track Suits' },
      { id: '67e1a5982328f40a1515b812', name: 'T-Shirts' },
      { id: '67e1a5a42328f40a1515b817', name: 'Trousers & Denims' },
      { id: '67e1a5b32328f40a1515b81c', name: 'Jackets & Outerwear' },
      { id: '67e1a5bd2328f40a1515b821', name: 'Shorts' }
    ],
    
    // Men's Footwear
    '67d8283003c676492cbbeb44': [
      { id: '67e1a5c92328f40a1515b826', name: 'Boots' },
      { id: '67e1a5d52328f40a1515b82b', name: 'Espadrilles' },
      { id: '67e1a5e02328f40a1515b830', name: 'Loafers & Moccasins' },
      { id: '67e1a5ec2328f40a1515b835', name: 'Sliders & Slippers' },
      { id: '67e1a5f52328f40a1515b83a', name: 'Sneakers' }
    ],
    
    // Kids' Accessories
    '67d828d103c676492cbbeb48': [
      { id: '67e5b50b5eb5e80a2ac15c30', name: 'Belts' },
      { id: '67e5b5155eb5e80a2ac15c35', name: 'Caps' }
    ],
    
    // Kids' Clothing
    '67d828ed03c676492cbbeb4d': [
      { id: '67e5b51f5eb5e80a2ac15c3a', name: 'T Shirts & Shirts' },
      { id: '67e5b5295eb5e80a2ac15c3f', name: 'Denims & Trousers' },
      { id: '67e5b5335eb5e80a2ac15c44', name: 'Shorts & Skirts' },
      { id: '67e5b53d5eb5e80a2ac15c49', name: 'Playsuit & Jumpsuit' },
      { id: '67e5b5475eb5e80a2ac15c4e', name: 'Onesies & Rompers' },
      { id: '67e5b5515eb5e80a2ac15c53', name: 'Jackets & Outerwear' },
      { id: '67e5b55b5eb5e80a2ac15c58', name: 'Dresses' },
      { id: '67e5b5655eb5e80a2ac15c5d', name: 'Co-Ords Sets' }
    ],
    
    // Kids' Footwear
    '67d8292603c676492cbbeb65': [
      { id: '67e5b56f5eb5e80a2ac15c62', name: 'Shoes' }
    ]
  };
  
  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);
  
  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category_id) {
      setSubcategories(subcategoryStructure[formData.category_id] || []);
      setFormData(prev => ({ ...prev, subCategory_id: '', subSubCategory_id: '' }));
    } else {
      setSubcategories([]);
    }
  }, [formData.category_id]);
  
  // Update sub-subcategories when subcategory changes
  useEffect(() => {
    if (formData.subCategory_id) {
      // Handle the case where multiple categories share the same subcategory ID (like 'Accessories')
      // We need to determine which subcategory to use based on both category and subcategory
      
      const subSubsForSubcategory = subSubcategoryStructure[formData.subCategory_id] || [];
      
      // If none found, try to build a composite key for shared subcategories
      if (subSubsForSubcategory.length === 0 && formData.category_id) {
        // For shared subcategories like Accessories (67d8291803c676492cbbeb5f)
        // which appears in Women, Men, and Kids, create a category-specific list
        const compositeKey = `${formData.category_id}_${formData.subCategory_id}`;
        
        console.log('Trying composite key for shared subcategory:', compositeKey);
        
        // Map of composite keys to specific sub-subcategories
        const sharedSubcategoryMap = {
          // Women's Accessories
          '67c08f837f61f5f03104ec4b_67d8291803c676492cbbeb5h': [
            { id: '67e5b4845eb5e80a2ac15bef', name: 'Belts' },
            { id: '67e5b48f5eb5e80a2ac15bf4', name: 'Watches' },
            // ... other women's accessories
          ],
          // Men's Accessories
          '67c82a32ac6e3964ca7755f7_67d8291803c676492cbbeb5f': [
            { id: '67e5b4e35eb5e80a2ac15c1c', name: 'Belts' },
            { id: '67e5b4ed5eb5e80a2ac15c21', name: 'Sunglasses' },
            // ... other men's accessories
          ],
          // Kids' Accessories
          '67c9b33fb372a96364d09e3b_67d8291803c676492cbbeb5g': [
            { id: '67e5b50b5eb5e80a2ac15c30', name: 'Belts' },
            { id: '67e5b5155eb5e80a2ac15c35', name: 'Caps' }
          ]
        };
        
        setSubSubcategories(sharedSubcategoryMap[compositeKey] || []);
      } else {
        setSubSubcategories(subSubsForSubcategory);
      }
      
      setFormData(prev => ({ ...prev, subSubCategory_id: '' }));
    } else {
      setSubSubcategories([]);
    }
  }, [formData.category_id, formData.subCategory_id]);
  
  // Add a helper function to get the auth token
  const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };
  
  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/category/getAllCategory`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const fetchedCategories = response.data.data.category || [];
        setCategories(fetchedCategories);
        
        // Log available categories for debugging
        console.log('Fetched categories:', fetchedCategories);
        
        // Check if our hardcoded IDs match with what's in the API
        fetchedCategories.forEach(category => {
          const knownId = Object.entries(categoryIds).find(([key, id]) => category.name.toLowerCase().includes(key.toLowerCase()));
          if (knownId) {
            console.log(`Found category match: ${category.name} (API: ${category._id}, Local: ${knownId[1]})`);
          } else {
            console.log(`Unknown category from API: ${category.name} (${category._id})`);
          }
        });
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };
  
  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/brand/get-brands`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setBrands(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to fetch brands');
    }
  };
  
  // Update the brand image handler
  const handleBrandImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBrandImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewBrandImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Update the handleAddNewBrand function
  const handleAddNewBrand = async () => {
    if (!newBrand.trim()) {
      toast.error('Brand name cannot be empty');
      return;
    }
    
    if (!newBrandDescription.trim()) {
      toast.error('Brand description cannot be empty');
      return;
    }
    
    try {
      setLoading(true);
      
      // Prepare the payload based on the API's expected structure
      let payload = {
        name: newBrand.trim(),
        description: newBrandDescription.trim()
      };
      
      // If we have an image, convert it to base64 string for the API
      if (newBrandImage) {
        const base64Image = await convertFileToBase64(newBrandImage);
        payload.image = base64Image;
      }
      
      console.log('Sending brand data with structure:', Object.keys(payload));
      
      const response = await axios.post(`${API_URL}/brand/add`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        const newBrandData = response.data.data;
        setBrands(prev => [...prev, newBrandData]);
        setFormData(prev => ({ ...prev, brand_id: newBrandData._id }));
        
        // Reset brand form
        setNewBrand('');
        setNewBrandDescription('');
        setNewBrandImage(null);
        setNewBrandImagePreview('');
        setShowNewBrandInput(false);
        
        toast.success('Brand added successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
        });
      } else {
        toast.error(response.data.message || 'Failed to add brand',{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,    
          style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
        });
      }
    } catch (error) {
      console.error('Error adding brand:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to add brand');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Get only the base64 part (remove the prefix)
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle size changes
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = { ...updatedSizes[index], [field]: value };
    setFormData(prev => ({ ...prev, sizes: updatedSizes }));
  };
  
  // Add a new size field
  const addSizeField = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', quantity: '' }]
    }));
  };
  
  // Remove a size field
  const removeSizeField = (index) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes.splice(index, 1);
    setFormData(prev => ({ ...prev, sizes: updatedSizes }));
  };
  
  // Handle tag input
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(prev => [...prev, ...files]);
    
    // Create preview URLs
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewUrls]);
  };
  
  // Remove image
  const removeImage = (index) => {
    const updatedImages = [...productImages];
    const updatedPreviews = [...previewImages];
    
    // Revoke object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setProductImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };
  
  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.product_name || !formData.category_id || !formData.color || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (formData.sizes.length === 0 || formData.sizes.some(s => !s.size || !s.quantity)) {
      toast.error('Please add at least one size with quantity');
      return;
    }
    
    if (productImages.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }
    
    try {
      setLoading(true);
      
      // Convert images to base64 for JSON submission
      const imagePromises = productImages.map(image => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(image);
        });
      });
      
      const base64Images = await Promise.all(imagePromises);
      
      // Create the exact payload structure requested
      const payload = {
        category_id: formData.category_id,
        subCategory_id: formData.subCategory_id,
        subSubCategory_id: formData.subSubCategory_id,
        brand_id: formData.brand_id,
        product_name: formData.product_name,
        color: formData.color,
        price: parseFloat(formData.price),
        sizes: formData.sizes.map(size => ({
          size: size.size,
          quantity: parseInt(size.quantity, 10)
        })),
        images: base64Images,
        description: formData.description
      };
      
      console.log('Submitting product with payload:', payload);
      
      const response = await axios.post(`${API_URL}/product/add`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
 toast.success('Product added successfully', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
      });  
            navigate('/shop');
      } else {
        toast.error(response.data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };
  
  // Update the category and subcategory mappings
  const categoryOptions = [
    { value: '67c82a32ac6e3964ca7755f7', label: 'Men' },
    { value: '67c08f837f61f5f03104ec4b', label: 'Women' },
    { value: '67c9b33fb372a96364d09e3b', label: 'Kids' }
  ];

  // Update subcategory options based on the selected category
  const getSubcategoryOptions = (categoryId) => {
    switch(categoryId) {
      case '67c08f837f61f5f03104ec4b': // Women
        return [
          { value: '67d826ef03c676492cbbeb2d', label: 'All Bags' },
          { value: '67d8276703c676492cbbeb33', label: 'Clothing' },
          { value: '67d8276003c676492cbbeb30', label: 'Footwear' },
          { value: '67d8277e03c676492cbbeb39', label: 'All Accessories' },
          { value: '67d8277203c676492cbbeb36', label: 'Fine Jewellery' }
        ];
      case '67c82a32ac6e3964ca7755f7': // Men
        return [
          { value: '67d8282003c676492cbbeb40', label: 'Clothing' },
          { value: '67d8283003c676492cbbeb44', label: 'Footwear' },
          { value: '67d827fd03c676492cbbeb3c', label: 'Accessories' }
        ];
      case '67c9b33fb372a96364d09e3b': // Kids
        return [
          { value: '67d828ed03c676492cbbeb4d', label: 'Clothing' },
          { value: '67d828d103c676492cbbeb48', label: 'Accessories' }
        ];
      default:
        return [];
    }
  };
  
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Basics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name*
              </label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price*
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Price (optional)
              </label>
              <input
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material (optional)
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
        </div>
        
        {/* Category Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category* <span className="text-sm font-normal text-gray-500">({categories.length} categories)</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {formData.category_id && (
                <p className="text-sm text-gray-500 mt-1">
                  {Object.keys(categoryIds).find(key => categoryIds[key] === formData.category_id)} section selected
                </p>
              )}
            </div>
            
            {/* Subcategory Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory <span className="text-sm font-normal text-gray-500">({subcategories.length} available)</span>
              </label>
              <select
                name="subCategory_id"
                value={formData.subCategory_id}
                onChange={(e) => {
                  handleInputChange(e);
                  console.log(`Selected subcategory: ${e.target.value}`);
                }}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                disabled={!formData.category_id}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map(subcat => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </option>
                ))}
              </select>
              {formData.category_id && subcategories.length === 0 && (
                <p className="text-amber-600 text-sm mt-1">
                  No subcategories available for this category.
                </p>
              )}
              {formData.subCategory_id && (
                <p className="text-sm text-gray-500 mt-1">
                  {subcategories.find(s => s.id === formData.subCategory_id)?.name || 'Unknown subcategory'}
                </p>
              )}
            </div>
            
            {/* Sub-subcategory Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-subcategory <span className="text-sm font-normal text-gray-500">({subSubcategories.length} available)</span>
              </label>
              <select
                name="subSubCategory_id"
                value={formData.subSubCategory_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                disabled={!formData.subCategory_id || subSubcategories.length === 0}
              >
                <option value="">Select Sub-subcategory</option>
                {subSubcategories.map(subSubcat => (
                  <option key={subSubcat.id} value={subSubcat.id}>
                    {subSubcat.name}
                  </option>
                ))}
              </select>
              
              {formData.subCategory_id && subSubcategories.length === 0 && (
                <p className="text-amber-600 text-sm mt-1">
                  No sub-subcategories available for this subcategory.
                </p>
              )}
              {formData.subSubCategory_id && (
                <p className="text-sm text-gray-500 mt-1">
                  {subSubcategories.find(s => s.id === formData.subSubCategory_id)?.name || 'Unknown sub-subcategory'}
                </p>
              )}
            </div>
          </div>
          
          {/* Display full hierarchy selection when all are selected */}
          {formData.category_id && formData.subCategory_id && formData.subSubCategory_id && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Selected hierarchy:</span> {" "}
                {categories.find(c => c._id === formData.category_id)?.name || 'Unknown category'} {" > "}
                {subcategories.find(s => s.id === formData.subCategory_id)?.name || 'Unknown subcategory'} {" > "}
                {subSubcategories.find(s => s.id === formData.subSubCategory_id)?.name || 'Unknown sub-subcategory'}
              </p>
            </div>
          )}
        </div>
        
        {/* Brand & Color */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Brand & Color</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              {!showNewBrandInput ? (
                <div className="flex space-x-2">
                  <select
                    name="brand_id"
                    value={formData.brand_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewBrandInput(true)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    + New
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Brand Name*
                    </label>
                    <input
                      type="text"
                      value={newBrand}
                      onChange={(e) => setNewBrand(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter brand name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Description*
                    </label>
                    <textarea
                      value={newBrandDescription}
                      onChange={(e) => setNewBrandDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter brand description (required)"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBrandImageChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    {newBrandImagePreview && (
                      <div className="mt-2">
                        <img 
                          src={newBrandImagePreview} 
                          alt="Brand preview" 
                          className="h-20 w-auto object-contain border border-gray-300 rounded p-1" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleAddNewBrand}
                      disabled={loading || !newBrand.trim()}
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
                    >
                      {loading ? 'Adding...' : 'Add Brand'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewBrandInput(false);
                        setNewBrand('');
                        setNewBrandDescription('');
                        setNewBrandImage(null);
                        setNewBrandImagePreview('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              {!showNewColorInput ? (
                <div className="flex space-x-2">
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select Color</option>
                    {popularColors.map(color => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewColorInput(true)}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    + Custom
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Enter custom color"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newColor.trim()) {
                        setFormData(prev => ({ ...prev, color: newColor.trim() }));
                        setShowNewColorInput(false);
                        setNewColor('');
                      }
                    }}
                    className="px-3 py-2 bg-black text-white rounded hover:bg-gray-800"
                  >
                    Use
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewColorInput(false);
                      setNewColor('');
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sizes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sizes & Quantity</h2>
            <button
              type="button"
              onClick={addSizeField}
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Size
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.sizes.map((sizeObj, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={sizeObj.size}
                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="S, M, L, XL, 42, etc."
                  />
                </div>
                
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={sizeObj.quantity}
                    onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    min="0"
                  />
                </div>
                
                {formData.sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeField(index)}
                    className="mt-6 p-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Tags */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tags</h2>
          
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add a tag..."
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag, index) => (
              <div 
                key={index}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-gray-600 hover:text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          
          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct; 