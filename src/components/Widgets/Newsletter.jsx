import WidgetTitle from '@components/Widgets/Title';
import NewsletterForm from '@features/newsletterForm';

export default function NewsletterWidget({ title = '' }) {
  return (
    <section className="rounded-md bg-pampas p-5">
      <WidgetTitle>{title}</WidgetTitle>
      <p className="mb-5">Stay in touch by joining my newsletter</p>
      <NewsletterForm layout="widget" />
    </section>
  );
}
