import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, Send, CheckCircle, User, Mail, MessageSquare, Sparkles, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
    phone: '',
    preferredDate: undefined as Date | undefined,
    preferredTime: '',
    selectedServices: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const { toast } = useToast();

  const FORMSPREE_FORM_ID = 'https://formspree.io/f/manjbdbk';

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

    const formattedDate = formData.preferredDate ? format(formData.preferredDate, 'yyyy-MM-dd') : '';

    try {
      const response = await fetch(`${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          preferredDate: formattedDate,
          selectedServices: formData.selectedServices.join(', ')
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Consultation Booked!",
          description: "We'll get back to you within 24 hours.",
          variant: "default",
        });
      } else {
        const data = await response.json();
        toast({
          title: "Submission Failed",
          description: data.errors ? data.errors.map((err: any) => err.message).join(", ") : "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was a problem connecting to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      case 2: return <CalendarIcon className="w-5 h-5" />;
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

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-cyan-50/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-cyan-950/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-background/80 relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getStepTitle(step)}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                          name="name"
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
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email address"
                          required
                          className="transition-all duration-300 border-2 focus:border-purple-500 focus:shadow-lg focus:shadow-purple-500/20"
                        />
                      </div>
                      <div className="group">
                        <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          required
                          className="transition-all duration-300 border-2 focus:border-green-500 focus:shadow-lg focus:shadow-green-500/20"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Keep your existing Step 2 and Step 3 code here without changes */}

                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                        (step === 2 && (!formData.preferredDate || !formData.preferredTime))
                      }
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || formData.selectedServices.length === 0}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
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
