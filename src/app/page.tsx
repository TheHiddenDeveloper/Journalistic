import { getJournals } from '@/lib/api';
import JournalCard from '@/components/journal-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;
  const { journals, hasMore } = await getJournals(page, pageSize);

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4">
      <h1 className="mb-8 text-4xl font-bold font-headline text-center text-primary">
        My Journals
      </h1>

      {journals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((journal) => (
            <JournalCard key={journal.id} journal={journal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-headline text-muted-foreground">No journals yet.</h2>
          <p className="mt-2 text-muted-foreground">Why not write your first entry?</p>
          <Button asChild className="mt-6">
            <Link href="/journals/new">Create New Entry</Link>
          </Button>
        </div>
      )}

      <div className="mt-12 flex justify-center items-center gap-4">
        {page > 1 && (
          <Button asChild variant="outline">
            <Link href={`/?page=${page - 1}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Link>
          </Button>
        )}
        {hasMore && (
          <Button asChild variant="outline">
            <Link href={`/?page=${page + 1}`}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
