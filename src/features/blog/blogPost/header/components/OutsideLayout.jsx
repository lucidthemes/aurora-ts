export default function OutsideLayout({ singlePost, content, layout }) {
  return (
    <div className="flex flex-col gap-y-10">
      {layout === 'outside-above' && content}
      {singlePost.image && <img src={singlePost.image} alt={singlePost.title} className="rounded-md" />}
      {layout === 'outside-below' && content}
    </div>
  );
}
