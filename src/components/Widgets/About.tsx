import { Link } from 'react-router-dom';

import WidgetTitle from '@components/Widgets/Title';
import SocialIcons from '@components/UI/SocialIcons';

interface AboutWidgetProps {
  title?: string;
  bgImage?: string;
  authorImage?: string;
  heading?: string;
  content?: string;
  social?: boolean;
  centered?: boolean;
  padding?: boolean;
}

export default function AboutWidget({
  title = '',
  bgImage = '',
  authorImage = '',
  heading = '',
  content = '',
  social = true,
  centered = false,
  padding = false,
}: AboutWidgetProps) {
  return (
    <section className={`about-widget ${centered ? 'text-center' : ''} ${padding ? 'rounded-md bg-pampas p-5' : ''} `}>
      <WidgetTitle>{title}</WidgetTitle>
      {bgImage && <img src={bgImage} alt={heading} className="rounded-md" />}
      {authorImage && (
        <Link
          to="/about"
          className="relative mx-auto mt-[-75px] mb-5 block h-35 w-35 rounded-full border-4 border-white bg-cover bg-center transition-colors duration-300 ease-in-out hover:border-pearl-bush focus:border-pearl-bush"
        >
          <img src={authorImage} alt={heading} className="rounded-full" />
        </Link>
      )}
      <div className="flex flex-col gap-y-5">
        {heading && (
          <h4>
            <Link to="/about" className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {heading}
            </Link>
          </h4>
        )}
        {content && <p>{content}</p>}
        {social && <SocialIcons centered={centered} />}
      </div>
    </section>
  );
}
