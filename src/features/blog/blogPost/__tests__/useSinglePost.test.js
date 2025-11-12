import { renderHook, waitFor } from '@testing-library/react';
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

  const mockPost = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
    authorId: 1,
    categories: [1, 2],
  };

  const mockCategoryMap = {
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

  const mockAuthor = {
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
    getPostBySlug.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useSinglePost(slug));

    expect(result.current.singlePost).toBeNull();

    await waitFor(() => {
      expect(result.current.singlePost).toEqual(mockPost);
    });

    expect(getPostBySlug).toHaveBeenCalledWith(slug);
  });

  test('fetches categoryMap and author data after post data has loaded', async () => {
    getPostBySlug.mockResolvedValue(mockPost);
    getCategoryMap.mockResolvedValue(mockCategoryMap);
    getAuthorById.mockResolvedValue(mockAuthor);

    const { result } = renderHook(() => useSinglePost(slug));

    expect(result.current.categoryMap).toEqual({});
    expect(result.current.author).toBeNull();

    await waitFor(() => {
      expect(result.current.singlePost).toEqual(mockPost);
    });

    await waitFor(() => {
      expect(result.current.categoryMap).toEqual(mockCategoryMap);
      expect(result.current.author).toEqual(mockAuthor);
    });

    expect(getCategoryMap).toHaveBeenCalledWith(mockPost.categories);
    expect(getAuthorById).toHaveBeenCalledWith(mockPost.authorId);
  });

  test('sets singlePost state to false if post not found', async () => {
    getPostBySlug.mockResolvedValue(null);

    const { result } = renderHook(() => useSinglePost(slug));

    await waitFor(() => {
      expect(result.current.singlePost).toBe(false);
    });

    expect(getCategoryMap).not.toHaveBeenCalled();
    expect(getAuthorById).not.toHaveBeenCalled();
  });

  test('sets singlePost state to null if slug is missing', () => {
    const { result } = renderHook(() => useSinglePost(null));

    expect(result.current.singlePost).toBeNull();
    expect(result.current.categoryMap).toEqual({});
    expect(result.current.author).toBeNull();

    expect(getPostBySlug).not.toHaveBeenCalled();
  });
});
