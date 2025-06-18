import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Smartphone, Cloud, Sparkles, Zap, Star, Globe, Shield } from 'lucide-react';
// Removed the import for ExternalLinkButton as it will no longer be used directly

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  const animatedTexts = useMemo(() => [
    "Web Development",
    "App Development",
    "SaaS Solutions",
    "API Integration",
    "Cloud Connectivity",
    "Data Analysis"
  ], []);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  useEffect(() => {
    if (!isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.getAttribute('data-element-id');
            if (elementId) {
              setVisibleElements(prev => new Set([...prev, elementId]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const elements = document.querySelectorAll('.hero-animate');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isVisible]);

  const scrollToConsultation = () => {
    document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle navigation for "View Our Work" directly
  const handleViewOurWorkClick = () => {
    window.location.href = "https://sajeevconstructions.com/";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Optimized Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Simplified grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Optimized floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl rotate-45 animate-pulse blur-sm"></div>
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-xl rotate-45 animate-pulse blur-sm" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Optimized tech icons */}
        <div className="absolute inset-0 overflow-hidden">
          <Code className="absolute top-32 left-16 w-6 h-6 text-blue-500/30 animate-pulse" />
          <Smartphone className="absolute bottom-48 right-24 w-5 h-5 text-purple-500/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <Cloud className="absolute top-1/2 left-1/6 w-7 h-7 text-cyan-500/30 animate-pulse" style={{ animationDelay: '2s' }} />
          <Globe className="absolute bottom-1/3 right-1/4 w-6 h-6 text-green-500/30 animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center z-10 relative">
        <div className="transition-all duration-700 transform">

          {/* Badge */}
          <div
            className={`
              hero-animate inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/90 dark:bg-blue-900/40 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm mb-8 transition-all duration-500 ease-out
              ${visibleElements.has('badge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            data-element-id="badge"
          >
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Empowering Digital Innovation</span>
          </div>

          {/* Main Headlines */}
          <div className="mb-8">
            <h1
              className={`
                hero-animate text-5xl md:text-7xl font-black mb-4 transition-all duration-500 ease-out
                ${visibleElements.has('title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              data-element-id="title"
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
                Sajeev
              </span>
            </h1>
            <h2
              className={`
                hero-animate text-3xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-200 transition-all duration-500 ease-out
                ${visibleElements.has('subtitle') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              data-element-id="subtitle"
              style={{ transitionDelay: '0.2s' }}
            >
              Networking Solutions
            </h2>
          </div>

          {/* Dynamic text section */}
          <div className="mb-12">
            <p
              className={`
                hero-animate text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-4 transition-all duration-500 ease-out
                ${visibleElements.has('description1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              data-element-id="description1"
              style={{ transitionDelay: '0.3s' }}
            >
              Cutting-edge
            </p>
            <div
              className={`
                hero-animate relative h-16 mb-4 transition-all duration-500 ease-out
                ${visibleElements.has('animated-text') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
              data-element-id="animated-text"
              style={{ transitionDelay: '0.4s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
              <div className="relative text-2xl md:text-3xl font-bold text-slate-800 dark:text-white h-16 flex items-center justify-center">
                <span
                  key={currentText}
                  className="animate-scale-in bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {animatedTexts[currentText]}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            className={`
              hero-animate text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-500 ease-out
              ${visibleElements.has('description2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            data-element-id="description2"
            style={{ transitionDelay: '0.5s' }}
          >
            Transform your business with innovative technology solutions that drive growth, efficiency, and success in the digital age.
          </p>

          {/* CTA section */}
          <div
            className={`
              hero-animate flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-500 ease-out
              ${visibleElements.has('cta-buttons') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            data-element-id="cta-buttons"
            style={{ transitionDelay: '0.6s' }}
          >
            <Button
              size="lg"
              onClick={scrollToConsultation}
              className="group relative text-lg px-8 py-4 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-2xl border-0"
            >
              <span className="relative flex items-center gap-2">
                Book Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>

            {/* Directly embedding the "View Our Work" button with its onClick handler */}
            <Button
              size="lg"
              onClick={handleViewOurWorkClick} // Directly call the local function
              variant="outline"
              className="group relative text-lg px-8 py-4 h-auto rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300"
            >
              <span className="relative flex items-center gap-2">
                View Our Work
                <Globe className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </span>
            </Button>

          </div>

          {/* Stats */}
          <div
            className={`
              hero-animate grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 transition-all duration-500 ease-out
              ${visibleElements.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            data-element-id="stats"
            style={{ transitionDelay: '0.7s' }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
              <div className="text-slate-600 dark:text-slate-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
              <div className="text-slate-600 dark:text-slate-400">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">99%</div>
              <div className="text-slate-600 dark:text-slate-400">Client Satisfaction</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className={`
              hero-animate absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out
              ${visibleElements.has('scroll-indicator') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            data-element-id="scroll-indicator"
            style={{ transitionDelay: '0.8s' }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">Scroll to explore</span>
              <div className="animate-bounce">
                <div className="w-6 h-10 border-2 border-slate-400/50 dark:border-slate-500/50 rounded-full flex justify-center p-1">
                  <div className="w-1 h-3 bg-slate-500/70 dark:bg-slate-400/70 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
