import { render, screen } from '@testing-library/react';
import Tags from '../../tags';

vi.mock('@server/posts/getTags', () => ({
  getTagsArray: vi.fn(),
}));

import { getTagsArray } from '@server/posts/getTags';
import { MemoryRouter } from 'react-router-dom';

describe('Tags component', () => {
  const mockPost = {
    id: 1,
    tags: [1, 2, 3, 4],
  };

  const mockTags = [
    {
      id: 1,
      name: 'Beach',
      slug: 'beach',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 2,
      name: 'Dunes',
      slug: 'dunes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 3,
      name: 'Outdoors',
      slug: 'outdoors',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 4,
      name: 'Walk',
      slug: 'walk',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders tags when tag data is fetched', async () => {
    getTagsArray.mockResolvedValue(mockTags);

    render(
      <MemoryRouter>
        <Tags singlePost={mockPost} />
      </MemoryRouter>
    );

    const tags = await screen.findByLabelText(/post tags/i);
    expect(tags).toBeInTheDocument();

    const tagsList = screen.getAllByRole('listitem');
    expect(tagsList).toHaveLength(4);
    expect(screen.getByRole('link', { name: /beach/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /beach/i })).toHaveAttribute('href', '/tag/beach');
  });

  test('renders nothing if post does not have tags', () => {
    const postWithoutTags = { id: 1 };

    const { container } = render(
      <MemoryRouter>
        <Tags singlePost={postWithoutTags} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
