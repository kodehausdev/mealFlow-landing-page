"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Mail, Twitter, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border relative">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://x.com/kodehausdev" target="_blank" rel="noopener noreferrer" passHref>
            <Button variant="ghost" size="icon" aria-label="Twitter / X">
              <Twitter className="h-6 w-6" />
            </Button>
          </Link>
          <Link href="https://github.com/kodehausdev" target="_blank" rel="noopener noreferrer" passHref>
            <Button variant="ghost" size="icon" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </Button>
          </Link>
          <Link href="mailto:hi.kodehausdev" passHref>
            <Button variant="ghost" size="icon" aria-label="Email">
              <Mail className="h-6 w-6" />
            </Button>
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} MealFlow. All rights reserved. |{' '}
            <Link href="#" className="hover:underline">
              Privacy
            </Link>{' '}
            |{' '}
            <Link href="#" className="hover:underline">
              Terms
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Built by <Link href="https://x.com/kodehausdev" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Kodehaus</Link>
          </p>
        </div>
      </div>
      {showTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/80"
          size="icon"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </footer>
  );
}