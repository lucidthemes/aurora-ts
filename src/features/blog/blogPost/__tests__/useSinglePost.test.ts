import { renderHook, waitFor } from '@testing-library/react';

import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

import useSinglePost from '../useSinglePost';

vi.mock('@server/posts/getPost', () => ({
  getPostBySlug: vi.fn(),
}));

vi.mock('@server/posts/getCategory', () => ({
  getCategoryMap: vi.fn(),
}));

vi.mock('@server/posts/getAuthor', () => ({
  getAuthorById: vi.fn(),
}));

import { getPostBySlug } from '@server/posts/getPost';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorById } from '@server/posts/getAuthor';

describe('useSinglePost hook', () => {
  const slug = 'dune-walk';

  const mockPost: Partial<Post> = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
    authorId: 1,
    categories: [1, 2],
  };

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
  };

  const mockAuthor: Author = {
    id: 1,
    name: 'Lucid Themes',
    slug: 'lucid-themes',
    avatar: '/images/author.jpg',
    description:
      'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches post data and sets singlePost state', async () => {
    vi.mocked(getPostBySlug).mockResolvedValue(mockPost);

    const { result } = renderHook(() => useSinglePost(slug));

    expect(result.current.singlePost).toStrictEqual({ status: 'loading' });

    await waitFor(() => {
      expect(result.current.singlePost).toStrictEqual({ status: 'loaded', post: mockPost });
    });

    expect(getPostBySlug).toHaveBeenCalledWith(slug);
  });

  test('fetches categoryMap and author data after post data has loaded', async () => {
    vi.mocked(getPostBySlug).mockResolvedValue(mockPost);
    vi.mocked(getCategoryMap).mockResolvedValue(mockCategoryMap);
    vi.mocked(getAuthorById).mockResolvedValue(mockAuthor);

    const { result } = renderHook(() => useSinglePost(slug));

    expect(result.current.categoryMap).toEqual({});
    expect(result.current.author).toBeNull();

    await waitFor(() => {
      expect(result.current.singlePost).toStrictEqual({ status: 'loaded', post: mockPost });
    });

    await waitFor(() => {
      expect(result.current.categoryMap).toEqual(mockCategoryMap);
      expect(result.current.author).toEqual(mockAuthor);
    });

    expect(getCategoryMap).toHaveBeenCalledWith(mockPost.categories);
    expect(getAuthorById).toHaveBeenCalledWith(mockPost.authorId);
  });

  test('sets singlePost state status to not-found if post not found', async () => {
    vi.mocked(getPostBySlug).mockResolvedValue(undefined);

    const { result } = renderHook(() => useSinglePost(slug));

    await waitFor(() => {
      expect(result.current.singlePost).toStrictEqual({ status: 'not-found' });
    });

    expect(getCategoryMap).not.toHaveBeenCalled();
    expect(getAuthorById).not.toHaveBeenCalled();
  });

  test('sets singlePost state status to not-found if slug is missing', () => {
    const { result } = renderHook(() => useSinglePost(undefined));

    expect(result.current.singlePost).toStrictEqual({ status: 'not-found' });
    expect(result.current.categoryMap).toEqual({});
    expect(result.current.author).toBeNull();

    expect(getPostBySlug).not.toHaveBeenCalled();
  });
});
