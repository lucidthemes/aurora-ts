import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/posts/getTags', () => ({
  getTags: vi.fn(),
}));

import { getTags } from '@server/posts/getTags';
import type { Tag } from '@typings/posts/tag';

import TagsWidget from '../../Tags/Tags';

describe('PostsWidget component', () => {
  const mockLimit = 3;

  const mockTags: Tag[] = [
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
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders tags widget when tags data is fetched', async () => {
    vi.mocked(getTags).mockResolvedValue(mockTags);

    render(
      <MemoryRouter>
        <TagsWidget title="Tags" limit={mockLimit} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /tags/i });
    expect(heading).toBeInTheDocument();

    const tags = await screen.findAllByRole('listitem');
    expect(tags).toHaveLength(3);
  });

  test('renders tag information', async () => {
    vi.mocked(getTags).mockResolvedValue(mockTags);

    render(
      <MemoryRouter>
        <TagsWidget title="Tags" limit={mockLimit} />
      </MemoryRouter>
    );

    const tagsList = await screen.findByRole('list', { name: /widget tags/i });
    expect(tagsList).toBeInTheDocument();

    const firstListItem = tagsList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('link', { name: /beach/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /beach/i })).toHaveAttribute('href', '/tag/beach');
  });

  test('renders error message if no tags found', async () => {
    vi.mocked(getTags).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <TagsWidget title="Tags" limit={mockLimit} />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no tags found/i);
    expect(message).toBeInTheDocument();
  });
});
