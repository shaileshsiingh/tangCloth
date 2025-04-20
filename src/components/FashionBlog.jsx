import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const blogPosts = [
  {
    id: 1,
    date: 'JUNE 24',
    title: 'Expect more from your workout clothes',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: 'Admin',
    comments: 1,
    excerpt: 'Bibendum sit amet vel. Maecenas sed nunc ut velit elementum integer.'
  },
  {
    id: 2,
    date: 'JUNE 18',
    title: 'Finest clothing a modern slim fit suit',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    author: 'Admin',
    comments: 0,
    excerpt: 'Et molestias facere ac nemo placeat nihil dolores. Minus blanditiis haec accusamus sapiente.'
  }
];

function FashionBlog() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="py-20"  style={{backgroundColor:'#FAF9F6'}}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Fashion Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="group"
              initial={{ opacity: 0, y: -50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white px-4 py-1">
                  {post.date}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.comments} Comment{post.comments !== 1 && 's'}</span>
              </div>
              <button className="mt-4 text-black hover:underline">Read More</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FashionBlog;
