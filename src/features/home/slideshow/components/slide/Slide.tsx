import Content from './Content';
import OverlayLayout from './OverlayLayout';
import SplitLayout from './SplitLayout';

interface SlideProps {
  image: string;
  heading?: string;
  subHeading?: string;
  link?: string;
  button?: boolean;
  layout?: 'overlay-top' | 'overlay-center' | 'overlay-bottom' | 'split';
  multiSlide?: 2 | 3 | 4;
  heightClasses?: string;
}

export function Slide({ image, heading, subHeading, link, button = true, layout = 'overlay-center', multiSlide, heightClasses }: SlideProps) {
  let slideWidthClasses = 'flex-[0_0_100%]';

  switch (multiSlide) {
    case 2:
      slideWidthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)]';
      break;
    case 3:
      slideWidthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)] xl:flex-[0_0_calc(33.333%-40px)]';
      break;
    case 4:
      slideWidthClasses = 'flex-[0_0_calc(100%-40px)] md:flex-[0_0_calc(50%-40px)] lg:flex-[0_0_calc(33.333%-40px)] xl:flex-[0_0_calc(25%-40px)]';
      break;
  }

  const overlayLayouts = layout === 'overlay-top' || layout === 'overlay-center' || layout === 'overlay-bottom';
  const splitLayouts = layout === 'split';

  if (!overlayLayouts && !splitLayouts) return null;

  const contentAlign = overlayLayouts ? 'center' : 'left';

  const content = <Content heading={heading} subHeading={subHeading} link={link} button={button} align={contentAlign} />;

  return (
    <div className={`embla__slide mr-10 min-w-px ${slideWidthClasses}`}>
      {overlayLayouts && <OverlayLayout image={image} content={content} layout={layout} heightClasses={heightClasses} />}
      {splitLayouts && <SplitLayout image={image} content={content} heightClasses={heightClasses} />}
    </div>
  );
}
