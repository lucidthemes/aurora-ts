import type { ReactNode } from 'react';

interface WidgetTitleProps {
  children: ReactNode;
}

export default function WidgetTitle({ children }: WidgetTitleProps) {
  if (!children) return null;

  return <h3 className="mb-6 text-sm tracking-xwide text-shark uppercase after:mt-3.5 after:block after:h-0.25 after:w-10 after:bg-shark">{children}</h3>;
}
