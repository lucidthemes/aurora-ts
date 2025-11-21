export async function getAuthor(field, value) {
  try {
    const res = await fetch('/data/post-authors.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-authors.json: ${res.status}`);
    }

    const authors = await res.json();
    const author = authors.find((author) => author[field] === value);

    if (!author) return;

    return author;
  } catch (error) {
    console.error('getAuthor', error);
    throw error;
  }
}

export function getAuthorById(id) {
  return getAuthor('id', id);
}

export function getAuthorBySlug(slug) {
  return getAuthor('slug', slug);
}

export async function getAuthorMap(authorIds) {
  try {
    const res = await fetch('/data/post-authors.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-authors.json: ${res.status}`);
    }

    const authors = await res.json();

    const authorMap = {};

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
