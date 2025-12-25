import { z } from 'zod';

import { FeedSchema } from '@schemas/instagram/feed.schema';
import type { Feed } from '@typings/instagram/feed';

export async function getFeed(limit?: number): Promise<Feed[]> {
  try {
    const res = await fetch('/data/instagram.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch instagram.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(FeedSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    let feed = parsed.data;

    if (limit && limit > 0) {
      feed = feed.slice(0, limit);
    }

    return feed;
  } catch (error) {
    console.error('getFeed', error);
    throw error;
  }
}
