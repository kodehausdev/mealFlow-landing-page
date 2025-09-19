import { Leaf } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MealFlow</span>
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-auto text-primary" />
              <span className="font-headline text-2xl font-bold text-foreground">
                MealFlow
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}
