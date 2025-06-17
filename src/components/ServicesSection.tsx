
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Smartphone, Cloud, Database, BarChart3, Cog, ArrowRight, Zap, Sparkles } from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications built with modern frameworks and cutting-edge technologies",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Modern Frameworks"]
  },
  {
    id: 2,
    title: "App Development",
    description: "Native and cross-platform mobile applications for iOS and Android with exceptional user experience",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
    features: ["Cross-platform", "Native Performance", "App Store Ready", "User-centric Design"]
  },
  {
    id: 3,
    title: "SaaS Solutions",
    description: "Scalable software-as-a-service platforms designed for businesses of all sizes and industries",
    icon: Cloud,
    color: "from-green-500 to-emerald-500",
    features: ["Scalable Architecture", "Multi-tenant", "Subscription Management", "Analytics Dashboard"]
  },
  {
    id: 4,
    title: "API Integration",
    description: "Seamless integration of third-party APIs and custom API development for enhanced functionality",
    icon: Cog,
    color: "from-orange-500 to-red-500",
    features: ["RESTful APIs", "GraphQL", "Webhooks", "Comprehensive Documentation"]
  },
  {
    id: 5,
    title: "Cloud Connectivity",
    description: "Cloud infrastructure setup and management for optimal performance and reliability",
    icon: Database,
    color: "from-indigo-500 to-purple-500",
    features: ["AWS/Azure/GCP", "DevOps Automation", "24/7 Monitoring", "Enterprise Security"]
  },
  {
    id: 6,
    title: "Data Analysis",
    description: "Transform raw data into actionable insights with advanced analytics and machine learning",
    icon: BarChart3,
    color: "from-teal-500 to-blue-500",
    features: ["Data Visualization", "Machine Learning", "Real-time Analytics", "Custom Reporting"]
  }
];

export const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);

  // Memoized intervals for better performance
  const serviceRotationInterval = useMemo(() => {
    if (!isVisible) return null;
    
    return setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
  }, [isVisible]);

  useEffect(() => {
    if (serviceRotationInterval) {
      return () => clearInterval(serviceRotationInterval);
    }
  }, [serviceRotationInterval]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('services-section')) {
              setIsVisible(true);
            }
            
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const section = document.querySelector('.services-section');
    const cards = document.querySelectorAll('.service-card');
    
    if (section) observer.observe(section);
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section py-16 md:py-20 bg-gradient-to-br from-slate-50 to-purple-50/30 dark:from-slate-950 dark:to-purple-950/30 relative overflow-hidden">
      {/* Optimized background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 md:w-48 h-32 md:h-48 bg-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 md:w-56 h-40 md:h-56 bg-purple-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="flex items-center justify-center mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        {/* Enhanced Service Cards with better responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = index === activeService;
            const isVisible = visibleCards.has(index);
            
            return (
              <Card 
                key={service.id}
                data-index={index}
                className={`
                  service-card cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl
                  ${isActive ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm h-full
                `}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
                onClick={() => setActiveService(index)}
              >
                <CardContent className="p-4 md:p-6 h-full flex flex-col">
                  <div className={`
                    w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 
                    transition-all duration-300 hover:scale-110
                  `}>
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-grow text-sm md:text-base">{service.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs md:text-sm text-primary">Key Features:</h4>
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-primary transition-transform hover:translate-x-1" />
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className={`
                            text-xs md:text-sm text-muted-foreground flex items-center
                            transform transition-all duration-300 ease-out
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                          `}
                          style={{
                            transitionDelay: `${(index * 100) + (featureIndex * 100)}ms`
                          }}
                        >
                          <div 
                            className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${service.color} 
                              transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-0'}`}
                            style={{
                              transitionDelay: `${(index * 100) + (featureIndex * 150)}ms`
                            }}
                          ></div>
                          <span className={`transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                            style={{
                              transitionDelay: `${(index * 100) + (featureIndex * 200)}ms`
                            }}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Enhanced Statistics with better mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
          {[
            { number: "50+", label: "Projects Delivered", icon: "🚀" },
            { number: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
            { number: "5⭐", label: "Client Satisfaction", icon: "🌟" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`
                text-center p-4 md:p-6 rounded-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm
                transition-all duration-500 hover:scale-105 hover:shadow-lg
                scroll-animate opacity-0 translate-y-6
              `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-xl md:text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
