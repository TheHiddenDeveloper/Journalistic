import type { Journal } from './types';

// In a real application, you would use an environment variable here.
// For this example, we're hardcoding the mock API URL.
const API_BASE_URL = 'http://localhost:5000/api';

async function fetcher(url: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // Adding cache: 'no-store' to ensure fresh data from the mock API during development
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API error: ${res.status} ${res.statusText} - ${errorText}`);
      // In a real app, you'd handle this more gracefully
      throw new Error('An error occurred while fetching data.');
    }
    
    // Handle cases where the response might be empty (e.g., DELETE)
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json();
    } else {
      return; 
    }

  } catch (error) {
    console.error('Network or fetch error:', error);
    throw error;
  }
}

export async function getJournals(page = 1, pageSize = 10): Promise<{ journals: Journal[], hasMore: boolean }> {
  const journals: Journal[] = await fetcher(`/journals?_page=${page}&_limit=${pageSize}&_sort=createdAt&_order=desc`);
  // Check if there are more items for the next page
  const totalCountResponse = await fetch(`${API_BASE_URL}/journals`, { cache: 'no-store' });
  const allJournals: Journal[] = await totalCountResponse.json();
  const totalCount = allJournals.length;
  const hasMore = page * pageSize < totalCount;

  return {
    journals,
    hasMore
  };
}

export async function getJournalById(id: string): Promise<Journal> {
  return fetcher(`/journals/${id}`);
}

type CreateJournalDto = Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>;

export async function createJournal(data: CreateJournalDto): Promise<Journal> {
  const newEntry = {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  return fetcher('/journals', {
    method: 'POST',
    body: JSON.stringify(newEntry),
  });
}

type UpdateJournalDto = Partial<Omit<Journal, 'id' | 'createdAt' | 'updatedAt'>>;

export async function updateJournal(id: string, data: UpdateJournalDto): Promise<Journal> {
  const updatedEntry = {
    ...data,
    updatedAt: new Date().toISOString(),
  }
  return fetcher(`/journals/${id}`, {
    method: 'PATCH', // Using PATCH to allow partial updates
    body: JSON.stringify(updatedEntry),
  });
}

export async function deleteJournal(id: string): Promise<void> {
  return fetcher(`/journals/${id}`, {
    method: 'DELETE',
  });
}
