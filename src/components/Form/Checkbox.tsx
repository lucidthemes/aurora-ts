import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  labelSrOnly?: boolean;
  error?: string;
}

export default function Checkbox({ name, checked, onChange, className = '', label, labelSrOnly = false, error, ...props }: CheckboxProps) {
  const labelSrOnlyClass = labelSrOnly ? 'sr-only' : '';

  return (
    <div className="flex w-full items-center gap-x-2.5">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className={`h-4 w-4 ${className} ${error ? 'border-red-500' : 'border-pearl-bush'}`}
        {...props} // any additional props
      />
      {label && (
        <label htmlFor={name} className={`cursor-pointer text-lg/8 text-boulder ${labelSrOnlyClass}`}>
          {label}
        </label>
      )}
    </div>
  );
}
