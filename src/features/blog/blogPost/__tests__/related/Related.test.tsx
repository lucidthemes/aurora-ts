import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/posts/getPost', () => ({
  getPostArray: vi.fn(),
}));

import { getPostArray } from '@server/posts/getPost';
import type { Post } from '@typings/posts/post';

import Related from '../../related/Related';

describe('Related component', () => {
  const mockPost: Partial<Post> = {
    id: 1,
    relatedPosts: [2, 4, 6],
  };

  const mockRelated: Partial<Post>[] = [
    { id: 2, title: 'Old Town Centre' },
    { id: 4, title: 'Sweet Coffee' },
    { id: 6, title: 'Beautiful Bouquet' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders related posts when post data is fetched', async () => {
    vi.mocked(getPostArray).mockResolvedValue(mockRelated);

    render(
      <MemoryRouter>
        <Related post={mockPost as Post} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /you may also like/i });
    expect(heading).toBeInTheDocument();

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('renders nothing if post does not have related posts', () => {
    const postWithoutRelated = { id: 1 };

    const { container } = render(
      <MemoryRouter>
        <Related post={postWithoutRelated as Post} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
