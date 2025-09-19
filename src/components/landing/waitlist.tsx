'use client';

// import { addToWaitlistSimple as addToWaitlist } from '@/ai/flows/waitlist-flow-simple';
import { addToWaitlist } from '@/ai/flows/waitlist-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Waitlist() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Email is required.',
        description: 'Please enter a valid email address.',
      });
      return;
    }
    
    setLoading(true);

    try {
      const result = await addToWaitlist({ email });
      
      if (result.success) {
        toast({
          title: 'Welcome to the waitlist! 🎉',
          description: result.message,
        });
        setEmail('');
        setSubmitted(true);
        
        // Reset submitted state after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        toast({
          variant: 'destructive',
          title: 'Oops!',
          description: result.message, 
        });
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      toast({
        variant: 'destructive',
        title: 'Connection error',
        description: 'Could not connect to our servers. Please check your internet connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative isolate overflow-hidden bg-secondary/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ready to simplify mealtimes?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Join our early access list to be the first to know when MealFlow
              is available. Get exclusive updates, behind-the-scenes content,
              and a special launch day offer.
            </p>
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-6 flex max-w-md gap-x-4">
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-foreground shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  disabled={loading || !email}
                  className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Join the Waitlist'
                  )}
                </Button>
              </form>
            ) : (
              <div className="mt-6 flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">You're on the list! Check your email soon.</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-accent to-primary opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  );
}