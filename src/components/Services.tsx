import { Code2, Rocket, Users, Zap } from 'lucide-react';

const services = [
  {
    icon: <Code2 size={24} />,
    title: 'Custom Development',
    description: 'Tailored software solutions built to meet your specific business needs.'
  },
  {
    icon: <Rocket size={24} />,
    title: 'Digital Transformation',
    description: 'Modernize your business with cutting-edge digital solutions.'
  },
  {
    icon: <Users size={24} />,
    title: 'Team Augmentation',
    description: 'Extend your team with our skilled developers and designers.'
  },
  {
    icon: <Zap size={24} />,
    title: 'Technical Consulting',
    description: 'Expert guidance to help you make informed technology decisions.'
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions for your digital needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
