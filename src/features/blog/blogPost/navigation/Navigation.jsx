import useNavigation from './useNavigation';
import Previous from './components/Previous';
import Next from './components/Next';

export default function Navigation({ singlePost }) {
  const { previousPost, nextPost } = useNavigation(singlePost.id);
  if (!previousPost && !nextPost) return null;

  return (
    <div className="flex justify-between" role="region" aria-label="Post navigation">
      {previousPost && <Previous previousPost={previousPost} />}
      {nextPost && <Next nextPost={nextPost} />}
    </div>
  );
}
