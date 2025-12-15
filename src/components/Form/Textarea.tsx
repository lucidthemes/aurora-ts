import type { InputHTMLAttributes } from 'react';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelSrOnly?: boolean;
  error?: string;
}

export default function Textarea({
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
}: TextareaProps) {
  const labelSrOnlyClass = labelSrOnly ? 'sr-only' : '';

  return (
    <div className="flex flex-col gap-y-2.5">
      {label && (
        <label htmlFor={name} className={`block text-lg/8 text-boulder ${labelSrOnlyClass}`}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`min-h-50 w-full rounded-sm border-1 bg-white p-5 text-lg/8 text-boulder transition-colors duration-300 ease-in-out outline-none placeholder:text-boulder hover:border-boulder focus:border-boulder ${className} ${error ? 'border-red-500' : 'border-pearl-bush'}`}
        maxLength={maxLength}
        {...props} // any additional props
      />

      {error && (
        <span role="alert" className="text-lg text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
