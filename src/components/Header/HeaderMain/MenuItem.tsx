import React, { useState } from 'react';
import type { ReactNode, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  url: string;
  text: string;
  children?: ReactNode;
  level?: number;
}

export default function MenuItem({ url = '', text = '', children, level = 1 }: MenuItemProps) {
  const [mobileSubMenuActive, setMobileSubMenuActive] = useState(false);

  const mobileSubMenuClickClass = mobileSubMenuActive ? 'rotate-180' : '';

  const groupClass = children ? `group group/sub-${level} relative` : '';

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as ReactElement<any>, {
        mobileSubMenuActive,
        level,
      });
    }
    return child;
  });

  return (
    <li className={groupClass}>
      <Link
        to={url}
        className="flex items-center justify-between gap-x-2 border-b-1 border-pearl-bush px-5 py-5 text-shark transition-colors duration-300 ease-in-out group-focus-within:text-boulder hover:text-boulder lg:border-b-0 lg:px-0"
        onClick={(e) => e.currentTarget.blur()} // stop drop down from remaining after click
      >
        {text}
        {children && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className={`h-5 w-5 fill-boulder lg:h-2.5 lg:w-2.5 lg:fill-shark lg:group-focus-within:rotate-180 lg:group-hover:rotate-180 ${mobileSubMenuClickClass}`}
            onClick={(e) => {
              e.preventDefault();
              setMobileSubMenuActive((prev) => !prev);
            }}
          >
            <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"></path>
          </svg>
        )}
      </Link>
      {childrenWithProps}
    </li>
  );
}
