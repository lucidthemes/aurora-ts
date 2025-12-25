import { z } from 'zod';

import { TagSchema } from '@schemas/posts/tag.schema';
import type { Tag } from '@typings/posts/tag';

export async function getTags(limit?: number): Promise<Tag[]> {
  try {
    const res = await fetch('/data/post-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-tags.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(TagSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    let tags = parsed.data;

    if (limit && limit > 0) {
      tags = tags.slice(0, limit);
    }

    return tags;
  } catch (error) {
    console.error('getTags', error);
    throw error;
  }
}

export async function getTagsArray(tagIds: number[]): Promise<Tag[]> {
  try {
    const res = await fetch('/data/post-tags.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-tags.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(TagSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const tags = parsed.data;
    const idSet = new Set(tagIds);
    const tagArray = tags.filter((tag) => idSet.has(tag.id));

    return tagArray;
  } catch (error) {
    console.error('getTagsArray', error);
    throw error;
  }
}
