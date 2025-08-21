# **App Name**: Journalistic

## Core Features:

- Journal Listing: Display a paginated list of journal entries fetched from the API endpoint http://localhost:5000/api/journals.
- Journal Detail: Display detailed information for a selected journal entry (title, content, tags, publication status) based on the Get Journal By ID API.
- Create Journal: Allow users to create new journal entries with title, content, tags, and publication status, which is done through a form posting to http://localhost:5000/api/journals.isPublish to indicate the current post
- Edit Journal: Enable users to edit existing journal entries and update changes using the Update Journal API from localhost port 5000.
- Delete Journal: Implement a delete confirmation prompt to prevent accidental deletions. Deletes journal via DELETE to API on localhost.
- Smart Tag Suggestions: AI-powered tool that analyzes the content and suggests relevant tags.

## Style Guidelines:

- Primary color: Dark Indigo (#4B0082) to convey depth, sophistication, and introspection.
- Background color: Very light Lavender (#F5EEF8) for a soft, muted backdrop, ensuring readability.
- Accent color: Deep Purple (#9B59B6) used sparingly to highlight interactive elements, like links or CTAs.
- Headline font: 'Playfair', serif, to establish an elegant, fashionable tone.
- Body font: 'PT Sans', sans-serif, to maintain a balance of approachability and modernity with good readability for long-form text.
- Simple, outline-style icons to represent journal categories and actions.
- Clean, grid-based layout with ample white space to reduce visual clutter and improve readability.