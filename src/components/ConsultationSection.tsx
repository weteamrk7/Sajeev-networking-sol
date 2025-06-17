
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Send, CheckCircle, User, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const services = [
  "Web Development",
  "App Development", 
  "SaaS Solutions",
  "API Integration",
  "Cloud Connectivity",
  "Data Analysis"
];

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

export const ConsultationSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    selectedServices: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const { toast } = useToast();

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

    const elements = document.querySelectorAll('.consultation-animate');
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [isSubmitted]);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Consultation Booked!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 2000);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return <User className="w-5 h-5" />;
      case 2: return <Calendar className="w-5 h-5" />;
      case 3: return <MessageSquare className="w-5 h-5" />;
      default: return null;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return "Personal Info";
      case 2: return "Schedule";
      case 3: return "Services & Details";
      default: return "";
    }
  };

  if (isSubmitted) {
    return (
      <section id="consultation" className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-cyan-950/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-scale-in">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto animate-ping opacity-20"></div>
              </div>
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Thank You!</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Your consultation request has been submitted successfully. 
                We'll reach out to you within 24 hours to confirm your appointment.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    preferredDate: '',
                    preferredTime: '',
                    selectedServices: [],
                    message: ''
                  });
                }}
                variant="outline"
                className="group hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
              >
                Book Another Consultation
                <Sparkles className="ml-2 w-4 h-4 group-hover:animate-spin" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-cyan-950/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`
            consultation-animate text-center mb-16 transition-all duration-800 ease-out
            ${visibleElements.has('header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          data-element-id="header"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Book a Free Consultation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let's discuss your project requirements and how we can help transform your digital presence
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div 
            className={`
              consultation-animate flex justify-center mb-12 transition-all duration-800 ease-out
              ${visibleElements.has('progress') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            data-element-id="progress"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="flex items-center space-x-8">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div className={`
                    relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform
                    ${stepNumber <= step 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {stepNumber < step ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      getStepIcon(stepNumber)
                    )}
                    {stepNumber <= step && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-20"></div>
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                    stepNumber <= step ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {getStepTitle(stepNumber)}
                  </span>
                  {stepNumber < 3 && (
                    <div className={`
                      absolute top-8 left-24 w-16 h-0.5 transition-all duration-500
                      ${stepNumber < step ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-muted-foreground/30'}
                    `}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card 
            className={`
              consultation-animate shadow-2xl border-0 backdrop-blur-sm bg-background/80 relative overflow-hidden transition-all duration-800 ease-out
              ${visibleElements.has('form-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            data-element-id="form-card"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
            <CardHeader className="relative">
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getStepTitle(step)}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                          className="transition-all duration-300 border-2 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email address"
                          required
                          className="transition-all duration-300 border-2 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4" />
                          Preferred Date *
                        </Label>
                        <Input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="transition-all duration-300 border-2 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                        />
                      </div>
                      <div>
                        <Label className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4" />
                          Preferred Time *
                        </Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                          <SelectTrigger className="transition-all duration-300 border-2 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20">
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                {slot}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <Label className="text-lg font-semibold mb-4 block">
                        Services You're Interested In *
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div key={service} className="group">
                            <div className={`
                              flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                              ${formData.selectedServices.includes(service) 
                                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' 
                                : 'border-border hover:border-blue-300 hover:bg-blue-50/30'
                              }
                            `}>
                              <Checkbox
                                id={service}
                                checked={formData.selectedServices.includes(service)}
                                onCheckedChange={() => handleServiceToggle(service)}
                              />
                              <Label htmlFor={service} className="cursor-pointer flex-1 font-medium">
                                {service}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message" className="flex items-center gap-2 mb-3">
                        <MessageSquare className="w-4 h-4" />
                        Additional Message
                      </Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us more about your project requirements..."
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-border rounded-lg bg-background text-foreground resize-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="flex-1 group hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 hover:text-white transition-all duration-300"
                    >
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep} 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      disabled={
                        (step === 1 && (!formData.name || !formData.email)) ||
                        (step === 2 && (!formData.preferredDate || !formData.preferredTime))
                      }
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg group"
                      disabled={isSubmitting || formData.selectedServices.length === 0}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
