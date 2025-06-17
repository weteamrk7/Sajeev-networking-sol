
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Sparkles, ArrowRight, Eye } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web",
    image: "/placeholder.svg",
    description: "Modern e-commerce solution with AI-powered recommendations",
    longDescription: "A comprehensive e-commerce platform built with cutting-edge technologies, featuring AI-powered product recommendations, real-time inventory management, and seamless payment integration.",
    stack: ["React", "Node.js", "MongoDB", "Stripe", "AI/ML"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    category: "App",
    image: "/placeholder.svg",
    description: "Cross-platform productivity app with real-time collaboration",
    longDescription: "A powerful task management application that enables teams to collaborate in real-time, track progress, and boost productivity across all devices.",
    stack: ["React Native", "Firebase", "Redux", "WebSocket"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    category: "SaaS",
    image: "/placeholder.svg",
    description: "Business intelligence platform with advanced visualizations",
    longDescription: "Comprehensive analytics dashboard providing deep insights into business metrics with interactive visualizations and automated reporting.",
    stack: ["Vue.js", "Python", "PostgreSQL", "D3.js", "AWS"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Social Media Manager",
    category: "SaaS",
    image: "/placeholder.svg",
    description: "All-in-one social media management and scheduling platform",
    longDescription: "Complete social media management solution with content scheduling, analytics tracking, and multi-platform integration.",
    stack: ["Angular", "Express.js", "Redis", "OAuth", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Banking Mobile App",
    category: "App",
    image: "/placeholder.svg",
    description: "Secure mobile banking application with biometric authentication",
    longDescription: "Modern banking app with advanced security features, biometric authentication, and seamless transaction processing.",
    stack: ["Flutter", "Dart", "Firebase", "Biometrics", "Encryption"],
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "Web",
    image: "/placeholder.svg",
    description: "Creative portfolio with 3D animations and smooth interactions",
    longDescription: "Stunning portfolio website featuring 3D animations, smooth transitions, and creative interactions to showcase work beautifully.",
    stack: ["Next.js", "Three.js", "GSAP", "Tailwind CSS", "Vercel"],
    liveUrl: "#",
    githubUrl: "#"
  }
];

const categories = ["All", "Web", "App", "SaaS"];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
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
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.projects-animate');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            if (cardId) {
              setVisibleCards(prev => new Set([...prev, cardId]));
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => cardsObserver.observe(card));

    return () => cardsObserver.disconnect();
  }, [filteredProjects]);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-950 dark:to-blue-950/50 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`
            projects-animate text-center mb-16 transition-all duration-800 ease-out
            ${visibleElements.has('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          data-element-id="header"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our portfolio of innovative solutions that have transformed businesses
          </p>
        </div>

        {/* Modern Filter Buttons */}
        <div 
          className={`
            projects-animate flex justify-center mb-12 transition-all duration-800 ease-out
            ${visibleElements.has('filters') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          data-element-id="filters"
          style={{ transitionDelay: '0.2s' }}
        >
          <div className="flex gap-2 p-2 bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-6 py-2 rounded-xl transition-all duration-300 font-medium
                  ${activeCategory === category 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-muted-foreground hover:text-primary hover:bg-blue-50 dark:hover:bg-slate-800'
                  }
                `}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const isVisible = visibleCards.has(`project-${project.id}`);
            
            return (
              <Dialog key={project.id}>
                <Card 
                  className={`
                    project-card group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:-translate-y-2
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  `}
                  data-card-id={`project-${project.id}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Modern overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.stack.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-white/20 text-white border-white/30 backdrop-blur-sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:border-blue-200 transition-colors duration-300"
                      >
                        View Details
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </DialogTrigger>
                  </CardContent>
                </Card>

                {/* Enhanced Dialog */}
                <DialogContent className="max-w-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-0 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" asChild className="hover:bg-blue-50 dark:hover:bg-blue-950/50">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
};
