import React, { useEffect, useState } from 'react'
import Service from './Service';
import { api } from '../../../axios';
import { Star, MapPin, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from 'react-router-dom';

function TopServices() {
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopServices = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('home/')
        if (res.status === 200) {
          setServices(res.data);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err, 'err');
        setIsLoading(false);
      }
    }
    fetchTopServices();

    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const totalSlides = Math.ceil(services.length / visibleCount);

  const nextSlide = () => {
    if (currentIndex < (totalSlides - 1) * visibleCount) {
      setCurrentIndex((prevIndex) => prevIndex + visibleCount);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - visibleCount);
    }
  };

  const visibleServices = services.slice(currentIndex, currentIndex + visibleCount);

  // Shimmer Loading Component
  const ServiceShimmer = () => (
    <div className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 py-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-48 bg-gray-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 mb-2 w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-4 bg-gray-300 mb-3 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="flex justify-between mb-3">
            <div className="h-5 bg-gray-300 w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="h-5 bg-gray-300 w-1/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="border-t pt-3 flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            <div className="flex-grow">
              <div className="h-4 bg-gray-300 mb-2 w-2/3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
              <div className="h-3 bg-gray-300 w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#2A2C27] mb-4">Try the Best: Our Most In-Demand Services</h2>
        <div className="relative px-4">
          <div className="flex overflow-hidden">
            {isLoading 
              ? Array.from({ length: visibleCount }).map((_, index) => (
                  <ServiceShimmer key={index} />
                ))
              : visibleServices.map((service) => (
                  <div 
                    key={service.id} 
                    className="w-full cursor-pointer sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 transition-all duration-300 ease-in-out py-2" 
                    onClick={()=>{navigate(`/service/${service.id}/`)}}
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={service.pic} alt={service.service_name} className="w-full h-48 object-cover"/>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.service_name}</h3>
                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                          {service.description.length > 30 
                            ? service.description.slice(0,56) 
                            : service.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xl font-bold text-primary">
                            ₹{service.price} <span className="font-light text-gray-700 text-sm">(Base Price)</span>
                          </span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium text-gray-700">
                              {service.workerProfile.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex items-center">
                            <img 
                              src={service.workerProfile.profile_pic}
                              alt={service.workerProfile.first_name}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {`${service.workerProfile.first_name} ${service.workerProfile.last_name}`}
                              </p>
                              <div className="flex items-center text-xs text-gray-600">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span>{service.workerProfile.location}</span>
                              </div>
                            </div>
                            {service.workerProfile.is_available === "True" && (
                              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {!isLoading && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 ease-in-out ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= (totalSlides - 1) * visibleCount}
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-100 hover:text-gray-900 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 ease-in-out ${
                  currentIndex >= (totalSlides - 1) * visibleCount ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {!isLoading && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * visibleCount)}
                className={`h-2 w-2 rounded-full mx-1 ${
                  index * visibleCount === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TopServices;