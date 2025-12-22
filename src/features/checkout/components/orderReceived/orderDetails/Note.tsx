import type { Order } from '@typings/shop/order';

interface NoteProps {
  order: Order;
}

export default function Note({ order }: NoteProps) {
  if (!order || !order.checkoutData.note) return null;

  return (
    <section className="flex flex-col gap-y-3">
      <h3>Note</h3>
      <p>{order.checkoutData.note.text}</p>
    </section>
  );
}
