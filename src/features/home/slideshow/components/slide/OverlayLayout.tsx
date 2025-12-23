import type { ReactNode } from 'react';

interface OverlayLayoutProps {
  image: string;
  content: ReactNode;
  layout: 'overlay-top' | 'overlay-center' | 'overlay-bottom' | 'split';
  heightClasses?: string;
}

export default function OverlayLayout({ image, content, layout, heightClasses }: OverlayLayoutProps) {
  const overlayAlign = layout === 'overlay-top' ? 'start' : layout === 'overlay-bottom' ? 'end' : 'center';
  const overlayWidth = layout === 'overlay-center' ? 'max-w-[80%] md:max-w-[60%] lg:max-w-[40%]' : 'w-full';

  return (
    <div
      className={`flex h-100 ${heightClasses} items-${overlayAlign} justify-center rounded-md bg-cover bg-center bg-no-repeat`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={`${overlayWidth} rounded-br-md rounded-bl-md bg-white p-5 md:p-7.5 lg:p-10`}>{content}</div>
    </div>
  );
}
