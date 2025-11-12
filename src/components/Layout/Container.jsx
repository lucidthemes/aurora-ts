export default function Container({ children, width = 'standard', customPadding = '' }) {
  const baseClasses = 'container mx-auto';

  const widthOptions = {
    standard: '2xl:max-w-screen-xl',
    wide: '2xl:max-w-screen-2xl',
    full: 'max-w-full',
  };

  const widthClass = width.length > 0 ? widthOptions[width] : widthOptions['standard'];

  const paddingClass = customPadding.length > 0 ? customPadding : 'px-7.5 md:px-4';

  return <div className={`${baseClasses} ${paddingClass} ${widthClass}`}>{children}</div>;
}
