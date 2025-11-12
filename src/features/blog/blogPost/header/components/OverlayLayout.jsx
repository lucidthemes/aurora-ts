export default function OverlayLayout({ singlePost, content }) {
  return (
    <div className="flex h-125 items-center justify-center rounded-sm bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${singlePost.image})` }}>
      <div className="w-[85%] rounded-sm bg-white p-5 md:w-[65%] md:p-7.5 lg:w-1/2 lg:p-10">{content}</div>
    </div>
  );
}
