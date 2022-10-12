import cn from 'classnames';
import React, { TextareaHTMLAttributes } from 'react';

export interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  name: string;
  error?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline' | 'disabled' | 'outlineCustom';
}

const classes = {
  root: 'py-3 px-4 w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 placeholder:text-[#CCCCCC] placeholder:text-sm',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  outlineCustom: 'border border-border-base focus:border-[#636363]',
  disabled:
    'border border-border-base focus:border-accent bg-gray-100 cursor-not-allowed	',

  shadow: 'focus:shadow',
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const {
    className,
    label,
    name,
    error,
    variant = 'normal',
    shadow = false,
    inputClassName,
    ...rest
  } = props;

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outlineCustom]: variant === 'outlineCustom',
      [classes.outline]: variant === 'outline',
      [classes.disabled]: variant === 'disabled',
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName
  );

  return (
    <div className={className}>
      {label && (
        <label className='mb-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={rootClassName}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        rows={4}
        ref={ref}
        {...rest}
      />
      {error && <p className='my-2 text-xs text-red-500 text-end'>{error}</p>}
    </div>
  );
});

export default TextArea;
