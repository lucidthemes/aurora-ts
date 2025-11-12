export async function getFeed(limit = null) {
  try {
    const res = await fetch('/data/instagram.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch instagram.json: ${res.status}`);
    }

    const feed = await res.json();

    let limitedFeed = feed;

    if (limit && limit > 0) {
      limitedFeed = limitedFeed.slice(0, limit);
    }

    if (!limitedFeed) return;

    return limitedFeed;
  } catch (error) {
    console.error('getFeed', error);
    throw error;
  }
}
