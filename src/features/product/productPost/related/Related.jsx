import useRelated from './useRelated';
import SectionHeading from '@components/UI/SectionHeading';
import Item from './Item';

export default function Related({ singleProduct }) {
  const relatedProducts = useRelated(singleProduct);
  if (!relatedProducts.length) return null;

  return (
    <section className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      <SectionHeading heading="Related products" headingLevel={2} />
      <ul className="grid grid-cols-1 gap-x-7.5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {relatedProducts.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
