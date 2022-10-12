import React from 'react';
import { useTranslation } from 'next-i18next';
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | any;
}
export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, ...rest }, ref) => {
    const { t } = useTranslation();
    return (
      <label className='group flex cursor-pointer items-center justify-between border-b border-border-base py-3.5 text-sm text-brand-dark transition-all first:pt-0 last:border-b-0 last:pb-0 hover:text-opacity-80 md:text-15px'>
        <span className='-mt-0.5 ltr:mr-3.5 rtl:ml-3.5'>
          {label ? t(label) : label}
        </span>
        <input
          type='checkbox'
          className='form-checkbox h-[22px] w-[22px] cursor-pointer rounded-full border-2 border-border-four text-yellow-100 transition duration-500 ease-in-out checked:bg-yellow-100 hover:border-yellow-100 hover:checked:bg-yellow-100 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none'
          ref={ref}
          {...rest}
        />
      </label>
    );
  }
);

CheckBox.displayName = 'CheckBox';
