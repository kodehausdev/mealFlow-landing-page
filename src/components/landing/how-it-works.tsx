'use client';

import { FilePlus2, Telescope, BotMessageSquare, ArrowRight, Sparkles, CheckCircle2, Play } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const steps = [
  {
    name: 'Log Your Meals',
    stepNumber: '01',
    description: 'Quickly add what your household eats for breakfast, lunch, and dinner. The more you track, the smarter it gets.',
    icon: FilePlus2,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'from-blue-500/10 to-cyan-400/10',
    features: ['Quick meal entry', 'Photo capture', 'Voice notes'],
    demo: 'Add breakfast in 10 seconds'
  },
  {
    name: 'Discover Patterns',
    stepNumber: '02',
    description: 'MealFlow analyzes your entries to learn your family preferences, favorite ingredients, and eating schedules.',
    icon: Telescope,
    color: 'from-purple-500 to-pink-400',
    bgColor: 'from-purple-500/10 to-pink-400/10',
    features: ['AI pattern recognition', 'Preference learning', 'Schedule optimization'],
    demo: 'See your family food DNA'
  },
  {
    name: 'Get Smart Suggestions',
    stepNumber: '03',
    description: 'Receive personalized recipe ideas and meal plans that fit your lifestyle, save you time, and delight your family.',
    icon: BotMessageSquare,
    color: 'from-green-500 to-emerald-400',
    bgColor: 'from-green-500/10 to-emerald-400/10',
    features: ['Personalized recipes', 'Smart meal plans', 'Shopping lists'],
    demo: 'Get 5 perfect meal ideas'
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background to-secondary/20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-l from-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 left-16 opacity-20 animate-float">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute top-32 right-32 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <CheckCircle2 className="w-6 h-6 text-accent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">How It Works</span>
          </div>

          <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              As easy as{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                1, 2, 3
              </span>
              <div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full blur-sm"></div>
            </span>
          </h2>
          
          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Transform your meal planning from a daily chore into a{' '}
            <span className="font-semibold text-primary">delightful discovery process</span>.
          </p>
        </div>

        {/* Progress Flow */}
        <div className="hidden lg:flex items-center justify-center mt-16 mb-8">
          {steps.map((step, index) => (
            <div key={step.stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-sm shadow-lg`}>
                {step.stepNumber}
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center mx-6">
                  <div className="w-20 h-0.5 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/10"></div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40 mx-2" />
                  <div className="w-20 h-0.5 bg-gradient-to-r from-muted-foreground/10 to-muted-foreground/30"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = activeStep === index;
              const isHovered = hoveredStep === index;
              
              return (
                <Card
                  key={step.name}
                  className={`group relative overflow-hidden border-0 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer ${
                    isHovered || isActive 
                      ? 'shadow-2xl shadow-primary/25' 
                      : 'hover:shadow-xl hover:shadow-primary/10'
                  }`}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => setActiveStep(isActive ? null : index)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                      {step.stepNumber}
                    </div>
                  </div>

                  <CardHeader className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="h-8 w-8" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                          {step.name}
                        </CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground text-base leading-relaxed">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="relative z-10 pt-0">
                    {/* Demo Button */}
                    <div className="mb-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                        isHovered 
                          ? 'bg-gradient-to-r ' + step.color + ' text-white border-transparent shadow-lg' 
                          : 'bg-muted/50 text-muted-foreground border-border'
                      }`}>
                        <Play className="w-3 h-3" />
                        {step.demo}
                      </div>
                    </div>

                    {/* Features List */}
                    <div className={`transition-all duration-300 ${isActive || isHovered ? 'opacity-100 max-h-32' : 'opacity-70 max-h-20'}`}>
                      <ul className="space-y-2">
                        {step.features.map((feature, featureIndex) => (
                          <li 
                            key={feature} 
                            className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in"
                            style={{ animationDelay: `${featureIndex * 100}ms` }}
                          >
                            <CheckCircle2 className={`w-4 h-4 ${isHovered ? 'text-white' : 'text-primary'} transition-colors duration-200`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]"></div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Ready to get started?</span>
            <ArrowRight className="w-4 h-4 text-primary animate-bounce-x" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}