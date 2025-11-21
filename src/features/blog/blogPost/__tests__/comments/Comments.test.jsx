import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import Comments from '../../comments';

vi.mock('@server/posts/getComments', () => ({
  getCommentsById: vi.fn(),
}));

import { getCommentsById } from '@server/posts/getComments';

describe('Author component', () => {
  const mockPost = {
    id: 1,
    title: 'Dune walk',
  };

  const mockComments = [
    {
      id: 1,
      postId: 1,
      replyTo: null,
      author: 'Lucid Themes',
      avatar: '/images/author.jpg',
      datetime: '2025-09-11 12:00:00',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
    },
    {
      id: 2,
      postId: 1,
      replyTo: 1,
      author: 'Lucid Themes',
      avatar: '/images/author.jpg',
      datetime: '2025-09-12 12:00:00',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders comments list when data is fetched', async () => {
    getCommentsById.mockResolvedValue(mockComments);

    render(<Comments singlePost={mockPost} />);

    const commentsList = await screen.findByRole('list', { name: /comments/i });
    expect(commentsList).toBeInTheDocument();

    const commentItems = await screen.findAllByRole('listitem');
    expect(commentItems).toHaveLength(2);
  });

  test('renders form input fields and submit button', async () => {
    render(<Comments singlePost={mockPost} />);

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add comment/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /comment/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /post comment/i })).toBeInTheDocument();
    });
  });

  test('adds new comment when form successfully submitted', async () => {
    getCommentsById.mockResolvedValue(mockComments);

    render(<Comments singlePost={mockPost} />);

    const commentsList = await screen.findByRole('list', { name: /comments/i });
    expect(commentsList).toBeInTheDocument();

    const originalCommentItems = await screen.findAllByRole('listitem');
    expect(originalCommentItems).toHaveLength(2);

    const commentsForm = screen.getByRole('form', { name: /add comment/i });

    fireEvent.change(within(commentsForm).getByRole('textbox', { name: /comment/i }), {
      target: { value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    });

    fireEvent.change(within(commentsForm).getByRole('textbox', { name: /name/i }), {
      target: { value: 'Lucid Themes' },
    });

    fireEvent.click(within(commentsForm).getByRole('button', { name: /post comment/i }));

    const updatedCommentItems = await screen.findAllByRole('listitem');
    expect(updatedCommentItems).toHaveLength(3);
  });

  test('shows form error messages for missing fields', async () => {
    render(<Comments singlePost={mockPost} />);

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add comment/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /post comment/i }));

    expect(screen.getByText(/please enter a comment/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a name/i)).toBeInTheDocument();
  });
});
