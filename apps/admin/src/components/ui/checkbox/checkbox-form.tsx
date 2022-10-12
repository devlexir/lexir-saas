import React, { InputHTMLAttributes } from 'react';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  name: string;
  error?: string;
  type?: string;
  shadow?: boolean;
  handleOnclick?: any;
  variant?: 'normal' | 'solid' | 'outline' | 'disabled' | 'outlineCustom';
  dimension?: 'small' | 'medium' | 'big';
}

const CheckboxForm = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      handleOnclick,
      label,
      note,
      name,
      error,
      children,
      variant = 'normal',
      dimension = 'medium',
      shadow = false,
      type = 'text',
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        <label
          htmlFor={name}
          className='pointer-events-none mb-5 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'
        >
          {label}
        </label>
        <div className='mb-8 flex items-center gap-x-4'>
          <input
            id={name}
            name={name}
            type='checkbox'
            ref={ref}
            onClick={handleOnclick}
            className='h-6 w-6 cursor-pointer rounded-md border text-[#1c8c64] focus:outline-none focus:ring focus:ring-[#1c8c64]	'
            {...rest}
          />
          <span className='pointer-events-none text-xs text-body md:text-sm'>
            {note}
          </span>
        </div>

        {error && <p className='my-2 text-end text-xs text-red-500'>{error}</p>}
      </div>
    );
  }
);

export default CheckboxForm;
