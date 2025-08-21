'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createJournal, deleteJournal, updateJournal } from './api';
import type { Journal } from './types';

const journalSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  content: z.string().min(1, 'Content is required.'),
  tags: z.string(),
  isPublished: z.boolean(),
});

export async function createJournalAction(prevState: any, formData: FormData) {
  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
    tags: formData.get('tags'),
    isPublished: formData.get('isPublished') === 'on',
  };

  const validatedFields = journalSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let newJournal: Journal | undefined;
  try {
    newJournal = await createJournal({
      ...validatedFields.data,
      tags: validatedFields.data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
    revalidatePath('/');
  } catch (error) {
    return {
      errors: { _form: ['Failed to create journal.'] },
    };
  }

  redirect(`/journals/${newJournal.id}`);
}


export async function updateJournalAction(id: string, prevState: any, formData: FormData) {
    const rawData = {
        title: formData.get('title'),
        content: formData.get('content'),
        tags: formData.get('tags'),
        isPublished: formData.get('isPublished') === 'on',
      };
    
      const validatedFields = journalSchema.safeParse(rawData);
    
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        };
      }
    
      try {
        await updateJournal(id, {
          ...validatedFields.data,
          tags: validatedFields.data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        });
        revalidatePath('/');
        revalidatePath(`/journals/${id}`);
      } catch (error) {
        return {
          errors: { _form: ['Failed to update journal.'] },
        };
      }
    
      redirect(`/journals/${id}`);
}

export async function deleteJournalAction(id: string) {
    try {
        await deleteJournal(id);
        revalidatePath('/');
    } catch (error) {
        console.error('Failed to delete journal:', error);
        // Here you might want to return an error message to the client
        // But for now, we redirect anyway.
    }
    redirect('/');
}
