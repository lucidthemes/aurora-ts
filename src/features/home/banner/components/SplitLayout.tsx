import type { ReactNode } from 'react';

interface SplitLayoutProps {
  image: string;
  content?: ReactNode;
}

export default function SplitLayout({ image, content }: SplitLayoutProps) {
  return (
    <div className="flex h-125 overflow-hidden rounded-md">
      <div className="flex basis-1/3 flex-col items-start justify-center bg-white p-5 md:p-7.5 lg:p-10">{content}</div>
      <div className="basis-2/3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})` }}></div>
    </div>
  );
}
