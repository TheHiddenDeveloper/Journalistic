import { getJournalById } from '@/lib/api';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteJournalAction } from '@/lib/actions';
import { Separator } from '@/components/ui/separator';

export default async function JournalDetailPage({ params }: { params: { id: string } }) {
  const journal = await getJournalById(params.id).catch(() => notFound());

  const deleteAction = deleteJournalAction.bind(null, journal.id);

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <article>
        <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                    {journal.isPublished ? 'Published' : 'Draft'} • {new Date(journal.createdAt).toLocaleDateString()}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    {journal.title}
                </h1>
            </div>
            <div className="flex gap-2">
                <Button asChild variant="outline" size="icon">
                    <Link href={`/journals/${journal.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Journal</span>
                    </Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Journal</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your journal entry.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <form action={deleteAction}>
                                <AlertDialogAction type="submit">Continue</AlertDialogAction>
                            </form>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
        
        <Separator className="my-6" />

        <div className="prose prose-lg max-w-none font-body whitespace-pre-wrap leading-relaxed">
          {journal.content}
        </div>

        {journal.tags.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {journal.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
