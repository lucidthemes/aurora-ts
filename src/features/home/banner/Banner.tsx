import Content from './components/Content';
import OverlayLayout from './components/OverlayLayout';
import SplitLayout from './components/SplitLayout';

interface BannerProps {
  image: string;
  heading?: string;
  subHeading?: string;
  link?: string;
  layout?: 'overlay' | 'split';
}

export default function Banner({ image, heading, subHeading, link, layout = 'overlay' }: BannerProps) {
  if (layout !== 'overlay' && layout !== 'split') return null;

  const contentAlign = layout === 'overlay' ? 'center' : 'left';

  const content = <Content heading={heading} subHeading={subHeading} link={link} align={contentAlign} />;

  return (
    <>
      {layout === 'overlay' && <OverlayLayout image={image} content={content} />}
      {layout === 'split' && <SplitLayout image={image} content={content} />}
    </>
  );
}
