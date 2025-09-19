'use client';

import { Clock, Lightbulb, ClipboardList, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const features = [
  {
    name: 'Track Meals',
    description: 'Easily log breakfast, lunch, and dinner to build a clear picture of your household\'s eating habits.',
    icon: ClipboardList,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'from-blue-500/10 to-cyan-400/10',
    delay: 0,
  },
  {
    name: 'Smart Suggestions',
    description: 'Get intelligent meal ideas based on past patterns, saving you from the daily "what to cook" dilemma.',
    icon: Lightbulb,
    color: 'from-amber-500 to-orange-400',
    bgColor: 'from-amber-500/10 to-orange-400/10',
    delay: 200,
  },
  {
    name: 'Save Time',
    description: 'Automate your meal planning process and free up valuable time for what truly matters.',
    icon: Clock,
    color: 'from-green-500 to-emerald-400',
    bgColor: 'from-green-500/10 to-emerald-400/10',
    delay: 400,
  },
];

export default function ProblemSolution() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/10 to-background">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-primary/8 to-accent/8 rounded-full blur-3xl animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-l from-accent/6 to-primary/6 rounded-full blur-3xl animate-pulse opacity-30" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 left-16 opacity-15 animate-float">
        <Sparkles className="w-6 h-6 text-primary" />
      </div>
      <div className="absolute bottom-32 right-16 opacity-15 animate-float" style={{ animationDelay: '4s' }}>
        <ArrowRight className="w-5 h-5 text-accent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">The Solution</span>
          </div>

          <h2 className={`font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Meal planning shouldn't be a
            </span>
            <span className="block relative mt-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                daily struggle
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 animate-scale-x"></div>
            </span>
          </h2>
          
          <p className={`mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            Cooking for a household can be chaotic. MealFlow brings order to the chaos by learning what your family loves to eat and helping you{' '}
            <span className="font-semibold text-primary">effortlessly plan your week</span>.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              const isHovered = hoveredCard === index;
              
              return (
                <Card 
                  key={feature.name} 
                  className={`group flex flex-col items-center text-center transition-all duration-500 cursor-pointer backdrop-blur-sm bg-card/90 border-border/50 ${
                    isHovered 
                      ? 'shadow-2xl shadow-primary/20 scale-105 -translate-y-2' 
                      : 'hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02] hover:-translate-y-1'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${feature.delay}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="relative">
                    {/* Icon Container */}
                    <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg transition-all duration-300 ${
                      isHovered ? 'scale-110 rotate-3' : 'group-hover:scale-105'
                    }`}>
                      <IconComponent className="h-9 w-9" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <CardTitle className={`font-headline text-2xl mb-4 transition-colors duration-200 ${
                      isHovered ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {feature.name}
                    </CardTitle>
                    
                    <CardDescription className="text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </CardDescription>

                    {/* Hover Arrow */}
                    <div className={`mt-4 transition-all duration-200 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}>
                      <ArrowRight className="w-5 h-5 text-primary mx-auto" />
                    </div>

                    {/* Background Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10`}></div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Ready to simplify your meal planning?</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes scale-x {
          from { transform: translateX(-50%) scaleX(0); }
          to { transform: translateX(-50%) scaleX(1); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-scale-x {
          animation: scale-x 1s ease-out 1s forwards;
          transform-origin: center;
          transform: translateX(-50%) scaleX(0);
        }
      `}</style>
    </section>
  );
}