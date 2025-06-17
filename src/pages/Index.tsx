
import React, { useEffect, useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ServicesSection } from '../components/ServicesSection';
import { ConsultationSection } from '../components/ConsultationSection';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.remove('scroll-animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const observeSections = () => {
      const sections = document.querySelectorAll('.scroll-animate');
      sections.forEach((section) => observer.observe(section));
    };

    const timeoutId = setTimeout(observeSections, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Optimized Background - Removed overflow-x-hidden that was causing the line */}
      <div className="fixed inset-0 -z-10 will-change-transform">
        {/* Simplified gradient background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-cyan-50/20 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-cyan-950/20"
          style={{
            transform: `translate3d(0, ${scrollY * 0.05}px, 0)`,
          }}
        />
        
        {/* Reduced floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl will-change-transform"
            style={{
              transform: `translate3d(${Math.sin(scrollY * 0.0005) * 20}px, ${Math.cos(scrollY * 0.0005) * 15}px, 0)`,
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-full blur-3xl will-change-transform"
            style={{
              transform: `translate3d(${Math.cos(scrollY * 0.0003) * -15}px, ${Math.sin(scrollY * 0.0003) * 10}px, 0)`,
            }}
          />
        </div>

        {/* Simplified dots pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: `translate3d(0, ${scrollY * 0.02}px, 0)`,
          }} />
        </div>
      </div>

      <ThemeToggle />
      <HeroSection />
      
      <div className="scroll-animate opacity-0 translate-y-16 transition-all duration-700 ease-out">
        <ProjectsSection />
      </div>
      
      <div className="scroll-animate opacity-0 translate-y-16 transition-all duration-700 ease-out">
        <ServicesSection />
      </div>
      
      <div className="scroll-animate opacity-0 translate-y-16 transition-all duration-700 ease-out">
        <ConsultationSection />
      </div>
      
      <div className="scroll-animate opacity-0 translate-y-16 transition-all duration-700 ease-out">
        <AboutSection />
      </div>
      
      <div className="scroll-animate opacity-0 translate-y-16 transition-all duration-700 ease-out">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
