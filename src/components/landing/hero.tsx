'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, Heart, ChefHat, Users, ArrowRight, Play, Zap } from 'lucide-react';

const floatingWords = [];

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const heroImage = PlaceHolderImages.find(
    (img) => img.id === 'hero-app-screenshot'
  );

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative isolate pt-14 min-h-screen flex items-center overflow-hidden">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(var(--primary), 0.1), transparent 40%)`,
          }}
        ></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-l from-accent/15 to-primary/15 rounded-full blur-3xl animate-float-delayed opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse opacity-30"></div>
      </div>

      {/* Original background shape - enhanced */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent via-primary to-accent opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-spin-slow"
          style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Floating Words - repositioned to stay within hero bounds */}
      {floatingWords.map((word, index) => {
        const IconComponent = word.icon;
        return (
          <div
        key={word.text}
        className={`absolute opacity-20 animate-float ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
        style={{
          top: `${15 + (index * 8)}%`,
          left: `${5 + (index * 15)}%`,
          animationDelay: `${word.delay}s`,
        }}
          >
        <div className="flex items-center gap-2 text-primary">
          <IconComponent className="w-5 h-5" />
          <span className="font-semibold text-base">{word.text}</span>
        </div>
          </div>
        );
      })}

      {/* Floating Sparkles */}
      <div className="absolute top-16 right-16 opacity-30 animate-sparkle">
        <Sparkles className="w-8 h-8 text-accent" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-30 animate-sparkle" style={{ animationDelay: '3s' }}>
        <Sparkles className="w-6 h-6 text-primary" />
      </div>

      <div className="py-24 sm:py-32 relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Meal Planning Revolution
              </span>
            </div>

            {/* Main Heading */}
            <h1 className={`font-headline text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="block bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-gradient">
                Plan, track and
              </span>
              <span className="block relative mt-2">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-reverse">
                  discover meals
                </span>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 animate-scale-x"></div>
              </span>
              <span className="block mt-4 text-4xl sm:text-5xl lg:text-6xl text-muted-foreground">
                your household will{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    love
                  </span>
                  <Heart className="absolute -top-2 -right-8 w-6 h-6 text-red-500 animate-pulse" />
                </span>
              </span>
            </h1>

            <p className="mt-8 text-xl leading-9 text-muted-foreground max-w-3xl mx-auto">
            MealFlow is your soon-to-launch meal companion. It learns your household's meal patterns to make 
            <span className="font-semibold text-primary"> smart, personalized suggestions</span>, 
            so you can spend less time planning and more time 
            <span className="font-semibold text-accent"> enjoying food together</span>.
            </p>


            {/* CTA Buttons */}
            <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
              <Link href="#waitlist" className="group">
                <Button size="lg" className="relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group-hover:-translate-y-1">
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Join the Waitlist
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                </Button>
              </Link>
              
              <Link href="#features" className="group">
                <Button size="lg" variant="outline" className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:-translate-y-1">
                  <span className="flex items-center gap-2 text-foreground group-hover:text-primary transition-colors duration-200">
                    <Play className="w-5 h-5" />
                    Learn more
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </div>

            {/* Stats or Social Proof */}
            <div className={`mt-16 mb-8 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-background"></div>
                </div>
                <span>Be among the first families to try MealFlow</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Made with love by KodeHaus</span>
              </div>
            </div>
          </div>

          {/* App Screenshot */}
          <div className={`mt-20 flow-root sm:mt-32 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '800ms' }}>
            <div className="group relative -m-2 rounded-3xl p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-4xl lg:p-4 backdrop-blur-sm bg-gradient-to-br from-background/80 to-secondary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              {/* Floating elements around the image */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-60"></div>
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>

              {heroImage && (
                <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={2432}
                    height={1442}
                    className="rounded-2xl shadow-2xl ring-1 ring-foreground/10 lg:rounded-3xl group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl lg:rounded-3xl"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
        }
        @keyframes gradient {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes gradient-reverse {
          0%, 100% { background-size: 200% 200%; background-position: right center; }
          50% { background-size: 200% 200%; background-position: left center; }
        }
        @keyframes scale-x {
          from { transform: translateX(-50%) scaleX(0); }
          to { transform: translateX(-50%) scaleX(1); }
        }
        @keyframes spin-slow {
          from { transform: translateX(-50%) rotate(30deg); }
          to { transform: translateX(-50%) rotate(390deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 0.2; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 3s;
        }
        .animate-sparkle {
          animation: sparkle 4s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        .animate-gradient-reverse {
          animation: gradient-reverse 8s ease infinite;
        }
        .animate-scale-x {
          animation: scale-x 1s ease-out 1s forwards;
          transform-origin: center;
          transform: translateX(-50%) scaleX(0);
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .rounded-4xl {
          border-radius: 2rem;
        }
      `}</style>
    </section>
  );
}