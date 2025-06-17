import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Award, Users, Clock, Star, Sparkles, Zap, TrendingUp, Target
} from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Award,
    number: 50,
    suffix: '+',
    label: 'Projects Delivered',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    icon: Clock,
    number: 99.9,
    suffix: '%',
    label: 'Uptime Across Cloud Apps',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    icon: Star,
    number: 5,
    suffix: ' Star',
    label: 'Average Client Rating',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 4,
    icon: Users,
    number: 100,
    suffix: '+',
    label: 'Happy Clients',
    color: 'from-purple-500 to-pink-500',
  },
];

const timeline = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Started with a vision to transform businesses through innovative digital solutions',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2021',
    title: 'First Major Success',
    description: 'Delivered 10+ enterprise-level projects, establishing our reputation in the market',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
  },
  {
    year: '2022',
    title: 'Team Expansion',
    description: 'Grew our team of experts and expanded into cloud connectivity and data analysis',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Achieved 5-star rating from startups and enterprises alike',
    icon: Award,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    year: '2024',
    title: 'Innovation Leader',
    description: 'Leading the way in cutting-edge web and app development solutions',
    icon: Target,
    color: 'from-indigo-500 to-purple-500',
  },
];

export const AboutSection = () => {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [visibleTimelineItems, setVisibleTimelineItems] = useState(new Set());
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        stats.forEach((stat, index) => {
          setTimeout(() => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.number / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
              step++;
              current = (stat.number * step) / steps;

              if (step >= steps) {
                clearInterval(timer);
                current = stat.number;
              }

              setCounters((prev) => {
                const newCounters = [...prev];
                newCounters[index] = current;
                return newCounters;
              });
            }, duration / steps);
          }, index * 200);
        });
      }
    }, { threshold: 0.2 });

    const section = document.getElementById('about-section');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-timeline-index') || '0');
          setVisibleTimelineItems((prev) => new Set([...prev, index]));
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.timeline-item').forEach((item) => timelineObserver.observe(item));
    return () => timelineObserver.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-400/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Sajeev Networking Solutions?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just developers – we're digital transformation partners committed to your success
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const value = stat.number === 99.9 ? counters[index].toFixed(1) : Math.round(counters[index]);
            return (
              <Card
                key={stat.id}
                className="text-center hover:shadow-xl transition-all duration-700 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {value}{stat.suffix}
                  </div>
                  <p className="text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Journey
            </h3>
            <p className="text-muted-foreground">A timeline of innovation, growth, and success</p>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-60"></div>
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleTimelineItems.has(index);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  data-timeline-index={index}
                  className={`timeline-item flex flex-col sm:flex-row items-center mb-16 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  } transition-all duration-700`}
                >
                  <div className={`w-full sm:w-1/2 px-4 ${isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:text-left'}`}>
                    <Card className="hover:shadow-xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant="outline" className={`bg-gradient-to-r ${item.color} text-white border-0`}>
                            {item.year}
                          </Badge>
                        </div>
                        <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Dot and line */}
                  <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-full border-4 border-background shadow-xl transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`} />
                  </div>

                  <div
                    className={`hidden sm:block absolute ${isLeft ? 'right-1/2 mr-6' : 'left-1/2 ml-6'} top-1/2 w-6 h-1 bg-gradient-to-r ${item.color} rounded-full transition-all duration-500 ${
                      isVisible ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 300}ms` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
