import { Link } from 'react-router-dom';

import Button from '@components/UI/Button';

interface ContentProps {
  heading?: string;
  subHeading?: string;
  link?: string;
  align?: 'left' | 'center' | 'right';
}

export default function Content({ heading, subHeading, link, align = 'center' }: ContentProps) {
  const alignClass = align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';

  return (
    <div className={`flex flex-col items-${alignClass} gap-y-4 text-${align}`}>
      {heading && link && (
        <h2>
          <Link to={link}>{heading}</Link>
        </h2>
      )}
      {heading && !link && <h2>{heading}</h2>}
      {subHeading && <p>{subHeading}</p>}
      {link && <Button to={link}>Read more</Button>}
    </div>
  );
}
