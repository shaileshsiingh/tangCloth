import React from 'react';
    import { Star } from 'lucide-react';

    const testimonials = [
      {
        id: 1,
        name: 'Jen - Singer',
        product: 'Graceful Handbag',
        price: '$70.00',
        image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        rating: 4,
        text: 'Velit aut reiciendis voluptatum ducimus rerum. Accusantium facere qui beatae voluptate ut velit eligendi iste.'
      },
      {
        id: 2,
        name: 'Lisha - Teacher',
        product: 'Classic Style Handbags',
        price: '$127.00',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        rating: 5,
        text: 'Natus est similique ut libero voluptatem sapiente. Nunc mollis neque ut liberos voluptatem sapiente vitae et sint.'
      },
      {
        id: 3,
        name: 'Kath - Designer',
        product: '100% Stretchable Yoga Dresses',
        price: '$115.00',
        image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        rating: 5,
        text: 'Fugit aliquod nihil praesentit molestiae magnam id. Mauris inventus quisque vel est explicamus. Pellentesque est velit perferendis sint.'
      }
    ];

    function Testimonials() {
      return (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{testimonial.product}</h3>
                      <p className="text-gray-600">{testimonial.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.text}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{testimonial.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? 'fill-yellow-400 text-black-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    export default Testimonials;
