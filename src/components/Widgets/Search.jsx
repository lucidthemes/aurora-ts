import WidgetTitle from '@components/Widgets/Title';
import SearchForm from '@features/searchForm';

export default function SearchWidget({ title = '' }) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <SearchForm location="widget" />
    </section>
  );
}
