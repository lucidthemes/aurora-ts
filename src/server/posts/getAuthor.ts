import { Author } from '@typings/posts/author';

export async function getAuthor<K extends 'id' | 'slug'>(field: K, value: Author[K]): Promise<Author | undefined> {
  try {
    const res = await fetch('/data/post-authors.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-authors.json: ${res.status}`);
    }

    const authors: Author[] = await res.json();
    const author = authors.find((author) => author[field] === value);

    return author;
  } catch (error) {
    console.error('getAuthor', error);
    throw error;
  }
}

export function getAuthorById(id: number) {
  return getAuthor('id', id);
}

export function getAuthorBySlug(slug: string) {
  return getAuthor('slug', slug);
}

export async function getAuthorMap(authorIds: number[]): Promise<Record<number, Author>> {
  try {
    const res = await fetch('/data/post-authors.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-authors.json: ${res.status}`);
    }

    const authors: Author[] = await res.json();

    const authorMap: Record<number, Author> = {};

    if (Array.isArray(authors) && Array.isArray(authorIds)) {
      const idSet = new Set(authorIds);
      authors.forEach((author) => {
        if (idSet.has(author.id)) {
          authorMap[author.id] = author;
        }
      });
    }

    return authorMap;
  } catch (error) {
    console.error('getAuthorMap', error);
    throw error;
  }
}
