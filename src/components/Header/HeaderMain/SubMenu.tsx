import React from 'react';

interface SubMenuProps {
  level?: number;
  children?: React.ReactNode;
  mobileSubMenuActive?: boolean;
}

export default function SubMenu({ level = 1, children, mobileSubMenuActive }: SubMenuProps) {
  const hoverClass =
    level === 1
      ? 'lg:group-hover:visible lg:group-hover:opacity-100 lg:group-hover:mt-0 lg:group-focus-within:visible lg:group-focus-within:opacity-100 lg:group-focus-within:mt-0'
      : `lg:group-hover/sub-${level - 1}:visible lg:group-hover/sub-${level - 1}:opacity-100 lg:group-hover/sub-${level - 1}:mt-0 lg:group-focus-within/sub-${level - 1}:visible lg:group-focus-within/sub-${level - 1}:opacity-100 lg:group-focus-within/sub-${level - 1}:mt-0`;

  const mobileSubMenuClasses = mobileSubMenuActive ? 'px-4 block lg:px-0' : '';

  const positionClasses = children && level > 1 ? 'top-[-2px] left-52' : '';

  return (
    <ul
      className={`z-2 bg-white transition-all duration-300 ease-in-out lg:invisible lg:absolute lg:mt-7.5 lg:min-w-62 lg:border-t-2 lg:border-shark lg:opacity-0 ${hoverClass} ${mobileSubMenuClasses} ${positionClasses}`}
    >
      {children}
    </ul>
  );
}
