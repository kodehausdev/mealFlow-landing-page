'use client';

import { CheckCircle, Clock, Brain, Lightbulb, Users, Sparkles, ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';

const features = [
  {
    title: 'Morning & night meal tracking',
    description: 'Effortlessly log your family meals with our intuitive interface',
    icon: Clock,
    color: 'from-blue-500 to-cyan-400',
    bgColor: 'from-blue-500/10 to-cyan-400/10',
    delay: 0,
  },
  {
    title: 'Pattern learning & smart suggestions', 
    description: 'AI-powered insights that understand your household preferences',
    icon: Brain,
    color: 'from-purple-500 to-pink-400',
    bgColor: 'from-purple-500/10 to-pink-400/10', 
    delay: 200,
  },
  {
    title: 'Healthier alternatives & new recipe ideas',
    description: 'Discover exciting meals that match your taste and nutrition goals',
    icon: Lightbulb,
    color: 'from-green-500 to-emerald-400',
    bgColor: 'from-green-500/10 to-emerald-400/10',
    delay: 400,
  },
  {
    title: 'Shared household access (coming soon)',
    description: 'Collaborate with family members for seamless meal planning',
    icon: Users,
    color: 'from-orange-500 to-red-400',
    bgColor: 'from-orange-500/10 to-red-400/10',
    delay: 600,
    comingSoon: true,
  },
];

export default function FeatureList() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const featureImage = PlaceHolderImages.find(
    (img) => img.id === 'feature-list-image'
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-secondary/30 to-card/60">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-accent/8 to-primary/8 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 right-16 opacity-20 animate-float">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
        <Zap className="w-6 h-6 text-accent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
          
          {/* Content Section */}
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CheckCircle className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Core Features</span>
              </div>

              {/* Heading */}
              <h2 className={`font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  Everything you need for{' '}
                </span>
                <span className="block relative mt-2">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    stress-free
                  </span>
                  <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 animate-scale-x"></div>
                </span>
                <span className="block mt-2 text-3xl sm:text-4xl lg:text-5xl text-muted-foreground">
                  meal planning
                </span>
              </h2>

              {/* Features List */}
              <div className="mt-12 space-y-6">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  const isHovered = hoveredFeature === index;
                  
                  return (
                    <div
                      key={feature.title}
                      className={`group relative p-6 rounded-2xl border border-border/50 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                        isHovered 
                          ? 'shadow-2xl shadow-primary/20 scale-[1.02] -translate-y-1' 
                          : 'hover:shadow-xl hover:shadow-primary/10'
                      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{ 
                        transitionDelay: `${feature.delay}ms`
                      }}
                      onMouseEnter={() => setHoveredFeature(index)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      {/* Coming Soon Badge */}
                      {feature.comingSoon && (
                        <div className="absolute -top-3 -right-3">
                          <div className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-accent to-primary text-white rounded-full shadow-lg animate-pulse">
                            Coming Soon
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg transition-all duration-300 ${
                          isHovered ? 'scale-110 rotate-3' : 'group-hover:scale-105'
                        }`}>
                          <IconComponent className="h-7 w-7" aria-hidden="true" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className={`h-5 w-5 transition-colors duration-200 text-primary`} />
                            <h3 className={`text-lg font-semibold transition-colors duration-200 text-foreground group-hover:text-primary`}>
                              {feature.title}
                            </h3>
                          </div>
                          <p className={`text-sm leading-relaxed transition-colors duration-200 text-muted-foreground`}>
                            {feature.description}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className={`transition-all duration-200 ${
                          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                        }`}>
                          <ArrowRight className={`w-5 h-5 text-primary`} />
                        </div>
                      </div>

                      {/* Subtle Hover Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className={`mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-primary animate-spin-slow" />
                  <span className="font-semibold text-primary">Ready to transform your meal planning?</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join thousands of families who have already simplified their kitchen routine with MealFlow.
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className={`relative flex items-center justify-center lg:justify-end transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '400ms' }}>
            <div className="relative group">
              {/* Floating decorations around image */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-full opacity-40 animate-pulse" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -bottom-6 -right-6 w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-accent to-primary rounded-full opacity-30 animate-pulse" style={{ animationDelay: '6s' }}></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-110"></div>
              
              {featureImage && (
                <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-foreground/10 group-hover:shadow-3xl group-hover:shadow-primary/20 transition-all duration-500">
                  <Image
                    src={featureImage.imageUrl}
                    alt={featureImage.description}
                    className="w-full max-w-[48rem] sm:max-w-[57rem] rounded-3xl group-hover:scale-105 transition-transform duration-700"
                    width={800}
                    height={600}
                    data-ai-hint={featureImage.imageHint}
                    priority
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* Interactive elements on image */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground shadow-lg">
                      Interactive Demo
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes scale-x {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-scale-x {
          animation: scale-x 1s ease-out 1s forwards;
          transform-origin: left;
          transform: scaleX(0);
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}