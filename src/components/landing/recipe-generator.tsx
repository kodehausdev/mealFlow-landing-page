'use client';

import {
  PersonalizedRecipeSuggestionsInput,
  PersonalizedRecipeSuggestionsOutput,
  personalizedRecipeSuggestions,
} from '@/ai/flows/personalized-recipe-suggestions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles, ChefHat, Clock, Users, Lightbulb, Star, ArrowRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  availableIngredients: z
    .string()
    .min(3, 'Please list at least one ingredient.'),
  dietaryRestrictions: z.string().optional(),
  pastMealPatterns: z
    .string()
    .min(10, 'Please describe your meal patterns a bit more.'),
});

export default function RecipeGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<PersonalizedRecipeSuggestionsOutput | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableIngredients: 'Chicken breast, broccoli, rice',
      dietaryRestrictions: 'Lactose intolerant',
      pastMealPatterns:
        'We eat a lot of chicken and fish. We enjoy spicy food but try to eat healthy during the week. We have pasta about once a week.',
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);

    try {
      const output = await personalizedRecipeSuggestions(
        values as PersonalizedRecipeSuggestionsInput
      );
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: 'Could not generate recipes. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-background to-secondary/30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-l from-accent/8 to-primary/8 rounded-full blur-3xl animate-pulse opacity-40" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 left-16 opacity-20 animate-float">
        <ChefHat className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-32 right-16 opacity-20 animate-float" style={{ animationDelay: '3s' }}>
        <Sparkles className="w-6 h-6 text-accent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered Recipe Magic</span>
          </div>

          <h2 className={`font-headline text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Discover Your Next
            </span>
            <span className="block relative mt-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Favorite Meal
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-60 animate-scale-x"></div>
            </span>
          </h2>
          
          <p className={`mt-6 text-xl leading-8 text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            Let our AI assistant whip up some personalized recipe ideas based on
            what you have on hand and what your family loves to eat.
          </p>
        </div>

        {/* Main Form Card */}
        <Card className={`mx-auto mt-16 max-w-4xl backdrop-blur-sm bg-card/95 border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '400ms' }}>
          {/* Floating decorations around card */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse opacity-60"></div>
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-r from-accent to-primary rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
          
          <CardHeader className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                <ChefHat className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Personalized Recipe Generator
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the details below to get started with your culinary adventure.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Available Ingredients Field */}
                <FormField
                  control={form.control}
                  name="availableIngredients"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <FormLabel className="text-lg font-semibold">Available Ingredients</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="e.g., chicken, tomatoes, pasta"
                          className="h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        List ingredients you have on hand, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Dietary Restrictions Field */}
                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-accent" />
                        <FormLabel className="text-lg font-semibold">Dietary Restrictions</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="e.g., vegetarian, gluten-free, nut allergies"
                          className="h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        List any dietary needs, allergies, or preferences.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Meal Patterns Field */}
                <FormField
                  control={form.control}
                  name="pastMealPatterns"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-green-500" />
                        <FormLabel className="text-lg font-semibold">Meal Habits & Preferences</FormLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what your household typically eats, favorite cuisines, cooking frequency..."
                          className="min-h-[120px] text-base border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        The more detail you provide, the better and more personalized your suggestions will be!
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Sparkles className="h-5 w-5 group-hover:animate-pulse" />
                      )}
                      {loading ? 'Generating Magic...' : 'Generate Recipes'}
                      {!loading && <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <div className="mt-12 text-center animate-fade-in">
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div>
                <p className="font-semibold text-foreground">Generating your personalized recipes...</p>
                <p className="text-sm text-muted-foreground">Our AI is analyzing your preferences</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="mx-auto mt-16 max-w-4xl animate-fade-in">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-400/10 border border-green-500/20 mb-6 backdrop-blur-sm">
                <Star className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">Recipes Ready!</span>
              </div>
              <h3 className="font-headline text-3xl font-bold text-foreground sm:text-4xl">
                <span className="bg-gradient-to-r from-foreground via-green-600 to-emerald-500 bg-clip-text text-transparent">
                  Your Suggested Recipes
                </span>
              </h3>
            </div>
            
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
              {result.recipes.map((recipe, index) => (
                <Card key={index} className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 backdrop-blur-sm bg-card/95 border-border/50 hover:scale-[1.01] hover:-translate-y-1">
                  <CardHeader className="relative">
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-500/30 backdrop-blur-sm">
                        <Clock className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-medium text-green-600">Recipe #{index + 1}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 pr-24">
                      {recipe.name}
                    </CardTitle>
                    <CardDescription className="text-base italic text-muted-foreground mt-3 leading-relaxed">
                      {recipe.reason}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-400/5 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-foreground">Ingredients:</h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {recipe.ingredients}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-400/5 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <ChefHat className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-foreground">Instructions:</h4>
                      </div>
                      <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {recipe.instructions}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Generate More Button */}
            <div className="text-center mt-12">
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                className="group px-6 py-3 text-base font-semibold rounded-xl border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Generate New Recipes
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes scale-x {
          from { transform: translateX(-50%) scaleX(0); }
          to { transform: translateX(-50%) scaleX(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-scale-x {
          animation: scale-x 1s ease-out 1s forwards;
          transform-origin: center;
          transform: translateX(-50%) scaleX(0);
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}