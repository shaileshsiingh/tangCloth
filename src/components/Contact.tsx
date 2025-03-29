// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [status, setStatus] = useState('idle');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStatus('loading');
    
//     setTimeout(() => {
//       setStatus('success');
//       setFormData({ name: '', email: '', message: '' });
//     }, 1000);
//   };

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             <motion.div 
//               className="bg-black text-white p-8 md:w-1/3"
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.7 }}
//             >
//               <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
//               <p>Let's discuss how we can help your business grow</p>
//             </motion.div>
            
//             <motion.div 
//               className="p-8 md:w-2/3"
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//             >
//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-gray-700 mb-2">Name</label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-700 mb-2">Email</label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                       required
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-700 mb-2">Message</label>
//                     <textarea
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       rows={4}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                       required
//                     />
//                   </div>
                  
//                   <button
//                     type="submit"
//                     disabled={status === 'loading'}
//                     className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
//                   >
//                     {status === 'loading' ? 'Sending...' : 'Send Message'}
//                   </button>
                  
//                   {status === 'success' && (
//                     <p className="text-green-600 text-center mt-4">Message sent successfully!</p>
//                   )}
//                 </div>
//               </form>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;