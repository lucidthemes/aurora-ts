import { Tag } from '@typings/posts/tag';

export async function getTags(limit?: number): Promise<Tag[] | undefined> {
  try {
    const res = await fetch('/data/post-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-tags.json: ${res.status}`);
    }

    const tags: Tag[] = await res.json();

    let limitedTags = tags;

    if (limit && limit > 0) {
      limitedTags = limitedTags.slice(0, limit);
    }

    return limitedTags;
  } catch (error) {
    console.error('getTags', error);
    throw error;
  }
}

export async function getTagsArray(tagIds: number[]): Promise<Tag[] | undefined> {
  try {
    const res = await fetch('/data/post-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-tags.json: ${res.status}`);
    }

    const tags: Tag[] = await res.json();
    const idSet = new Set(tagIds);
    const tagArray = tags.filter((tag) => idSet.has(tag.id));

    return tagArray;
  } catch (error) {
    console.error('getTagsArray', error);
    throw error;
  }
}
