import JournalForm from '@/components/journal-form';
import { createJournalAction } from '@/lib/actions';

export default function NewJournalPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <h1 className="mb-8 text-4xl font-bold font-headline text-primary">
        New Journal Entry
      </h1>
      <JournalForm action={createJournalAction} />
    </div>
  );
}
