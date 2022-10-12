import cn from 'classnames';
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
  variant?: 'normal' | 'solid' | 'outline' | 'disabled' | 'outlineCustom';
  dimension?: 'small' | 'medium' | 'big';
}
const classes = {
  root: 'px-4 h-12 flex items-center w-full rounded appearance-none transition placeholder:text-[#CCCCCC] placeholder:text-sm duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent ',
  outlineCustom: 'border border-border-base focus:border-[#636363]',
  disabled:
    'border border-border-base focus:border-accent bg-gray-100 cursor-not-allowed	',
  shadow: 'focus:shadow',
};
const sizeClasses = {
  small: 'text-sm h-10',
  medium: 'h-12',
  big: 'h-14',
};
const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
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
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.outlineCustom]: variant === 'outlineCustom',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline',
        [classes.disabled]: variant === 'disabled',
      },
      {
        [classes.shadow]: shadow,
      },
      sizeClasses[dimension],
      inputClassName
    );

    return (
      <div className={className}>
        <label
          htmlFor={name}
          className='mb-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'
        >
          {label}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={rootClassName}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
          spellCheck='false'
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        {note && <p className='mt-2 text-xs text-[#CCCCCC]'>{note}</p>}
        {error && (
          <p className='my-2 text-xs text-red-500 text-start'>{error}</p>
        )}
      </div>
    );
  }
);

export default Input;
