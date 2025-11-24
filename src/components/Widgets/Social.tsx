import WidgetTitle from '@components/Widgets/Title';
import SocialIcons from '@components/UI/SocialIcons';

interface SocialWidgetProps {
  title?: string;
}

export default function SocialWidget({ title = '' }: SocialWidgetProps) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <SocialIcons />
    </section>
  );
}
