import FeatureList from '@/components/landing/feature-list';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import ProblemSolution from '@/components/landing/problem-solution';
import RecipeGenerator from '@/components/landing/recipe-generator';
import Testimonials from '@/components/landing/testimonials';
import Waitlist from '@/components/landing/waitlist';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <FeatureList />
        <RecipeGenerator />
        <Testimonials />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
