import WidgetTitle from '@components/Widgets/Title';
import PromoBox from '@features/home/promoBox';

interface PromoBoxWidgetProps {
  title?: string;
  image?: string;
  heading?: string;
  subHeading?: string;
  link?: string;
  position?: 'bottom' | 'top' | 'center';
}

export default function PromoBoxWidget({ title = '', image, heading, subHeading, link, position = 'bottom' }: PromoBoxWidgetProps) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <PromoBox image={image} heading={heading} headingLevel={4} subHeading={subHeading} link={link} position={position} />
    </section>
  );
}
