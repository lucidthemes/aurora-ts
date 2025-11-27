import { Post } from '@typings/posts/post';

export async function getPosts(limit?: number, category?: number, tag?: number, author?: number, search?: string): Promise<Post[] | undefined> {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const posts: Post[] = await res.json();

    let filteredPosts = posts;

    if (limit && limit > 0) {
      filteredPosts = filteredPosts.slice(0, limit);
    }

    if (category) {
      filteredPosts = filteredPosts.filter((post) => post.categories?.includes(category));
    }

    if (tag) {
      filteredPosts = filteredPosts.filter((post) => post.tags?.includes(tag));
    }

    if (author) {
      filteredPosts = filteredPosts.filter((post) => post.authorId === author);
    }

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(lowerSearch));
    }

    return filteredPosts;
  } catch (error) {
    console.error('getPosts', error);
    throw error;
  }
}
