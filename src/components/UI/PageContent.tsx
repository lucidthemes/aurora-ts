import { ElementType } from 'react';
import { ContentBlock } from '@typings/contentBlock';

interface PageContentProps {
  content: ContentBlock[];
}

interface PageContentBlockProps {
  block: ContentBlock;
}

function PageContentBlock({ block }: PageContentBlockProps) {
  switch (block.type) {
    case 'heading':
      const HeadingTag = `h${block.level || 2}` as ElementType;
      return <HeadingTag>{block.text}</HeadingTag>;

    case 'paragraph':
      return <p>{block.text}</p>;

    case 'pullquote':
      return (
        <figure className="pullquote pt-2.5 pb-7.5 pl-11 md:pl-15 lg:pl-20">
          <blockquote className="flex flex-col gap-y-2.5">
            {block.text && (
              <p className="relative mb-2.5 text-2xl/8 text-shark before:absolute before:top-0 before:-left-11 before:h-7 before:w-7 before:bg-shark before:mask-[url(/icons/quote-left.svg)] before:mask-no-repeat before:fill-shark">
                {block.text}
              </p>
            )}
            {block.cite && <cite className="text-xl/7 text-boulder not-italic">{block.cite}</cite>}
          </blockquote>
        </figure>
      );

    case 'blockquote':
      return (
        <blockquote className="my-4 border-l-2 border-shark pl-5">
          {block.text && <p>{block.text}</p>}
          {block.cite && <cite className="text-xl/7 text-boulder not-italic">{block.cite}</cite>}
        </blockquote>
      );

    default:
      return null;
  }
}

export default function PageContent({ content }: PageContentProps) {
  if (!Array.isArray(content)) return null;
  return (
    <div className="post-content">
      {content.map((block) => (
        <PageContentBlock key={block.id} block={block} />
      ))}
    </div>
  );
}
