import WidgetTitle from '@components/Widgets/Title';
import InstagramFeed from '@features/instagramFeed';

interface InstagramWidgetProps {
  title?: string;
  limit?: number;
  columns?: number;
  link?: string;
}

export default function InstagramWidget({ title = '', limit, columns, link }: InstagramWidgetProps) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <InstagramFeed limit={limit} columns={columns} link={link} />
    </section>
  );
}
