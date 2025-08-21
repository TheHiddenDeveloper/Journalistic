import JournalForm from '@/components/journal-form';
import { updateJournalAction } from '@/lib/actions';
import { getJournalById } from '@/lib/api';
import { notFound } from 'next/navigation';

export default async function EditJournalPage({ params }: { params: { id: string } }) {
  const journal = await getJournalById(params.id).catch(() => notFound());

  const updateAction = updateJournalAction.bind(null, journal.id);

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <h1 className="mb-8 text-4xl font-bold font-headline text-primary">
        Edit Journal Entry
      </h1>
      <JournalForm journal={journal} action={updateAction} />
    </div>
  );
}
