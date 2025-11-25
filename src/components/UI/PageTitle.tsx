import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  customClasses?: string;
}

export default function PageTitle({ children, align = 'left', customClasses = '' }: PageTitleProps) {
  const alignmentClass =
    {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    }[align] || 'text-left';

  return <h1 className={`mb-10 text-shark ${alignmentClass} ${customClasses}`}>{children}</h1>;
}
