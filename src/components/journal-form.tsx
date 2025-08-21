'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import type { Journal } from '@/lib/types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Wand2, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { suggestTags } from '@/ai/flows/suggest-tags';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface JournalFormProps {
  journal?: Journal;
  action: (prevState: any, formData: FormData) => Promise<any>;
}

const formSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  content: z.string().min(1, 'Content is required.'),
  tags: z.string(),
  isPublished: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function JournalForm({ journal, action }: JournalFormProps) {
  const [formState, formAction] = useFormState(action, { errors: {} });
  const [isSuggesting, setIsSuggesting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: journal?.title ?? '',
      content: journal?.content ?? '',
      tags: journal?.tags?.join(', ') ?? '',
      isPublished: journal?.isPublished ?? false,
    },
  });

  const currentTags = watch('tags');
  
  useEffect(() => {
    if (formState.errors) {
      // you could map these to react-hook-form errors if needed
      console.log(formState.errors);
    }
  }, [formState]);

  const handleSuggestTags = async () => {
    setIsSuggesting(true);
    const content = getValues('content');
    if (!content) {
      setIsSuggesting(false);
      return;
    }
    try {
      const result = await suggestTags({ content });
      const existingTags = getValues('tags').split(',').map(t => t.trim()).filter(Boolean);
      const newTags = [...new Set([...existingTags, ...result.tags])];
      setValue('tags', newTags.join(', '));
    } catch (error) {
      console.error('Failed to suggest tags', error);
    } finally {
      setIsSuggesting(false);
    }
  };
  
  return (
    <form action={formAction} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-lg">Title</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="A beautiful day..."
          className="text-lg"
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
        {formState?.errors?.title && <p className="text-sm text-destructive">{formState.errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-lg">Content</Label>
        <Textarea
          id="content"
          {...register('content')}
          placeholder="Today was..."
          className="min-h-[300px] text-base"
        />
        {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
        {formState?.errors?.content && <p className="text-sm text-destructive">{formState.errors.content}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <Label htmlFor="tags" className="text-lg">Tags</Label>
            <Button type="button" variant="ghost" size="sm" onClick={handleSuggestTags} disabled={isSuggesting}>
                {isSuggesting ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Wand2 className="h-4 w-4 mr-2" />}
                Suggest Tags
            </Button>
        </div>
        <Input
          id="tags"
          {...register('tags')}
          placeholder="personal, travel, thoughts"
        />
        <p className="text-sm text-muted-foreground">Comma-separated tags.</p>
        <div className="flex flex-wrap gap-2 pt-2">
            {currentTags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
        </div>
        {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
        {formState?.errors?.tags && <p className="text-sm text-destructive">{formState.errors.tags}</p>}
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="isPublished" {...register('isPublished')} />
        <Label htmlFor="isPublished">Publish this entry</Label>
      </div>
      
      {formState?.errors?._form && <p className="text-sm text-destructive">{formState.errors._form}</p>}
      
      <SubmitButton text={journal ? 'Update Entry' : 'Create Entry'} />
    </form>
  );
}

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}
