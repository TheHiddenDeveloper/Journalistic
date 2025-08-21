export interface Journal {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
