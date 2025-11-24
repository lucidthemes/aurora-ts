import { InputHTMLAttributes } from 'react';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: { value: string; text: string }[];
  placeholderDisabled?: boolean;
  label?: string;
  labelSrOnly?: boolean;
  error?: string;
}

export default function Select({
  name,
  options,
  onChange,
  placeholder,
  placeholderDisabled = true,
  required = false,
  autoComplete = 'on',
  className = '',
  label,
  labelSrOnly = true,
  error,
  ...props
}: SelectProps) {
  if (!options) return null;

  const labelSrOnlyClass = labelSrOnly ? 'sr-only' : '';

  return (
    <div className="flex flex-col gap-y-2.5">
      {label && (
        <label htmlFor={name} className={`block text-lg/8 text-boulder ${labelSrOnlyClass}`}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className={`h-12.5 w-full rounded-sm border-1 bg-white px-4 text-lg/8 text-boulder transition-colors duration-300 ease-in-out outline-none placeholder:text-boulder hover:border-boulder focus:border-boulder ${className} ${error ? 'border-red-500' : 'border-pearl-bush'}`}
        {...props} // any additional props
      >
        {placeholder && (
          <option value="" disabled={placeholderDisabled}>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>

      {error && (
        <span role="alert" className="text-lg text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
