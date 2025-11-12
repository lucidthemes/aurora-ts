export async function getComments(field, value) {
  try {
    const res = await fetch('/data/post-comments.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-comments.json: ${res.status}`);
    }

    const allComments = await res.json();
    const comments = allComments.filter((comment) => comment[field] === value);

    if (!comments) return;

    return comments;
  } catch (error) {
    console.error('getComments', error);
    throw error;
  }
}

export function getCommentsById(id) {
  return getComments('postId', id);
}
