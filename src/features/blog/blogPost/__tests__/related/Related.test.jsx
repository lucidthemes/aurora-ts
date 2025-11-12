import { render, screen } from '@testing-library/react';
import Related from '../../related/Related';

vi.mock('@server/posts/getPost', () => ({
  getPostArray: vi.fn(),
}));

import { getPostArray } from '@server/posts/getPost';
import { MemoryRouter } from 'react-router-dom';

describe('Related component', () => {
  const mockPost = {
    id: 1,
    relatedPosts: [2, 4, 6],
  };

  const mockRelated = [
    { id: 2, title: 'Old Town Centre' },
    { id: 4, title: 'Sweet Coffee' },
    { id: 6, title: 'Beautiful Bouquet' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders related posts when post data is fetched', async () => {
    getPostArray.mockResolvedValue(mockRelated);

    render(
      <MemoryRouter>
        <Related singlePost={mockPost} />
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
        <Related singlePost={postWithoutRelated} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
