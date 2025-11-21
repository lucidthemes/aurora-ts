export default function Note({ order }) {
  if (!order.checkoutData?.note.text) return null;

  return (
    <section className="flex flex-col gap-y-3">
      <h3>Note</h3>
      <p>{order.checkoutData.note.text}</p>
    </section>
  );
}
