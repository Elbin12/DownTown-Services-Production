import React from 'react';
import { 
  ShieldCheckIcon, 
  DollarSignIcon, 
  ClockIcon, 
  MapPinIcon 
} from 'lucide-react';

function WhyChooseUs() {
  const benefits = [
    {
      icon: ShieldCheckIcon,
      title: "Verified & Trusted Professionals",
      description: "Every service provider undergoes rigorous background checks and skill verification."
    },
    {
      icon: DollarSignIcon,
      title: "Affordable & Transparent Pricing",
      description: "No hidden charges. Clear, upfront pricing with competitive rates."
    },
    {
      icon: ClockIcon,
      title: "Quick & Easy Booking Process",
      description: "Book your service in just a few clicks. Hassle-free and convenient."
    },
    {
      icon: MapPinIcon,
      title: "Available in Your City",
      description: "Comprehensive service coverage across multiple locations for your convenience."
    }
  ];

  return (
    <section className="pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering exceptional home services that make your life easier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              <div className="mb-4 flex items-center justify-center">
                <benefit.icon 
                  className="text-blue-600 group-hover:text-blue-700 transition-colors" 
                  size={48} 
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;