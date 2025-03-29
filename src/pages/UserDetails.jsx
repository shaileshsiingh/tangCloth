import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserDetails() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const API_URL = "/api";
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('authToken');
        
        const response = await fetch(`${API_URL}/user/details/${userId}`, {
        // const response = await fetch(`http://91.203.135.152:2001/api/user/details/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUser(data);
        setFormData({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          email: data.data.email
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Could not load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Reset form data to original user data
    setFormData({
      first_name: user.data.first_name,
      last_name: user.data.last_name,
      email: user.data.email
    });
    setIsEditing(false);
    toast.info('Edit cancelled');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${API_URL}/user/update/${userId}`, {
      // const response = await fetch(`http://91.203.135.152:2001/api/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || 'Failed to update user details');
      }
      
      // Update the user state correctly with the nested data structure
      setUser({
        ...user,
        data: {
          ...user.data,
          ...formData
        }
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
      });
    } catch (error) {
      console.error('Error updating user details:', error);
      toast.error(error.message || 'Failed to update profile. Please try again.', {
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
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600">User not found</h2>
          <p className="mt-2 text-gray-600">Please try logging in again.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="mt-4 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isEditing ? 'Edit your account details' : 'Manage your account details and preferences'}
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {isEditing ? 'Edit Information' : 'Personal Information'}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {isEditing ? 'Update your details below' : 'Details and account information'}
              </p>
            </div>
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
              >
                Edit Profile
              </motion.button>
            )}
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleUpdateSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-4 flex justify-end space-x-3">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancelEdit}
                      className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
                    >
                      Update
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                <motion.dl 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2"
                >
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      First name
                    </dt>
                    <dd className="mt-1 text-lg font-medium text-gray-900">
                      {user.data.first_name}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Last name
                    </dt>
                    <dd className="mt-1 text-lg font-medium text-gray-900">
                      {user.data.last_name}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-lg font-medium text-gray-900">
                      {user.data.email}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Account created
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(user.data.createdAt)}
                    </dd>
                  </div>
                  
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Account role
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.data.role_id === "2" ? "Customer" : "Administrator"}
                    </dd>
                  </div>
                </motion.dl>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300 font-medium"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              localStorage.clear();
              toast.success('Logged out successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {backgroundColor: 'black', color: 'white', borderRadius: '10px'}
              });
              setTimeout(() => {
                window.location.href = '/login';
              }, 1500);
            }}
            className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 font-medium"
          >
            Logout
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default UserDetails;