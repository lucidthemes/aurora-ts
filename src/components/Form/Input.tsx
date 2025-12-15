import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSrOnly?: boolean;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
    autoComplete = 'on',
    className = '',
    maxLength,
    label,
    labelSrOnly = true,
    error,
    ...props
  },
  ref
) {
  const labelSrOnlyClass = labelSrOnly ? 'sr-only' : '';

  return (
    <div className="flex w-full flex-col gap-y-2.5">
      {label && (
        <label htmlFor={name} className={`block text-lg/8 text-boulder ${labelSrOnlyClass}`}>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`h-12.5 w-full rounded-sm border-1 bg-white px-5 text-lg/8 text-boulder transition-colors duration-300 ease-in-out outline-none placeholder:text-boulder hover:border-boulder focus:border-boulder ${className} ${error ? 'border-red-500' : 'border-pearl-bush'}`}
        maxLength={maxLength}
        ref={ref}
        {...props} // any additional props
      />

      {error && (
        <span role="alert" className="text-lg text-red-500">
          {error}
        </span>
      )}
    </div>
  );
});

export default Input;
