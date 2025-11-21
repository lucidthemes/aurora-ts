import WidgetTitle from '@components/Widgets/Title';
import PromoBox from '@features/home/promoBox';

export default function PromoBoxWidget({ title = '', image, heading, subHeading, link, position = 'bottom' }) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <PromoBox image={image} heading={heading} headingLevel={4} subHeading={subHeading} link={link} position={position} />
    </section>
  );
}
