import WidgetTitle from '@components/Widgets/Title';
import InstagramFeed from '@features/instagramFeed';

export default function InstagramWidget({ title = '', limit, columns, link }) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <InstagramFeed limit={limit} columns={columns} link={link} />
    </section>
  );
}
