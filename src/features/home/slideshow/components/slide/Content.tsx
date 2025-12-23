import { Link } from 'react-router-dom';

import Button from '@components/UI/Button';

interface ContentProps {
  heading?: string;
  subHeading?: string;
  link?: string;
  button?: boolean;
  align?: 'left' | 'center' | 'right';
}

export default function Content({ heading, subHeading, link, button, align = 'center' }: ContentProps) {
  const alignClass = align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';

  return (
    <div className={`flex flex-col items-${alignClass} gap-y-6 text-${align}`}>
      <div className="flex flex-col gap-y-4">
        {heading && link && (
          <h2>
            <Link to={link} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {heading}
            </Link>
          </h2>
        )}
        {heading && !link && <h2>{heading}</h2>}
      </div>
      {subHeading && <p>{subHeading}</p>}
      {link && button && <Button to={link}>Read more</Button>}
    </div>
  );
}
