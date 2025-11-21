import { Link } from 'react-router-dom';

export default function Button({ children, to, type = 'button', variant = 'primary', className = '', ...props }) {
  const baseStyles = 'rounded-md cursor-pointer';

  const variants = {
    primary:
      'bg-shark px-7.5 py-4 text-xs/4 tracking-xwide text-white uppercase transition-colors duration-300 ease-in-out hover:bg-spring-wood hover:text-shark focus:bg-spring-wood focus:text-shark',
  };

  const variantStyles = variants[variant] || variants.primary;
  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
