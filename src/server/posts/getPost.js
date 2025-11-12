export async function getPost(field, value) {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const posts = await res.json();
    const post = posts.find((post) => post[field] === value);

    if (!post) return;

    return post;
  } catch (error) {
    console.error('getPost', error);
    throw error;
  }
}

export function getPostById(id) {
  return getPost('id', id);
}

export function getPostBySlug(slug) {
  return getPost('slug', slug);
}

export async function getPostArray(postIds) {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const posts = await res.json();
    const idSet = new Set(postIds);
    const postArray = posts.filter((post) => idSet.has(post.id));

    if (!postArray) {
      throw new Error(`Posts not found with ids: ${postIds}`);
    }

    return postArray;
  } catch (error) {
    console.error('getPostArray', error);
    throw error;
  }
}
