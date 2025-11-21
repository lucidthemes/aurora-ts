import { Link } from 'react-router-dom';

export default function SectionHeading({ heading, headingLevel = '2', align = 'left', link = '', linkButton = '' }) {
  const HeadingTag = `h${headingLevel || 2}`;

  let sectionAlignClasses = 'justify-start';
  let headingAlignClasses = 'justify-items-start';

  if (link && linkButton) {
    sectionAlignClasses = 'justify-between';
    headingAlignClasses = 'justify-items-start';
  } else {
    switch (align) {
      case 'center':
        sectionAlignClasses = 'justify-center';
        headingAlignClasses = 'justify-items-center';
        break;
      case 'right':
        sectionAlignClasses = 'justify-end';
        headingAlignClasses = 'justify-items-end';
        break;
    }
  }

  return (
    <div className={`flex items-baseline ${sectionAlignClasses}`}>
      {heading && (
        <HeadingTag
          className={`mb-6 text-sm tracking-xwide text-shark uppercase after:mt-3.5 after:block after:h-0.25 after:w-10 after:bg-shark ${headingAlignClasses}`}
        >
          {link === '' && heading}
          {link !== '' && <Link to={link}>{heading}</Link>}
        </HeadingTag>
      )}
      {link && linkButton && (
        <Link to={link} className="flex items-center gap-x-2.5 text-sm tracking-xwide text-shark uppercase">
          {linkButton}
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-2 fill-shark">
              <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
            </svg>
          </span>
        </Link>
      )}
    </div>
  );
}
