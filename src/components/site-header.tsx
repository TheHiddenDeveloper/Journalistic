import Link from 'next/link';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-5xl items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold font-headline text-lg text-primary">
              Journalistic
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button asChild>
                <Link href="/journals/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Entry
                </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
