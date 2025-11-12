export default function SplitLayout({ image, content, heightClasses }) {
  return (
    <div className={`flex ${heightClasses} flex-col overflow-hidden rounded-md md:flex-row`}>
      <div className="flex basis-1/2 flex-col items-start justify-center bg-white p-5 md:p-7.5 lg:basis-1/3 lg:p-10">{content}</div>
      <div className="min-h-75 basis-1/2 bg-cover bg-center bg-no-repeat md:min-h-auto lg:basis-2/3" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
  );
}
