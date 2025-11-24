import WidgetTitle from '@components/Widgets/Title';
import SearchForm from '@features/searchForm';

interface SearchWidgetProps {
  title?: string;
}

export default function SearchWidget({ title = '' }: SearchWidgetProps) {
  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      <SearchForm location="widget" />
    </section>
  );
}
