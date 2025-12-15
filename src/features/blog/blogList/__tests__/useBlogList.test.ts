import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/posts/getPosts', () => ({
  getPosts: vi.fn(),
}));

vi.mock('@server/posts/getCategory', () => ({
  getCategoryMap: vi.fn(),
}));

vi.mock('@server/posts/getAuthor', () => ({
  getAuthorMap: vi.fn(),
}));

import { getPosts } from '@server/posts/getPosts';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorMap } from '@server/posts/getAuthor';
import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

import useBlogList from '../hooks/useBlogList';

describe('useBlogList hook', () => {
  const mockPosts: Partial<Post>[] = [
    {
      id: 1,
      title: 'Dune walk',
      slug: 'dune-walk',
      date: '2025-09-11',
      authorId: 1,
      categories: [1, 2],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-1.jpg',
    },
    {
      id: 2,
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      date: '2025-09-10',
      authorId: 1,
      categories: [3],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-2.jpg',
    },
    {
      id: 3,
      title: 'Beach Adventure',
      slug: 'beach-adventure',
      date: '2025-09-09',
      authorId: 1,
      categories: [2],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-3.jpg',
    },
  ];

  const mockCategoryMap: Record<number, Category> = {
    1: {
      id: 1,
      name: 'Fashion',
      slug: 'fashion',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    2: {
      id: 2,
      name: 'Travel',
      slug: 'travel',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    3: {
      id: 3,
      name: 'Photography',
      slug: 'photography',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    4: {
      id: 4,
      name: 'Lifestyle',
      slug: 'lifestyle',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  };

  const mockAuthorMap: Record<number, Author> = {
    1: {
      id: 1,
      name: 'Lucid Themes',
      slug: 'lucid-themes',
      avatar: '/images/author.jpg',
      description:
        'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
    },
  };

  const mockCategoryIds = mockPosts.flatMap((post) => post.categories ?? []);

  const mockAuthorIds = mockPosts.flatMap((post) => post.authorId ?? []);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches posts data and sets posts state', async () => {
    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const { result } = renderHook(() => useBlogList());

    expect(result.current.posts).toEqual([]);

    await waitFor(() => {
      expect(result.current.posts).toEqual(mockPosts);
      expect(result.current.posts).toHaveLength(3);
    });

    expect(getPosts).toHaveBeenCalled();
  });

  test('fetches categoryMap and authorMap data after posts data has loaded', async () => {
    vi.mocked(getPosts).mockResolvedValue(mockPosts);
    vi.mocked(getCategoryMap).mockResolvedValue(mockCategoryMap);
    vi.mocked(getAuthorMap).mockResolvedValue(mockAuthorMap);

    const { result } = renderHook(() => useBlogList());

    expect(result.current.categoryMap).toEqual({});
    expect(result.current.authorMap).toEqual({});

    await waitFor(() => {
      expect(result.current.posts).toEqual(mockPosts);
      expect(result.current.posts).toHaveLength(3);
    });

    await waitFor(() => {
      expect(result.current.categoryMap).toEqual(mockCategoryMap);
      expect(result.current.authorMap).toEqual(mockAuthorMap);
    });

    expect(getCategoryMap).toHaveBeenCalledWith(mockCategoryIds);
    expect(getAuthorMap).toHaveBeenCalledWith(mockAuthorIds);
  });
});
