import WidgetTitle from '@components/Widgets/Title';
import SocialIcons from '@components/UI/SocialIcons';

export default function SocialWidget({ title = '' }) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <SocialIcons />
    </section>
  );
}
