import type { ElementType } from 'react';
import { Link } from 'react-router-dom';

interface PromoBoxProps {
  image?: string;
  heading?: string;
  headingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  subHeading?: string;
  link?: string;
  position?: 'bottom' | 'top' | 'center';
}

export default function PromoBox({ image, heading, headingLevel = '3', subHeading, link, position = 'bottom' }: PromoBoxProps) {
  const defaultClasses = 'flex flex-col gap-y-1 bg-white py-2.5 px-5';

  const layoutClasses =
    position === 'bottom'
      ? 'w-full static lg:absolute bottom-0 left-0'
      : position === 'top'
        ? 'w-full static lg:absolute top-0 left-0'
        : position === 'center'
          ? 'left-1/2 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md'
          : 'w-full bottom-0 left-0';

  const HeadingTag = `h${headingLevel || 3}` as ElementType;

  const content = (
    <div className="relative overflow-hidden rounded-md">
      <img src={image} alt={heading} className="rounded-md" />
      <div className={`${defaultClasses} ${layoutClasses}`}>
        {heading && <HeadingTag>{heading}</HeadingTag>}
        {subHeading && <p>{subHeading}</p>}
      </div>
    </div>
  );

  return link ? <Link to={link}>{content}</Link> : content;
}
