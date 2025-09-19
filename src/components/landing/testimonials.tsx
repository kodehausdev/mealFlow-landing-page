'use client';

import { Heart, ChefHat, Star } from 'lucide-react';

const testimonials = [
  {
    body: 'Your feedback could be here soon! Join our early access and help shape MealFlow.',
    author: {
      name: 'Reserved for Beta Testers',
      handle: 'Early Supporter',
    },
    icon: Heart,
  },
  {
    body: 'We’re building MealFlow because we were tired of guessing what to cook every day. Join the beta and help us make it better.',
    author: {
      name: 'KodeHaus Team',
      handle: 'Founder Story',
    },
    icon: ChefHat,
  },
  {
    body: 'Be one of the first families to bring joy back to the dinner table. Sign up for early access!',
    author: {
      name: 'Peter S.',
      handle: 'Future Story',
    },
    icon: Star,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 bg-background">
      <div className="container">
        {/* Section badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Early Tester Stories (Coming Soon)
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-fade-in">
          Built for real households,{' '}
          <span className="relative">
            shaped by early testers
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 animate-scale-x"></div>
          </span>
        </h2>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="relative p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <p className="text-base text-muted-foreground mb-6">{testimonial.body}</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <testimonial.icon className="w-5 h-5 text-background" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.author.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Want to be one of the first to try MealFlow?
          </h3>
          <a

            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-background font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300"
          >
            Join the Beta
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-scale-x {
          animation: scale-x 0.8s ease-out 0.5s forwards;
          transform-origin: left;
          transform: scaleX(0);
        }
      `}</style>
    </section>
  );
}
import { useEffect, useState } from 'react';