export async function getTags(limit = null) {
  try {
    const res = await fetch('/data/post-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-tags.json: ${res.status}`);
    }

    const tags = await res.json();

    let limitedTags = tags;

    if (limit && limit > 0) {
      limitedTags = limitedTags.slice(0, limit);
    }

    if (!limitedTags) return;

    return limitedTags;
  } catch (error) {
    console.error('getTags', error);
    throw error;
  }
}

export async function getTagsArray(tagIds) {
  try {
    const res = await fetch('/data/post-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-tags.json: ${res.status}`);
    }

    const tags = await res.json();
    const idSet = new Set(tagIds);
    const tagArray = tags.filter((tag) => idSet.has(tag.id));

    if (!tagArray) return;

    return tagArray;
  } catch (error) {
    console.error('getTagsArray', error);
    throw error;
  }
}
