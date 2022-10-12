import React from 'react';
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | any;
}
export const FormCheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, ...rest }, ref) => {
    return (
      <label className='group flex cursor-pointer items-center justify-between py-1 text-xs text-brand-muted transition-all first:pt-0 last:border-b-0 last:pb-0 hover:text-opacity-80 md:text-15px'>
        <input
          type='checkbox'
          className='form-checkbox h-[22px] w-[22px] cursor-pointer border-2 border-border-four text-brand transition duration-500 ease-in-out checked:bg-brand hover:border-brand hover:checked:bg-brand focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none'
          ref={ref}
          {...rest}
        />
        <span className='ml-2 overflow-auto'>{label ? label : label}</span>
      </label>
    );
  }
);

FormCheckBox.displayName = 'FormCheckBox';
