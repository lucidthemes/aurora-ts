import type { Post } from '@typings/posts/post';

import useNavigation from './useNavigation';
import Previous from './components/Previous';
import Next from './components/Next';

interface NavigationProps {
  post: Post;
}

export default function Navigation({ post }: NavigationProps) {
  const { previousPost, nextPost } = useNavigation(post.id);
  if (!previousPost && !nextPost) return null;

  return (
    <div className="flex justify-between" role="region" aria-label="Post navigation">
      {previousPost && <Previous previousPost={previousPost} />}
      {nextPost && <Next nextPost={nextPost} />}
    </div>
  );
}
