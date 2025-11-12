import { renderHook, act, waitFor } from '@testing-library/react';
import useComments from '../../comments/hooks/useComments';

vi.mock('@server/posts/getComments', () => ({
  getCommentsById: vi.fn(),
}));

import { getCommentsById } from '@server/posts/getComments';

describe('useComments hook', () => {
  const mockPost = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  const mockCommentsInitialState = {
    list: [],
    count: 0,
  };

  const mockComments = [
    {
      id: 1,
      postId: 1,
      replyTo: null,
      author: 'Lucid Themes',
      avatar: '/images/author.jpg',
      datetime: '2024-02-13 14:23:45',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      replies: [],
    },
    {
      id: 2,
      postId: 2,
      replyTo: null,
      author: 'Lucid Themes',
      avatar: '/images/author.jpg',
      datetime: '2024-02-13 14:23:45',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      status: 'approved',
      replies: [],
    },
  ];

  const newComment = {
    id: 3,
    postId: 1,
    replyTo: null,
    author: 'Lucid Themes',
    avatar: '/images/author.jpg',
    datetime: '2025-10-09T10:37:54.987Z',
    comment: 'New comment!',
    status: 'approved',
  };

  const newReply = {
    id: 4,
    postId: 1,
    replyTo: 1,
    author: 'Lucid Themes',
    avatar: '/images/author.jpg',
    datetime: '2025-10-09T10:39:42.508Z',
    comment: 'New reply!',
    status: 'approved',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches comments data and sets comments state', async () => {
    getCommentsById.mockResolvedValue(mockComments);

    const { result } = renderHook(() => useComments(mockPost.id));

    expect(result.current.comments).toEqual(mockCommentsInitialState);

    await waitFor(() => {
      expect(result.current.comments.list).toEqual(mockComments);
      expect(result.current.comments.count).toBe(2);
    });

    expect(getCommentsById).toHaveBeenCalledWith(mockPost.id);
  });

  test('adds new comment to list on handleNewComment', async () => {
    getCommentsById.mockResolvedValue(mockComments);

    const { result } = renderHook(() => useComments(mockPost.id));

    await waitFor(() => {
      expect(result.current.comments.list).toEqual(mockComments);
      expect(result.current.comments.count).toBe(2);
    });

    expect(getCommentsById).toHaveBeenCalledWith(mockPost.id);

    act(() => {
      result.current.handleNewComment(newComment);
    });

    expect(result.current.comments.list).toHaveLength(3);
    expect(result.current.comments.list[2]).toEqual(newComment);
    expect(result.current.comments.count).toBe(3);
  });

  test('adds new reply comment to list on handleNewComment', async () => {
    getCommentsById.mockResolvedValue(mockComments);

    const { result } = renderHook(() => useComments(mockPost.id));

    await waitFor(() => {
      expect(result.current.comments.list).toEqual(mockComments);
      expect(result.current.comments.count).toBe(2);
    });

    expect(getCommentsById).toHaveBeenCalledWith(mockPost.id);

    act(() => {
      result.current.handleNewComment(newReply);
    });

    const updatedComment = result.current.comments.list[0];
    expect(updatedComment.replies).toHaveLength(1);
    expect(updatedComment.replies[0]).toEqual(newReply);

    expect(result.current.comments.list).toHaveLength(2);
    expect(result.current.comments.count).toBe(3);
  });
});
