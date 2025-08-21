import type { Journal } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface JournalCardProps {
  journal: Journal;
}

export default function JournalCard({ journal }: JournalCardProps) {
  const snippet = journal.content.substring(0, 100) + (journal.content.length > 100 ? '...' : '');

  return (
    <Link href={`/journals/${journal.id}`} className="block">
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:border-primary/50">
        <CardHeader>
          <CardTitle className="font-headline text-xl">{journal.title}</CardTitle>
          <CardDescription>{new Date(journal.createdAt).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{snippet}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 pt-4">
            {journal.isPublished && <Badge variant="secondary">Published</Badge>}
            {journal.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
