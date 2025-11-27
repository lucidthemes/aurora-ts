import { Feed } from '@typings/instagram/feed';

export async function getFeed(limit?: number): Promise<Feed[] | undefined> {
  try {
    const res = await fetch('/data/instagram.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch instagram.json: ${res.status}`);
    }

    const feed: Feed[] = await res.json();

    let limitedFeed = feed;

    if (limit && limit > 0) {
      limitedFeed = limitedFeed.slice(0, limit);
    }

    return limitedFeed;
  } catch (error) {
    console.error('getFeed', error);
    throw error;
  }
}
