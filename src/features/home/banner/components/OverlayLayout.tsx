import type { ReactNode } from 'react';

interface OverlayLayoutProps {
  image: string;
  content?: ReactNode;
}

export default function OverlayLayout({ image, content }: OverlayLayoutProps) {
  return (
    <div className="flex h-125 items-center justify-center rounded-sm bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}>
      <div className="w-3/4 rounded-sm bg-white p-5 md:w-2/3 md:p-7.5 lg:w-1/2 lg:p-10">{content}</div>
    </div>
  );
}
