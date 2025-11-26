import { Link } from 'react-router-dom';
import useTags from './useTags';
import WidgetTitle from '@components/Widgets/Title';

interface TagsWidgetProps {
  title?: string;
  limit?: number;
}

export default function TagsWidget({ title = '', limit }: TagsWidgetProps) {
  const tags = useTags(limit);

  return (
    <div className="tag-widget">
      <WidgetTitle>{title}</WidgetTitle>
      {Array.isArray(tags) && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-4" aria-label="Widget tags">
          {tags.map((tag) => (
            <li key={tag.id} className="flex">
              <Link
                to={`/tag/${tag.slug}`}
                className="rounded-md bg-pampas px-4 py-2 text-xs/4 tracking-xwide text-shark uppercase transition-colors duration-300 ease-in-out hover:bg-shark hover:text-white focus:bg-shark focus:text-white"
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-md bg-pampas p-5 text-center">No tags found</p>
      )}
    </div>
  );
}
